const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const port = process.env.PORT;

const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {

    console.log("A client is connected")

    socket.on('join', (dataUser, callback) => {
        const username = dataUser.username;
        const room = dataUser.room;
        console.log("User " + username + " connected in the room: " + room);

        socket.join(room)  //Joining to the room

        socket.broadcast.to(room).emit('message', {
            text: username + " has joined",
            username: 'Admin'});                                       //Sending the message to every user in the room EXCEPT THE CURRENT USER.

        callback()  //que todo salió bien
    })

    socket.on('sendMessage', (message, callback) => {
        //message = {username: 'minombre' , text: 'hola', room: 'santiago'}
        io.to(message.room).emit('message', {
            username: message.username,
            text: message.text})                       // 'io.to().emit'  -> That allow us to send a message to all the users(include the current user) of a SPECIFIC room
        
        callback(); //Todo salió bien
    })

});





server.listen(port, () => {
    console.log('Server is up on port ' + port);
})