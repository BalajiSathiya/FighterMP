import React, { useRef, useEffect } from 'react';



const game = (canvas, c) => {

  canvas.width = 1024;
  canvas.height = 576;

  const gravity = 0.4;

  class Sprite {
    constructor({position, velocity, lastKey}) {
      this.position = position
      this.velocity = velocity
      this.height = 150
      this.lastKey = lastKey
    }

    draw (color) {
      c.fillStyle = color
      c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update (color) {
      this.draw(color)

      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0
      } else this.velocity.y += gravity
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

  return <canvas ref={canvasRef} {...props}/>
}

export default Canvas;