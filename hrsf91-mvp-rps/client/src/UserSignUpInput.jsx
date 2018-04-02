import React from 'react'
import './index.css'

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
    }
  }

  changeState (e) {
    this.setState({
      [e.target.className]: e.target.value
    })
  }

  render() {
    if (this.props.numPlayers === this.props.reqPlayers) {
      return (
        <div>
          <div>Handle: {this.state.handle}</div>
          <button onClick={() => this.props.startGame()}>Start Game!</button>
        </div>
      )
    } else if (this.props.handleSet) {
      return (
        <div>
          <div>Handle: {this.state.handle}</div>
        </div>
      )
    } else {
      return (
        <div>
          <input className='handle' placeholder="Input Handle" onChange={(e) => this.changeState(e)}/> 
          <button onClick={() => this.props.handleClick(this.state.handle)}>Submit</button>
        </div>
      )
    }
  }
}

export default Input;