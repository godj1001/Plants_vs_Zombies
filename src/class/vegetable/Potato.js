import Body from '@/class/Body'
import store from '../../store'
import * as PIXI from 'pixi.js'
export default class Potato extends Body {
  static cost = 100

  constructor(props) {
    super(props)
    this.name = '土豆墙'
    this.health = 300
    store.commit('cost', { cost: Potato.cost })
    this.texture = PIXI.Texture.from(require('../../assets/vegetable/Potato.gif'))
  }

  initSprite() {
    this.sprite = new PIXI.Sprite(this.texture)
    this.sprite.width = 39
    this.sprite.height = 46
  }
  mountSprite(x, y) {
    this.sprite.x = 39 * y
    this.sprite.y = 46 * x
    this.event.emit('mount', this)
  }

  startWork() {
    super.startWork()
  }

  work() {
    console.log('哦吼 我是土豆墙')
  }
}
