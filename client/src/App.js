import React, {Component} from 'react';
import { Route } from 'react-router-dom';


import ChatRoom from './containers/ChatRoom/ChatRoom';
import UserRegistration from './containers/UserRegistration/UserRegistration';

class App extends Component {


  render () {


    return (
      <div>
        <h1>ChatRoom</h1>
        
        <Route path="/" exact component={UserRegistration} />
        <Route path="/chatroom" component={ChatRoom} />
      </div>
    );
  }
}

export default App;
