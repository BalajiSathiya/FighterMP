import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { io } from "socket.io-client";

const App = () => {

  const [Player, setPlayer] = useState(0)


  if (Player === 0) {
    return (
      <div>
        <h1></h1>
        <button onClick = {() => setPlayer(1)}>Player 1</button>
        <button onClick = {() => setPlayer(2)}>Player 2</button>
      </div>
    )
  }
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

}

ReactDOM.render(<App />, document.getElementById('root'));