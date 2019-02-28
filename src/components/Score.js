class Score {
  constructor(container, canvas, world) {
    this.container = container
    this.canvas = canvas
    this.world = world
    this.points = 0
  }

  up() {
    this.points++
  }

  down() {
    this.points--
  }

  render() {
    const { columns, tileSize } = this.world

    const x = (columns - 3.5) * tileSize
    const y = 1.5 * tileSize

    this.canvas.fillStyle = '#333333'
    this.canvas.font = 'bold 32px Arial'
    this.canvas.fillText(`Score: ${this.points}`, x, y)
  }
}

export default Score
