class Player {
  constructor({
    collisionBlocks = []
  }) {
    this.position = {
      x: 200,
      y: 200
    }

    this.velocity = {
      x: 0,
      y: 0
    }

    this.width = 25
    this.height = 25
    this.sides = {
      bottom: this.position.y + this.height
    }

    this.gravity = 1

    this.collisionBlocks = collisionBlocks
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.position.x += this.velocity.x

    this.checkForHorizontalCollisions()

    // gravity
    this.applyGravity()

    this.checkForVerticalCollisions()
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      // check horizontal collision
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on x-axis going to the left
        if (this.velocity.x < 0) {
          this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
          break
        }
        // collision on x-axis going to the right
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.01
          break
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      // check vertical collision
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on y axis on the top
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
          break
        }
        // collision on y axis on the bottom
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y - this.height - 0.01
          break
        }
      }
    }
  }
}
