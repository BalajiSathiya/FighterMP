import React, { useRef, useEffect } from 'react';
import Hp from './Health.jsx';


const game = (canvas, c) => {

  canvas.width = 1024;
  canvas.height = 576;

  const gravity = 0.4;

  class Sprite {
    constructor({position, velocity, color, offset}) {
      this.position = position
      this.velocity = velocity
      this.width = 50
      this.height = 150
      this.lastKey
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        offset,
        width:  100,
        height: 50
      }
      this.color = color
      this.isAttacking
      this.health = 100
    }

    draw () {
      //Sprite
      c.fillStyle = this.color
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
      //Weapon
      // if (this.isAttacking) {
        c.fillStyle = 'red'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
      // }
    }

    update () {
      this.draw()

      this.attackBox.position.x = this.position.x + this.attackBox.offset.x
      this.attackBox.position.y = this.position.y

      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0
      } else this.velocity.y += gravity
    }

    //Attack Method
    shortAttack () {
      this.isAttacking = true
      setTimeout(() => {
        this.isAttacking = false
      }, 100)
    }
  }



  c.fillRect(0, 0, canvas.width, canvas.height)

  const player = new Sprite({
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    color: 'blue',
    offset: {
      x: 0,
      y: 0
    }
  })

  const player2 = new Sprite({
    position: {
      x: 400,
      y: 100
    },
    velocity: {
      x: 0,
      y: 0
    },
    color: 'green',
    offset: {
      x: -50,
      y: 0
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

  function retangleCollision({rectangle, rectangle2}) {
    return (
        rectangle.attackBox.position.x + rectangle.attackBox.width >= rectangle2.position.x &&
        rectangle.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle.attackBox.position.y + rectangle.attackBox.height >= rectangle2.position.y &&
        rectangle.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
  }

  function determineWinner({player, player2, timerID}) {
    clearTimeout(timerID)
    document.querySelector('#tie').style.display = 'flex'
    if (player.health === player2.health) {
      document.querySelector('#tie').innerHTML = 'Tie'
    } else if (player.health > player2.health) {
      document.querySelector('#tie').innerHTML = 'Player 1 Wins'
    } else if (player.health < player2.health) {
      document.querySelector('#tie').innerHTML = 'Player 2 Wins'
    }
  }



  let timer = 30;
  let timerID;
  function decreaseTimer() {
    if (timer > 0) {
      timerID = setTimeout(decreaseTimer, 1000)
      timer--;
      document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0) {
      determineWinner({player, player2})
    }
  }

  decreaseTimer()

  function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
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
    if (retangleCollision({rectangle: player, rectangle2: player2}) && player.isAttacking) {
        player.isAttacking = false
        console.log('player1 struck')
        player2.health -= 20
        document.querySelector('#player2HP').style.width = player2.health + '%'
    }

    //Player 2 is attacking
    if (retangleCollision({rectangle: player2, rectangle2: player}) && player2.isAttacking) {
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