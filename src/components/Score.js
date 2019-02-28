class Score {
  constructor(container, canvas, world) {
    this.container = container
    this.canvas = canvas
    this.world = world
    this.points = 0
    this.max = 0
  }

  up() {
    const nextPoints = (this.points + 1)

    if (nextPoints > this.max) {
      this.max = nextPoints
    }

    this.points = nextPoints
  }

  down() {
    this.points--
  }

  render() {
    const { columns, tileSize } = this.world
    const lost = (this.points < 0)

    const x = (columns - 3.5) * tileSize
    const y = 1.5 * tileSize

    this.canvas.fillStyle = '#333333'
    this.canvas.font = 'bold 32px Arial'

    if (lost) {
      const textMetrics = this.canvas.measureText(`Score: ${this.points}`)

      this.canvas.clearRect(x, (y - 32), textMetrics.width, 32)
      this.canvas.fillText(`Max Score: ${this.max}`, x - (tileSize * 1.5), y)
    } else {
      this.canvas.fillText(`Score: ${this.points}`, x, y)
    }
  }
}

export default Score
