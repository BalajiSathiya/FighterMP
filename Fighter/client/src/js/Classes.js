class Sprite {
  constructor({ position, imageSrc, scale = 1, c , frame = 1}) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.c = c
    this.scale = scale
    this.frame = frame
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 20
  }

  draw() {
    this.c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.frame),
      0,
      this.image.width / this.frame,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frame) * this.scale,
      this.image.height * this.scale
    )
  }

  update() {
    this.draw()
    this.framesElapsed++;

    if(this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.frame - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0
      }
    }
  }

}

class Fighter {
  constructor({ position, velocity, color, offset, c }) {
    this.c = c
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
      width: 100,
      height: 50
    }
    this.color = color
    this.isAttacking
    this.health = 100
    this.gravity = .4
  }

  draw() {
    //Sprite
    this.c.fillStyle = this.color
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    //Weapon
    if (this.isAttacking) {
      this.c.fillStyle = 'red'
      this.c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
  }

  update() {
    this.draw()

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= 480) {
      this.velocity.y = 0
    } else this.velocity.y += this.gravity
  }

  //Attack Method
  shortAttack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
  }
}

export { Sprite, Fighter };