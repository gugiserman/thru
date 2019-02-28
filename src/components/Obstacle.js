import { unique_shuffled_colors } from 'unique-colors'

class Obstacle {
  constructor(container, canvas, world) {
    this.container = container
    this.canvas = canvas
    this.world = world

    this.x = 0
    this.y = 0
    this.rate = 0.08
    this.fill = this.getRandomFill()
    this.missingX = this.getRandomMissingX()
  }

  getRandomFill() {
  }

  getRandomMissingX() {
    if (!this.world.columns) {
      return -1
    }

    return Math.floor(Math.random() * this.world.columns)
  }

  resize() {
    if (this.missingX < 0) {
      this.missingX = this.getRandomMissingX()
    }
  }

  render() {
    const { columns, tileSize } = this.world

    for (let i = 0; i < this.world.columns; i++) {
      if (i === this.missingX) {
        continue
      }

      const x = (i * tileSize)
      const y = (this.y * tileSize)

      this.canvas.beginPath()
      this.canvas.fillStyle = '#ddd'
      this.canvas.strokeStyle = '#fafafa'
      this.canvas.rect(x, y, tileSize, tileSize)
      this.canvas.fill()
      this.canvas.stroke()
    }

    if ((this.world.columns > 0) && (this.y < this.world.rows)) {
      this.y += this.rate
    }
  }
}

export default Obstacle
