import React, {Component} from 'react';
import classes from './UserRegistration.module.css';

class userRegistration extends Component {

    state = {
        user: '',
        room: ''
    }


    updateUser = (event) => {
        this.setState({user: event.target.value});
    }

    updateRoom = (event) => {
        this.setState({room: event.target.value});
    }

    submitHandler = (event) => {
        event.preventDefault();
        const queryParams = [];
        for (let currentKey in this.state) {
            queryParams.push(encodeURIComponent(currentKey) + '=' + encodeURIComponent(this.state[currentKey])); //encodeURIComponent()  -> eliminate the spaces and do stuff like that.
        }
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/chatroom',
            search: '?' + queryString
        });
    }


    render() {

        return (

            <form className={classes.Form} onSubmit={this.submitHandler} >
                <label>Display Name</label>
                <input 
                    type="text" 
                    value={this.state.user}
                    onChange={this.updateUser} 
                    placeholder="Display name" 
                    required />
                <label>Room</label>
                <input 
                    type="text" 
                    value={this.state.room}
                    onChange={this.updateRoom} 
                    placeholder="Display room" 
                    required />
                <button>Enter to the Room</button>
            </form>
            
        );

    }

} 

export default userRegistration;