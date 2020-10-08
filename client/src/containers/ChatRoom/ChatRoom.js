import React, {Component} from 'react';
import axios from '../../axios-backend';
//import axios_2 from '../../axios-fastapi';
import socket from '../../components/Socket';


class ChatRoom extends Component {

    state = {
        message: '',
        messages: [],    //[ {text: 'hola', username: 'pepito'}, {...} , ... ]
        userInfo: null,  //{user: 'cata' , room: 'santiago'}
        error: false
    }

    UNSAFE_componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);  //new URLSearchParams() will sort the http query in this way:  "?salad=1&bacon=2" -> [['salad', '1'], ['bacon', '2']]
        const userInfo = {};
        for (let param of query.entries()) {        //you need to add entries() to obtain the parsed data
            // param -> ['salad', '1']
            userInfo[param[0]] = param[1];
        }
        this.setState({userInfo: userInfo});
    }

    componentDidMount () {

        // axios_2.get('/users/')
        //     .then(response => {
        //         console.log('todo bien')
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log("no paso nadaaaaa");
        //     })
        //------Recoger data del backend---------------------------------

        axios.get('/messages.json')
        .then(response => {
          const messagesArray = [];
          for (let currentKey in response.data){

            if (response.data[currentKey].room === this.state.userInfo.room) {
                const new_object = {
                    username: response.data[currentKey].username,    
                    text: response.data[currentKey].text
                }
                messagesArray.push(new_object);
            }
          }
          this.setState({messages: messagesArray});
          console.log("Error: ", this.state.error);
        })
        .catch(error => {
          this.setState({error: true});
          console.log("Error: ", this.state.error);
        })

        //------Recoger data del backend----------------------------------

        const ObjectToSend = {
            username: this.state.userInfo.user,
            room: this.state.userInfo.room
        }
        socket.emit('join', ObjectToSend, (error) => {
            if (error) {
                return console.log(error)
            }
            console.log("Usuario conectado!")
        });

        socket.on('message', (msg) => {
            //msg = {text: 'hola', username: 'pepito'}
            const newMessages = [...this.state.messages];
            newMessages.push(msg);
            this.setState({messages: newMessages});
        });



    }

    

    submitHandler = (event) => {
        event.preventDefault();

        const newMessage = {
            username: this.state.userInfo.user,
            text: this.state.message,
            room: this.state.userInfo.room 
        };

        axios.post('/messages.json', newMessage)
            .then(response => {
                console.log("Mensaje guardado en la DB")
            })
            .catch(error => {
                console.log("NO SE GUARDO EL MENSAJE")
            })

        socket.emit('sendMessage', newMessage, (error) => {
            if (error) {
                return console.log(error)
            }
            console.log("Message delivered!")
        })
        this.setState({message: ''});

    }

    updateMessage = (event) => {
        this.setState({message: event.target.value});
    }

    render () {

        const messagesToShow = this.state.messages.map( (message, index) => {
            return (
                <li key={index} > {message.username}: {message.text} </li>
            );
        });

        return (
        <div>
            <ul>
                {messagesToShow}
            </ul>

            <form onSubmit={this.submitHandler} >
                <input 
                    type="text" 
                    value={this.state.message}
                    onChange={this.updateMessage} />

                <button>Send</button>
            </form>
        </div> 

        );
    }
}

export default ChatRoom;