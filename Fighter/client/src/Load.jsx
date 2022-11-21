import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Brick from './assets/brick.png'
import Fighter from './assets/FighterMP.png'

const Sdiv = styled.div`

  height: 576px;
  width: 1024px;
  background-image: url(${Brick});
  text-align: center;
`

const Idiv = styled.div`
position: absolute;
background-image: url(${Fighter});
height: 576px;
width: 1024px;
`

const Rdiv = styled.div`
padding: 30px 30px;
display: flex;
flex-direction: row;
justify-content: center;
`

const H1 = styled.h1`
color: transparent;
font-size: 144px;
`

const H3 = styled.h3`
position: absolute;
bottom: 70px;
right: 0;
left: 0;
font-family: Retro;
color: gold;
font-size: 32px;
`

const Label = styled.label`
color: gold;
font-family: Retro;
font-size: 30px;
`
const Input = styled.input`
border: solid gray;
margin-left: 5px;
margin-right: 10px;
padding:3px 3px;
font-family: Retro;
z-index: 1;
`
const Button = styled.button`
z-index: 1;
font-family: Retro;
font-size: 20px;
padding: 10px 10px;
margin-left: 20px;
color: black;
`

const Load = ({ sock }) => {

  let Mes = ""
  let User = useRef(null)
  let Room = useRef(null)

  const Jroom = () => {
    sock.emit('joinR', 'hello')
    console.log(sock)
    console.log(User.current.value, Room.current.value)
  }

  return (
    <Sdiv>
      <Idiv></Idiv>
      <H1>F</H1>
      <Rdiv>
        <Label>USERNAME:</Label>
        <Input type="text" ref={User} ></Input>
        <Label>Room Name:</Label>
        <Input type="text" ref={Room} ></Input>
      </Rdiv>
        <H3>{Mes}</H3>
      <Rdiv>
        <Button onClick = {() => Jroom()}>Join Room</Button>
        <Button>Create Room</Button>
      </Rdiv>
    </Sdiv>
  )
}

export default Load;