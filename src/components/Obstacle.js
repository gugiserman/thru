import randomColor from 'randomcolor'

class Obstacle {
  constructor(container, canvas, world, index, positionalIndex, score, onFinish) {
    this.container = container
    this.canvas = canvas
    this.world = world
    this.index = index
    this.positionalIndex = positionalIndex

    this.x = 0
    this.y = 0
    this.missingX = this.getRandomMissingX()
    this.rate = ((.2 - (score.points * .01)) * 1000)

    this._fill = this.getRandomFill()
    this.fill = this._fill

    this.collided = false
    this.hidden = false
    this.finished = false
    this.interval = null

    this.onFinish = onFinish
  }

  getRandomFill() {
    return randomColor()
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
    if (this.y < (this.world.rows - this.positionalIndex)) {
      this.y += 1

      if (this.y >= (this.world.rows - this.positionalIndex)) {
        window.clearInterval(this.interval)
        this.interval = null
        this.finish()
      }
    }
  }

  collide() {
    this.collided = true
  }

  complete() {
    this.missingX = -1
  }

  finish() {
    this.finished = true
    this.onFinish()
  }

  hide() {
    this.hidden = true
  }

  loop() {
    this.interval = window.setInterval(this.fall.bind(this), this.rate)
  }

  paint(color) {
    this.fill = color || this._fill
  }

  render() {
    if (this.hidden) {
      return null
    }

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

      if (this.missingX >= 0) {
        this.canvas.stroke()
      }
    }

    if (this.world.columns > 0 && !this.interval) {
      this.loop()
    }
  }
}

export default Obstacle
