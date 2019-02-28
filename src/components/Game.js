import { World, Player, Obstacle } from './'

class Game {
  constructor(container) {
    this.container = container
    this.canvas = container.getContext('2d')

    this.world = new World(this.container, this.canvas)
    this.obstacles = [new Obstacle(this.container, this.canvas, this.world, 0, this.handleObstacleFinished.bind(this))]
    this.player = new Player(this.container, this.canvas, this.world)

    this.score = 0

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

  handleTouch(event) {
    const { pageX: targetX, pageY: targetY } = (event.touches[0] || {})

    const centerX = Math.floor(this.container.width / 2)
    const centerY = Math.floor(this.container.height / 2)

    if (targetX < centerX) {
      this.player.moveLeft()
    } else {
      this.player.moveRight()
    }
  }

  bind() {
    window.addEventListener('resize', () => this.resize())
    this.container.addEventListener('touchstart', this.handleTouch.bind(this))
  }

  handleObstacleFinished() {
    const finishedObstacles = this.obstacles.filter(obstacle => obstacle.finished)
    const finishedObstaclesIndexes = finishedObstacles.map(obstacle => obstacle.index)

    if (finishedObstacles.length > 4) {
      this.score++
      this.obstacles = this.obstacles.filter(obstacle => !finishedObstaclesIndexes.includes(obstacle.index))
    }
  }

  spawnObstacle() {
    this.obstacles.push(
      new Obstacle(this.container, this.canvas, this.world, this.obstacles.length, this.handleObstacleFinished.bind(this))
    )
  }

  checkCollision() {
    return this.obstacles.some(obstacle => {
      if (obstacle.y > this.player.y && (obstacle.missingX >= 0)) {
        obstacle.complete()
        this.spawnObstacle()
      }

      if (obstacle.y === this.player.y) {
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
      return false
    }

    window.requestAnimationFrame(this.render.bind(this))
  }
}

export default Game
