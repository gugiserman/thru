import { World, Player } from './'

class Game {
  constructor(container) {
    this.container = container
    this.canvas = container.getContext('2d')
    this.world = new World(this.container, this.canvas)
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

    if (!silently) {
      return this.render()
    }
  }

  bind() {
    const animationId = window.requestAnimationFrame(this.render.bind(this))
    window.onbeforeunload = () => window.cancelAnimationFrame(animationId)
    window.addEventListener('resize', () => this.resize())
  }

  render() {
    this.canvas.clearRect(0, 0, this.container.width, this.container.height)

    this.world.render()
    this.player.render()
  }
}

export default Game
