import React from 'react';
import socketClient from 'socket.io-client';
import UserSignUp from './UserSignUp';
import Game from './Game';
import './index.css';

const socket = socketClient('http://localhost:2121')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handles: [],
      reqPlayers: 2,
      startGame: false,
    };
  this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    socket.on("startGame", data => {
      this.setState({ 
        startGame: data.startGame,
      });
    });
  }

  startGame(state) {
    socket.emit('startGame', {
      startGame: true,
    });
  }

  render() {
    if (this.state.startGame) {
      return (
        <div>
          <h1>Let's play Rock Paper Scissors!</h1>
          <div className="flex-container">
            <Game socket={socket}/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Let's play Rock Paper Scissors!</h1>
          <div>Number of Players Required: {this.state.reqPlayers}</div>
          <UserSignUp socket={socket} reqPlayers={this.state.reqPlayers} startGame={this.startGame}/>
        </div>
      );      
    }
  }

}

export default App;