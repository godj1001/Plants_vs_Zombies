import * as PIXI from 'pixi.js'
import Body from '@/class/Body'
import Stage from '@/class/Stage'
const roomCount = [39, 39 * 2, 39 * 3, 39 * 4, 39 * 5, 39 * 6, 39 * 7, 39 * 8, 39 * 9, 39 * 10]
const pic = [
  require('../../assets/Zombie/Zombie/Zombie1.png'),
  require('../../assets/Zombie/Zombie/Zombie2.png'),
  require('../../assets/Zombie/Zombie/Zombie3.png'),
  require('../../assets/Zombie/Zombie/Zombie4.png'),
  require('../../assets/Zombie/Zombie/Zombie5.png'),
  require('../../assets/Zombie/Zombie/Zombie6.png'),
  require('../../assets/Zombie/Zombie/Zombie7.png')
]
let lostFlag = false
export default class BaseZombie extends Body {
  constructor(props) {
    super(props)
    this.stageInstance = new Stage()
    this.name = '僵尸_' + this.id
    this.speed = 0.3
    this.attack = 0.5
    this.health = 100
    this.texture = PIXI.Texture.from(require('../../assets/Zombie/Zombie.gif'))
    this.positionX = 9
    this.attackVegetable = null
    this.textureArray = pic.map(i => {
      return PIXI.Texture.from(i)
    })
    this.workFn = () => {
      if (this.sprite.x < roomCount[this.positionX - 1]) {
        this.positionX--
      }
      if (this.sprite.x <= roomCount[8]) {
        const vegetable = this.stageInstance.room[this.positionY][this.positionX]
        if (vegetable) {
          console.log('攻击')
          vegetable.health -= this.attack
          if (vegetable.health <= 0) {
            this.event.emit('destroy', vegetable)
            this.stageInstance.room[this.positionY][this.positionX] = null
          }
        } else {
          this.sprite.x -= this.speed
        }
      }
      if (this.sprite.x > roomCount[8]) {
        this.sprite.x -= this.speed
      }
      if (this.sprite.x < -40 && !lostFlag) {
        window.alert('游戏结束')
        lostFlag = true
        location.reload()
        this.event.emit('restart')
      }
    }
  }
  initSprite() {
    this.sprite = new PIXI.AnimatedSprite(this.textureArray)
    this.sprite.animationSpeed = 0.1
    this.sprite.play()
    this.sprite.width = 39
    this.sprite.height = 46
  }
  mountSprite(x, y) {
    this.positionY = y
    this.sprite.x = x
    this.sprite.y = 46 * y
    this.event.emit('zombieMount', [this, y])
  }

  work() {
    this.event.emit('addTicker', this.workFn)
  }
  stopWork() {
    this.event.emit('removeTicker', this.workFn)
  }
}
