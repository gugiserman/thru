import { unique_colors } from 'unique-colors'

class Obstacle {
  constructor(container, canvas, world, index, onFinish) {
    this.container = container
    this.canvas = canvas
    this.world = world
    this.index = index

    this.x = 0
    this.y = 0
    this.rate = ((.5 - (index * .025)) * 1000)
    this.fill = this.getRandomFill()
    this.missingX = this.getRandomMissingX()

    this.finished = false
    this.interval = null

    this.onFinish = onFinish
  }

  getRandomFill() {
    return unique_colors(1)
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

  fall() {
    if (this.y < (this.world.rows - this.index)) {
      this.y += 1

      if (this.y >= (this.world.rows - this.index)) {
        window.clearInterval(this.interval)
        this.interval = null
        this.finish()
      }
    }
  }

  complete() {
    this.missingX = -1
  }

  finish() {
    this.finished = true
    this.onFinish()
  }

  loop() {
    this.interval = window.setInterval(this.fall.bind(this), this.rate)
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
      this.canvas.fillStyle = this.fill
      this.canvas.strokeStyle = '#fafafa'
      this.canvas.rect(x, y, tileSize, tileSize)
      this.canvas.fill()
      this.canvas.stroke()
    }

    if (this.world.columns > 0 && !this.interval) {
      this.loop()
    }
  }
}

export default Obstacle
