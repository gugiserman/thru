import { World, Player, Obstacle } from './'

class Game {
  constructor(container) {
    this.container = container
    this.canvas = container.getContext('2d')

    this.world = new World(this.container, this.canvas)
    this.obstacles = [new Obstacle(this.container, this.canvas, this.world)]
    this.player = new Player(this.container, this.canvas, this.world)

    this.setup().then(() => {
      this.resize(true)
      this.bind()
      this.render()
    })
  }

  setup() {
    return new Promise(resolve => {
      this.canvas.imageSmoothingEnabled = false

      if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
        return window.screen.orientation.lock('portrait')
          .then(resolve)
          .catch(resolve)
      }
    })
  }

  resize(silently = false) {
    if (window.innerWidth > window.innerHeight) {
      this.container.width = 960
      this.container.height = 600
    } else {
      this.container.width = 600
      this.container.height = 960
    }

    this.world.resize()
    this.player.resize()
    this.obstacles.forEach(obstacle => obstacle.resize())

    if (!silently) {
      return this.render()
    }
  }

  bind() {
    window.addEventListener('resize', () => this.resize())
  }

  checkCollision() {
    return this.obstacles.some(obstacle => {
      const obstacleBottom = (obstacle.y + 1)
      const playerBottom = (this.player.y + 1)

      if (
        (obstacleBottom >= this.player.y) &&
        (obstacle.y <= playerBottom)
      ) {
        if (obstacle.missingX !== this.player.x) {
          return true
        } else {
          this.player.paint(obstacle.fill)
          return false
        }
      } else {
        this.player.paint()
        return false
      }
    })
  }

  render() {
    this.canvas.clearRect(0, 0, this.container.width, this.container.height)

    this.world.render()
    this.player.render()
    this.obstacles.forEach(obstacle => obstacle.render())

    if (this.checkCollision()) {
      console.log('oi')
      return false
    }

    window.requestAnimationFrame(this.render.bind(this))
  }
}

export default Game
