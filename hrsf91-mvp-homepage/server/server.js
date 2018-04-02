const path = require('path');
const express = require('express');
const socket = require('socket.io');

const app = express();


const server = app.listen(1337, () => {
  console.log('listening on port 1337');
});

app.use(express.static(path.join(__dirname, '../client/dist')));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('connection made with socket', socket.id);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });
});

