import * as PIXI from 'pixi.js'
import Stage from '@/class/Stage'
let id = 1
export default class Base {
  constructor(position) {
    this.id = id
    id++
    this.stageInstance = new Stage()
    this.position = position
    this.name = 'base'
    this.cost = 50
    this.health = 100
    this.texture = PIXI.Texture.from(require('./logo.png'))
  }
  startWork() {
    this.work()
  }
  setSprite(postX, postY) {
    this.sprite = new PIXI.Sprite(this.texture)
    this.sprite.width = 35
    this.sprite.height = 42
    this.sprite.x = 39 * postY
    this.sprite.y = 46 * (postX)
    this.stageInstance.addSprite({ id: this.id, instance: this.sprite })
  }
  work() {
    console.log('this is work')
  }
}
