import { World, Player, Obstacle, Score } from './'

class Game {
  constructor(container) {
    this.container = container
    this.canvas = container.getContext('2d')

    this.world = new World(this.container, this.canvas)
    this.score = new Score(this.container, this.canvas, this.world)
    this.obstacles = [new Obstacle(this.container, this.canvas, this.world, 0, 0, this.score, this.handleObstacleFinished.bind(this))]
    this.player = new Player(this.container, this.canvas, this.world)

    this.touchInterval = null
    this.touchIntervalCount = 0

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
      this.container.width = 1920
      this.container.height = 1200
    } else {
      this.container.width = 1200
      this.container.height = 1920
    }

    this.world.resize()
    this.player.resize()
    this.obstacles.forEach(obstacle => obstacle.resize())

    if (!silently) {
      return this.render()
    }
  }

  handleTouchStart(event) {
    event.preventDefault && event.preventDefault()
    event.stopPropagation && event.stopPropagation()
    event.cancelBubble = true
    event.returnValue = false

    const { pageX: targetX, pageY: targetY } = (event.touches[0] || {})

    const centerX = Math.floor(window.innerWidth / 2)
    const centerY = Math.floor(window.innerHeight / 2)

    if (targetX < centerX) {
      this.player.moveLeft()
    } else {
      this.player.moveRight()
    }

    this.touchInterval = window.setTimeout(() => {
      this.touchIntervalCount++

      this.handleTouchStart({
        touches: [{
          pageX: targetX,
          pageY: targetY,
        }],
      }, true)
    }, (100 - ((this.touchIntervalCount > 4 ? 4 : this.touchIntervalCount) * 17)))
  }

  handleTouchEnd() {
    window.clearTimeout(this.touchInterval)
    this.touchInterval = null
    this.touchIntervalCount = 0
  }

  bind() {
    window.addEventListener('resize', () => this.resize())
    window.addEventListener('touchstart', this.handleTouchStart.bind(this))
    window.addEventListener('touchend', this.handleTouchEnd.bind(this), false)
    window.addEventListener('touchcancel', this.handleTouchEnd.bind(this), false)
  }

  handleObstacleFinished() {
    const finishedObstacles = this.obstacles.filter(obstacle => obstacle.finished && !obstacle.hidden)

    if (finishedObstacles.length > 5) {
      this.score.up()
      finishedObstacles.forEach(obstacle => obstacle.paint('#333333'))

      window.setTimeout(() => {
        finishedObstacles.forEach(obstacle => obstacle.hide())
      }, 1000)
    }
  }

  spawnObstacle() {
    this.obstacles.push(
      new Obstacle(
        this.container,
        this.canvas,
        this.world,
        this.obstacles.length,
        (this.obstacles.length % 6),
        this.score,
        this.handleObstacleFinished.bind(this),
      )
    )
  }

  checkCollision() {
    return this.obstacles.some(obstacle => {
      if (obstacle.y > this.player.y && (obstacle.missingX >= 0)) {
        obstacle.complete()
        this.spawnObstacle()
      }

      if (obstacle.y === this.player.y) {
        if (obstacle.missingX !== this.player.x && !obstacle.collided) {
          this.score.down()
          obstacle.collide()
          return false
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
    this.score.render()
    this.player.render()
    this.obstacles.forEach(obstacle => obstacle.render())

    this.checkCollision()

    if (this.score.points < 0) {
      return null
    }

    window.requestAnimationFrame(this.render.bind(this))
  }
}

export default Game
