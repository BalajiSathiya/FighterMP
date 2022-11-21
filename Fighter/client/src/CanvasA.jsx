import React, { useRef, useEffect, useState } from 'react';

import Hp from './Health.jsx';
import {Sprite, Fighter} from './js/Classes.js'
import {rectangleCollision, determineWinner, decreaseTimer} from './js/Utility.js'

import { Background, Shop, SMDeath, SMA2, SMIdle, SMRun, SMTH, SMJump, SMFall, SMA1, KJump, KTH, KFall, KA1, KRun, KA2, KIdle, KDeath } from './assets/Assets.js'

const Canvas = props => {

  const [Show, setShow] = useState(true)
  const canvasRef = useRef(null)

  if(!Show) {

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
  } else return null;

}


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
    c,
    imageSrc: SMIdle,
    frame: 8,
    scale: 2.5,
    offset: {
      x: 215,
      y: 157
    },
    sprites: {
      idle: {
        imageSrc: SMIdle,
        framesMax: 8
      },
      run: {
        imageSrc: SMRun,
        framesMax: 8
      },
      jump: {
        imageSrc: SMJump,
        framesMax: 2
      },
      fall: {
        imageSrc: SMFall,
        framesMax: 2
      },
      attack1: {
        imageSrc: SMA1,
        framesMax: 6
      },
      takeHit: {
        imageSrc: SMTH,
        framesMax: 4
      },
      death: {
        imageSrc: SMDeath,
        framesMax: 6
      }
    },
    attackBox: {
      offset: {
        x: 100,
        y: 50
      },
      width: 160,
      height: 50
    }
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
    c,
    imageSrc: KIdle,
    frame: 4,
    scale: 2.5,
    offset: {
      x: 215,
      y: 167
    },
    sprites: {
      idle: {
        imageSrc: KIdle,
        framesMax: 4
      },
      run: {
        imageSrc: KRun,
        framesMax: 8
      },
      jump: {
        imageSrc: KJump,
        framesMax: 2
      },
      fall: {
        imageSrc: KFall,
        framesMax: 2
      },
      attack1: {
        imageSrc: KA1,
        framesMax: 4
      },
      takeHit: {
        imageSrc: KTH,
        framesMax: 3
      },
      death: {
        imageSrc: KDeath,
        framesMax: 7
      }
    },
    attackBox: {
      offset: {
        x: -170,
        y: 50
      },
      width: 170,
      height: 50
    }
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

    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
    player2.update()

    player.velocity.x = 0
    player2.velocity.x = 0

    //Player 1
    if (keys.a.pressed && player.lastKey === 'a') {
      player.velocity.x = -5
      player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
      player.velocity.x = 5
      player.switchSprite('run')
    } else {
      player.switchSprite('idle')
    }

    if (player.velocity.y < 0) {
      player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
      player.switchSprite('fall')
    }

    //Player 2
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
      player2.velocity.x = -5
      player2.switchSprite('run')
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
      player2.velocity.x = 5
      player2.switchSprite('run')
    } else {
      player2.switchSprite('idle')
    }

    if (player2.velocity.y < 0) {
      player2.switchSprite('jump')
    } else if (player2.velocity.y > 0) {
      player2.switchSprite('fall')
    }

    //Player 1 Collision
    if (
      rectangleCollision({
        rectangle: player,
        rectangle2: player2
      }) &&
      player.isAttacking &&
      player.framesCurrent === 4
    ) {
      player2.takeHit()
      player.isAttacking = false

      document.querySelector('#player2HP').style.width = player2.health + '%'
    }

    //Player 1 Attacking
    if (player.isAttacking && player.framesCurrent === 4) {
      player.isAttacking = false
    }


    //PLayer 2 Collsion
    if (
      rectangleCollision({
        rectangle: player2,
        rectangle2: player
      }) &&
      player2.isAttacking &&
      player2.framesCurrent === 2
    ) {
      player.takeHit()
      player2.isAttacking = false
      console.log(player.health)
      document.querySelector('#playerHP').style.width = player.health + '%'
    }

    //Player 2 Attacking
    if (player2.isAttacking && player2.framesCurrent === 2) {
      player2.isAttacking = false
    }

    //Whose Health hits 0 first
    if (player.health <= 0 || player2.health <= 0) {
      determineWinner({player, player2})
    }
  }

  animate();


  window.addEventListener('keydown', (event) => {
    //Player 1 Controls
    if (!player.dead) {
      switch (event.key) {
        case 'd':
          keys.d.pressed = true
          player.lastKey = 'd'
          break
        case 'a':
          keys.a.pressed = true
          player.lastKey = 'a'
          break
        case 'w':
          player.velocity.y = -20
          break
        case 'j':
          player.attack()
          break
      }
    }
    //Player 2 Controls
    if (!player2.dead) {
      switch (event.key) {
        case 'ArrowRight':
          keys.ArrowRight.pressed = true
          player2.lastKey = 'ArrowRight'
          break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = true
          player2.lastKey = 'ArrowLeft'
          break
        case 'ArrowUp':
          player2.velocity.y = -20
          break
        case 'PageDown':
          player2.attack()

          break
      }
    }
  })

  window.addEventListener('keyup', (event) => {
    //Player 1
    switch (event.key) {
      case 'd':
        keys.d.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
    }

    //Player 2
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
  })

}

export default Canvas;