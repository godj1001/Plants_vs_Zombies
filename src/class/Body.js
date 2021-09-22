import * as PIXI from 'pixi.js'
import Subscribe from '@/class/Subscribe'
let id = 1
export default class Body {
  constructor(position) {
    // 全局唯一id 用于清除
    this.id = id
    id++
    this.event = new Subscribe()
    this.position = position
    this.name = 'base'
    this.cost = 50
    this.health = 100
    this.texture = PIXI.Texture.from(require('./vegetable/logo.png'))
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
    this.work()
  }
  setSprite(postX, postY) {
    this.initSprite()
    this.mountSprite(postX, postY)
  }
  work() {
    console.log('this is work')
  }
}
