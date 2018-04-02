import React from 'react';
import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socketID: this.props.socket.id,
      condition: null,
      selection: '',
      opponentSelection: '',
    };
  }

  componentDidMount() {
    this.props.socket.on("choice", data => {
      data.forEach((obj) => {
        if (obj.socketID === this.state.socketID) {
          this.setState({
            condition: obj.condition,
          });
        }
        if (obj.socketID !== this.state.socketID) {
          this.setState({
            opponentSelection: obj.selection,
          })
        }
      })
    });
    this.props.socket.on('restart', data => {
      this.setState({
        condition: data.condition,
        selection: data.selection,
        opponentSelection: data.opponentSelection,        
      })
    })
  }

  handleClick(e) {
    this.setState({
      selection: e.target.id,
    })
    this.props.socket.emit('choice', {
      socketID: this.state.socketID,
      selection: e.target.id,
    });
  }

  restart() {
    this.props.socket.emit('restart', {
      condition: null,
      selection: '',
      opponentSelection: '',
    })
  }

  render() {
    if (this.state.condition === 'draw') {
      return (
        <div>
          You got a {this.state.condition}. You picked {this.state.selection} against your opponent's {this.state.opponentSelection}
          <p />
          <button onClick={() => this.restart()}>Play Again?</button>
        </div>
      )
    } else if (this.state.condition) {
      return (
        <div>
          You {this.state.condition}. You picked {this.state.selection} against your opponent's {this.state.opponentSelection}
          <p />
          <button onClick={() => this.restart()}>Play Again?</button>
        </div>
      )
    } else if (this.state.selection === '') {
      return (
        <div className='game-container'>
          <div className='text-container'>
            <div>Select one of the options...</div>
            <div>Rock beats scissors</div>
            <div>Paper beats rock</div>
            <div>Scissors beats paper</div>
            <div className='button-container'>
              <button onClick={(e) => this.handleClick(e)} id='rock'>Rock</button>
              <button onClick={(e) => this.handleClick(e)} id='paper'>Paper</button>
              <button onClick={(e) => this.handleClick(e)} id='scissors'>Scissor</button>
            </div>
          </div>
          </div>
      );
    } else if (this.state.selection !== ''){
      return (
        <div> 
          You selected {this.state.selection}!
          Waiting on opponent's selection...
          <p />
          <img src="Pacman.gif" alt="Pacman" />
        </div>
      )
    }
  }
}

export default Game;