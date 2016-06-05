var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    var user = Date.now();

    socket.on('message.sent', function(message) {
        console.log('Message sent: ' + message); // Server-side
        io.emit('message', user + ': ' + message); // Client-side
    });

    console.log('User ' + user + ' connected'); // Server-side
    io.emit('message', 'User ' + user + ' connected'); // Client-side
});

http.listen(3000, function () {
    console.log('Started server');
});
