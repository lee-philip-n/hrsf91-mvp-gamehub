import React from 'react';
import UserSignUpBox from './UserSignUpBox';
import UserSignUpInput from './UserSignUpInput';
import './index.css';

class UserSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handles: [],
      reqPlayers: this.props.reqPlayers,
      numPlayers: 0,
      handleSet: false,
      rerender: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("join", data => {
      this.state.handles.push(data.handle);
      this.setState({ 
        numPlayers: data.numPlayers,
        rerender: !this.state.rerender
      });
    });
  }

  handleClick(handle) {
    this.state.handleSet = true;
    this.setState({
      numPlayer: this.state.numPlayers += 1,
      rerender: !this.state.rerender,
    })
    this.props.socket.emit('join', {
      handle: handle,
      numPlayers: this.state.numPlayers,
    });
  }

  render() {
    return (
      <div>
        <UserSignUpBox handles={this.state.handles} numPlayers={this.state.numPlayers} reqPlayers={this.state.reqPlayers}/>
        <UserSignUpInput startGame={this.props.startGame} handleClick={this.handleClick} handleSet={this.state.handleSet} numPlayers={this.state.numPlayers} reqPlayers={this.state.reqPlayers}/>
      </div>
    );
  }

}

export default UserSignUp;