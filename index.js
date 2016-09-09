const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = Number(process.env.PORT || 3000)

app.use(express.static('lib'));
app.use(express.static('styles'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    socket.broadcast.emit('chat message', msg);
  });
});

http.listen(port, function () {
  console.log('listening on *:3000');
});
