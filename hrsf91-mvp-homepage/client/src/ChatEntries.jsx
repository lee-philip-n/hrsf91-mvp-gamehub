import React from 'react'
import './index.css';

const ChatEntries = (props) => {
  return (
    <div>
      <strong className='handle'>{props.handle}:</strong>
      <div className='message'>{props.message}</div>
    </div>
  );
};

export default ChatEntries;