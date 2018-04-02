const path = require('path');
const express = require('express');
const socket = require('socket.io');

const app = express();

let socketId = [];

const server = app.listen(2121, () => {
  console.log('listening on port 2121');
});

app.use(express.static(path.join(__dirname, '../client/dist')));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('connection made with socket', socket.id);

  socket.on('join', (data) => {
    io.sockets.emit('join', data);
  });

  socket.on('startGame', (data) => {
    io.sockets.emit('startGame', data);
  });

  socket.on('restart', (data) => {
    io.sockets.emit('restart', data);
  });

  socket.on('choice', (data) => {
    socketId.push(data);
    if (socketId.length === 2) {
      if (socketId[0].selection === 'rock' && socketId[1].selection === 'rock') {
        socketId[0].condition = 'draw';
        socketId[1].condition = 'draw';
        io.sockets.emit('choice', socketId);
      } else if (socketId[0].selection === 'scissors' && socketId[1].selection === 'rock') {
        socketId[0].condition = 'lose';
        socketId[1].condition = 'win';
        io.sockets.emit('choice', socketId);
      } else if (socketId[0].selection === 'paper' && socketId[1].selection === 'rock') {
        socketId[0].condition = 'win';
        socketId[1].condition = 'lose';
        io.sockets.emit('choice', socketId);
      } else if (socketId[0].selection === 'rock' && socketId[1].selection === 'scissors') {
        socketId[0].condition = 'win';
        socketId[1].condition = 'lose';
        io.sockets.emit('choice', socketId);
      } else if (socketId[0].selection === 'rock' && socketId[1].selection === 'paper') {
        socketId[0].condition = 'lose';
        socketId[1].condition = 'win';
        io.sockets.emit('choice', socketId);
      } else if (socketId[0].selection === 'scissors' && socketId[1].selection === 'scissors') {
        socketId[0].condition = 'draw';
        socketId[1].condition = 'draw';
        io.sockets.emit('choice', socketId);
      } else if (socketId[0].selection === 'scissors' && socketId[1].selection === 'paper') {
        socketId[0].condition = 'win';
        socketId[1].condition = 'lose';
        io.sockets.emit('choice', socketId);
      } else if (socketId[0].selection === 'paper' && socketId[1].selection === 'paper') {
        socketId[0].condition = 'draw';
        socketId[1].condition = 'draw';
        io.sockets.emit('choice', socketId);
      } else if (socketId[0].selection === 'paper' && socketId[1].selection === 'scissors') {
        socketId[0].condition = 'lose';
        socketId[1].condition = 'win';
        io.sockets.emit('choice', socketId);
      }
      socketId = [];
    }
  });
});

