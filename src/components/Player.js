class Player {
  constructor(container, canvas, world) {
    this.container = container
    this.canvas = canvas
    this.world = world

    this.size = -1
    this.x = this.getStartingX()
    this.y = this.getStartingY()

    this.resize()
  }

  resize() {
    if ((this.size < 0) && this.world.tileSize) {
      this.size = this.world.tileSize
    }

    if ((this.x < 0 || this.y < 0)) {
      this.x = this.getStartingX()
      this.y = this.getStartingY()
    }
  }

  getStartingX() {
    if (!this.world.columns) {
      return -1
    }

    return Math.floor(this.world.columns / 2)
  }

  getStartingY() {
    if (!this.world.rows) {
      return -1
    }

    return Math.floor(this.world.rows / 1.5)
  }

  render() {
    this.canvas.beginPath()
    this.canvas.fillStyle = '#000000'
    this.canvas.strokeStyle = '#fafafa'
    this.canvas.rect((this.x * this.size), (this.y * this.size), this.size, this.size)
    this.canvas.fill()
    this.canvas.stroke()
  }
}

export default Player
