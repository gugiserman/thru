import 'normalize.css'
import domready from 'domready'
import { Game } from './components'

const init = () => {
  return new Game(document.getElementById('thru'))
}

domready(init)
