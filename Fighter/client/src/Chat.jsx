import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { io } from "socket.io-client";

const GameMenu = styled.div`
margin-top: 15px;
padding: 10px 10px;
background-color: gray;
border: solid black;
border-radius: 20px;
height: 200px;
width: 1024px;
`

const Chat = ({ sock }) => {



  sock.on("connect", () => {
    console.log('chat Room Initialized', sock.id)
  })

  return (
    <GameMenu>
      <h1>Game Setup</h1>
      <h4>Current User:</h4>
      <h4>Client Name:</h4>
      <h4>Room ID:</h4>
    </GameMenu>
  )
}

export default Chat;