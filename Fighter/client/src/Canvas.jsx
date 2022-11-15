import React, { useRef, useEffect } from 'react';



const game = (canvas, c) => {

  canvas.width = 1024;
  canvas.height = 576;

  const gravity = 0.2;

  class Sprite {
    constructor({position, velocity}) {
      this.position = position
      this.velocity = velocity
      this.height = 150
    }

    draw () {
      c.fillStyle = 'red'
      c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update () {
      this.draw()

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

  function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    player2.update()
  }

  animate();

  console.log("🚀 ~ file: Canvas.jsx ~ line 24 ~ game ~ player", player)

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