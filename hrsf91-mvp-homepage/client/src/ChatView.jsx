import React from 'react'
import ChatEntries from './ChatEntries'
import './index.css';

const ChatView = ({ messages }) => {
  let list = messages.map((message, index) => (
    <ChatEntries key={message.toString() + index} handle={message.handle} message={message.message} />
  ))

  return (
    <div className="chat-view">
      {list}
    </div>
  );
};


export default ChatView;