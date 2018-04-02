import React from 'react'
import './index.css'

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      message: '',
    }
  }

  changeState (e) {
    this.setState({
      [e.target.className]: e.target.value
    })
  }

  render() {
    if (this.props.handle !== '') {
      return (
        <div>
          <div>Handle: {this.state.handle}</div>
          <p />
          <input className='message' placeholder="Input Message" onChange={(e) => this.changeState(e)}/>
          <button onClick={() => this.props.handleClick(this.state.handle, this.state.message)}>Submit</button>
        </div>
      )
    } else {
      return (
        <div>
          <input className='handle' placeholder="Input Handle" onChange={(e) => this.changeState(e)}/> 
          <p />
          <input className='message' placeholder="Input Message" onChange={(e) => this.changeState(e)}/>
          <button onClick={() => this.props.handleClick(this.state.handle, this.state.message)}>Submit</button>
        </div>
      )
    }
  }
}

export default Input;