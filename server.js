const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const messageRouter = require('./routes/MessageRoutes.js')
const formatMessage = require('./utils/message.js')

// mongoDB connection
mongoose.connect('mongodb+srv://scrungle:pwxTTNE0tpv8pwZS@cluster0.mfenz3g.mongodb.net/labtest1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});

app.use('/static', express.static(path.join(__dirname, 'public/js')))

app.use(messageRouter)

const botName = 'System'

// run when user connections
io.on('connection', socket => {
    // current user connect
    socket.emit('message', formatMessage(botName, 'Welcome!'))

    // user connect
    socket.broadcast.emit('message', formatMessage(botName, 'A user has connected'))

    // user disconnect
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'User has disconnected'))
    });

    // listen for message
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg))
    })
});

server.listen(3000, () => {
    console.log(`Server is running on Port 3000`);
});