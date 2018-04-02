import React from 'react';
import './index.css';

const UserSignUpBox = ({ handles, reqPlayers, numPlayers }) => {
  let list = handles.map((handle) => (
    <div><strong>{handle}</strong> has joined the game!</div>
  ))

  return (
    <div className="joined-container">
    <div>Number of Players Needed: {reqPlayers - numPlayers}</div>
      {list}
    </div>
  );
};


export default UserSignUpBox;