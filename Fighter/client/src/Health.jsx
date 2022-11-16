import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Fdiv = styled.div`
position: absolute;
left: auto;
top: 0px;

display: flex;
flex-wrap: nowrap;
width: 1024px;
align-items: center;
`

const Hdiv = styled.div`
position: absolute;
background: #0e144e;
top: 0;
right: 0;
bottom: 0;
width: 100%;
`

const Hdiv2 = styled.div`
position: absolute;
background: #0e144e;
top: 0;
right: 0;
bottom: 0;
left: 0;
`

const Sdiv = styled.div`
box-sizing: border-box;
position: relative;
width: 100%;
display: flex;
border-top: 4px solid white;
border-left: 4px solid white;
border-bottom: 4px solid white;
border-right:4px solid white;
margin-left: 10px;
margin-right: 10px;
`

const Bdiv = styled.div`
background-color: #ccd828;
height: 30px;
width: 100%;
`

const Tdiv = styled.div`
background-color: red;
height: 100px;
width: 100px;
flex-shrink: 0;
`

const HP = () => {

  return (
    <Fdiv>
      <Sdiv>
      <Bdiv></Bdiv>
      <Hdiv id="playerHP"></Hdiv>
      </Sdiv>
      <Tdiv></Tdiv>
      <Sdiv>
      <Hdiv2 id="player2HP"></Hdiv2>
      <Bdiv></Bdiv>
      </Sdiv>
    </Fdiv>
  );
}

export default HP;