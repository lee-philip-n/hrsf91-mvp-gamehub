import React from 'react';
import Chat from './Chat';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className='app'>
        <h1>HRSF91's Toy Box</h1>
        <div className='game-container'>
          <button>
            <a id="rockPaperScissors" href="http://localhost:2121">RockPaperScissors</a>
          </button>
          <button id='bigTwo'>bigTwo</button>
          <button id="Chess">Chess</button>
          <button id="Checkers">Checkers</button>
          <button id="Coup">Coup</button>
          <button>
            <a id="Codenames" href="https://hrsf85-codenames.herokuapp.com">Codenames</a>
          </button>
        </div>
        <div className='chat-container'>
          ChatBox - Find someone to play with!
          <Chat />
        </div>
      </div>
    );
  }
}

export default App;