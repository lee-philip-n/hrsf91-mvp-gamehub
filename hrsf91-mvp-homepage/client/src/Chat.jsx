import React from 'react';
import socketClient from 'socket.io-client';
import ChatView from './ChatView';
import ChatInput from './ChatInput';
import './index.css';

const socket = socketClient('http://localhost:1337')

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      messages: [],
      rerender: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    socket.on("chat", data => {
      this.state.messages.push(data);
      this.setState({ 
        rerender: !this.state.rerender
      });
    });
  }

  handleClick(handle, message) {
    let messageList = {handle: handle, message: message}
    this.setState({
      handle: handle,
      rerender: !this.state.flag,
    });
    socket.emit('chat', {
      handle: handle,
      message: message,
    });
  }

  render() {
    return (
      <div className='chat-box'>
        <ChatView messages={this.state.messages} />
        <ChatInput handleClick={this.handleClick} handle={this.state.handle} />
      </div>
    );
  }

}

export default Chat;