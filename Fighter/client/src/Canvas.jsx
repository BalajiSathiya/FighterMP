import React, { useRef, useEffect } from 'react';

import Hp from './Health.jsx';
import {Sprite, Fighter} from './js/Classes.js'
import {rectangleCollision, determineWinner, decreaseTimer} from './js/Utility.js'

import Background from './assets/background.png'
import Shop from './assets/shop.png'


const game = (canvas, c) => {

  canvas.width = 1024;
  canvas.height = 576;

  const gravity = 0.4;

  c.fillRect(0, 0, canvas.width, canvas.height)

  const background = new Sprite({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: Background,
    c
  })

  const shop = new Sprite({
    position: {
      x: 630,
      y: 120
    },
    imageSrc: Shop,
    c,
    scale: 2.8,
    frame: 6
  })

  const player = new Fighter({
    position: {
      x: 100,
      y: 50
    },
    velocity: {
      x: 0,
      y: 0
    },
    color: 'blue',
    offset: {
      x: 0,
      y: 0
    },
    c
  })

  const player2 = new Fighter({
    position: {
      x: 850,
      y: 50
    },
    velocity: {
      x: 0,
      y: 0
    },
    color: 'green',
    offset: {
      x: -50,
      y: 0
    },
    c
  })

  const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    ArrowRight: {
      pressed: false
    },
    ArrowLeft: {
      pressed: false
    },
  }

  decreaseTimer(player, player2)

  function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.update()

    shop.update()

    player.update('green')
    player2.update('blue')

    player.velocity.x = 0
    player2.velocity.x = 0
    //Player 1
    if (keys.a.pressed && player.lastKey === 'a') {
      player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
      player.velocity.x = 5
    }

    //Player 2
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
      player2.velocity.x = -5
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
      player2.velocity.x = 5
    }

    //Collision
    //Player 1 is attacking
    if (rectangleCollision({rectangle: player, rectangle2: player2}) && player.isAttacking) {
        player.isAttacking = false
        console.log('player1 struck')
        player2.health -= 20
        document.querySelector('#player2HP').style.width = player2.health + '%'
    }

    //Player 2 is attacking
    if (rectangleCollision({rectangle: player2, rectangle2: player}) && player2.isAttacking) {
      player2.isAttacking = false
      console.log('player2 struck')
      player.health -= 20
      document.querySelector('#playerHP').style.width = player.health + '%'
    }

    if (player.health <= 0 || player2.health <= 0) {
      determineWinner({player, player2, timerID})
    }
  }

  animate();

  window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.key) {
      case 'd':
        keys.d.pressed = true;
        player.lastKey = 'd'
        break;
      case 'a':
        keys.a.pressed = true;
        player.lastKey = 'a'
        break;
      case 'w':
        player.velocity.y = -15
        break;
      case 'j':
        player.shortAttack();
        break;
      case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        player2.lastKey = 'ArrowRight'
        break;
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        player2.lastKey = 'ArrowLeft'
        break;
      case 'ArrowUp':
        player2.velocity.y = -15
        break;
      case 'PageDown':
        player2.shortAttack();
        break;
    }
  })

  window.addEventListener('keyup', (event) => {
    console.log(event)
    switch (event.key) {
      case 'd':
        keys.d.pressed = false;
        break;
      case 'a':
        keys.a.pressed = false;
        break;
      case 'ArrowRight':
        keys.ArrowRight.pressed = false;
        break;
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = false;
        break;
    }
  })

}

const Canvas = props => {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    game(canvas, context)
  }, [game])

  return (
    <div>
      <canvas ref={canvasRef} {...props}/>
      <Hp />
    </div>
  )
}

export default Canvas;