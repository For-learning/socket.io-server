var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'client')));

// Test connection
app.get('/', function (req, res) {
    res.send('<h1>Welcome Clown Server</h1>');
});

// Online Users
var onlineUsers = {};
// Online Count
var onlineCount = 0;

io.on('connection', function (socket) {
	
    /**
     *  Feature: Monotor new user
     *  Date: March 03, 2016
     */
    socket.on('login', function (obj) {

        socket.name = obj.userid;

        console.log(obj.username);
		
        // Check the user list for exist
        if (!onlineUsers.hasOwnProperty(obj.userid)) {
            // Add
            onlineUsers[obj.userid] = obj.username;
            onlineCount++;
        }
		
        // Inform users for user add
        io.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
        console.log(obj.username + 'add to chat');
    });
	
    /**
     *  Feature: Monotor user leave
     *  Date: March 03, 2016
     */
    socket.on('disconnect', function () {
        // Delete user from user list
        if (onlineUsers.hasOwnProperty(socket.name)) {
            var obj = { userid: socket.name, username: onlineUsers[socket.name] };
			
            // Delete
            delete onlineUsers[socket.name];
            onlineCount--;
			
            // Inform users for user leave
            io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
            console.log(obj.username + 'Leave chat');
        }
    });
	
    /**
     *  Feature: Monotor released message by user
     *  Date: March 03, 2016
     */
    socket.on('message', function (obj) {
        // Send message to all users
        io.emit('message', obj);
        console.log(obj.username + 'say' + obj.content);
    });

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});