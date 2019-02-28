class World {
  constructor(container, canvas) {
    this.container = container
    this.canvas = canvas

    this.tileSize = 0
    this.columns = 0
    this.rows = 0

    this.resize()
  }

  resize() {
    if (this.container.width && this.container.height) {
      this.tileSize = 24
      this.columns = Math.floor(this.container.width / this.tileSize)
      this.rows = Math.floor(this.container.height / this.tileSize) - 1
    }
  }

  drawLine(x1, y1, x2, y2) {
    this.canvas.beginPath()
    this.canvas.strokeStyle = '#fafafa'
    this.canvas.lineWidth = 1
    this.canvas.moveTo(x1, y1)
    this.canvas.lineTo(x2, y2)
    this.canvas.stroke()
  }

  render() {
    for (let i = 0; i < (this.columns + 1); i++) {
      const fromX = (i * this.tileSize)
      const fromY = 0

      const toX = fromX
      const toY = this.container.height

      this.drawLine(fromX, fromY, toX, toY)
    }

    for (let i = 0; i < (this.rows + 1); i++) {
      const fromX = 0
      const fromY = (i * this.tileSize)

      const toX = this.container.width
      const toY = fromY

      this.drawLine(fromX, fromY, toX, toY)
    }
  }
}

export default World
