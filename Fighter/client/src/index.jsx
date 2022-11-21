import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { io } from "socket.io-client";

import GlobalFonts from './fonts/fonts.js';

import FP from './Load.jsx'
import CanvasA from './CanvasA.jsx'
import CanvasB from './CanvasB.jsx'
import Chat from './Chat.jsx'


const Cdiv = styled.div`
margin-top: 30px;
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;


const App = () => {


  const socket = io("http://localhost:4000")

  socket.on("connect", () => {
    console.log(`You connected with id: ${socket.id}`)
  })

  return(
    <Cdiv>
      <GlobalFonts/>
      <FP sock = {socket}/>
      <CanvasA />
    </Cdiv>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));


// const [Player, setPlayer] = useState(0)


  // if (Player === 0) {
  //   return (
  //     <div>
  //       <h1></h1>
  //       <button onClick = {() => setPlayer(1)}>Player 1</button>
  //       <button onClick = {() => setPlayer(2)}>Player 2</button>
  //     </div>
  //   )
  // }
  // } else if (Player === 1) {
  //   return(
  //     <div>
  //       <h1>PONG</h1>
  //       <Game />
  //     </div>
  //   )
  // } else {
  //   return(
  //     <div>
  //       <h1>PONG</h1>
  //       <Game2 />
  //     </div>
  //   )
  // }