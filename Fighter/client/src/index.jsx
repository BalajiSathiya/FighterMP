import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { io } from "socket.io-client";

import Canvas from './Canvas.jsx'

const Cdiv = styled.div`
margin-top: 30px;
position: relative;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`;

const HPdiv = styled.div`
background-color: yellow;
height: 30px;
width: 100px;
`

const App = () => {

  return(
    <Cdiv>
      <Canvas />
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