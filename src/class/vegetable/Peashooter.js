import store from '@/store'
import * as PIXI from 'pixi.js'
import Body from '@/class/Body'
import Stage from '@/class/Stage'

const createBullet = (x, y) => {
  const bullet = new Bullet()
  bullet.setSprite(x, y)
}
const pic = [
  require('../../assets/vegetable/Peashooter/Peashooter1.png'),
  require('../../assets/vegetable/Peashooter/Peashooter2.png'),
  require('../../assets/vegetable/Peashooter/Peashooter3.png'),
  require('../../assets/vegetable/Peashooter/Peashooter4.png'),
  require('../../assets/vegetable/Peashooter/Peashooter5.png'),
  require('../../assets/vegetable/Peashooter/Peashooter6.png')
]
export default class Peashooter extends Body {
  static cost = 50

  constructor(props) {
    super(props)
    this.name = '豌豆射手'
    this.health = 100
    store.commit('cost', { cost: Peashooter.cost })
    this.textureArray = pic.map(i => {
      return PIXI.Texture.from(i)
    })
    this.texture = PIXI.Texture.from(require('../../assets/vegetable/Peashooter.gif'))
  }
  initSprite() {
    this.sprite = new PIXI.AnimatedSprite(this.textureArray)
    this.sprite.animationSpeed = 0.2
    this.sprite.play()
    this.sprite.width = 39
    this.sprite.height = 46
  }
  work() {
    setInterval(() => {
      createBullet(this.position.x, this.position.y, this.stageInstance)
    }, 2000)
  }
}

/**
 * 子弹
 */
class Bullet extends Body {
  constructor(prop) {
    super(prop)
    this.stageInstance = new Stage()
    this.power = 10
    this.texture = PIXI.Texture.from(require('../../assets/vegetable/Bullet.gif'))
    this.workFn = () => {
      this.sprite.x += 0.5
      let zombie = this.stageInstance.zombieList[this.positionX][0] || null
      if (zombie) {
        console.log(this.stageInstance.zombieList)
        if (this.sprite.x >= zombie.sprite.x) {
          this.stopWork()
          console.log('击中' + zombie.name)
          console.log('销毁' + this.positionX + '行第一个僵尸')
          zombie.stopWork()
          this.event.emit('destroy', this)
          this.event.emit('removeZombie', [ this.positionX, zombie ])
          // this.stageInstance.removeZombie(this.positionX)
          // this.stageInstance.removeSprite({ id: this.id, instance: this.sprite })
        }
      }
    }
  }
  initSprite() {
    this.sprite = new PIXI.Sprite(this.texture)
    this.sprite.width = 20
    this.sprite.height = 15
  }

  mountSprite(x, y) {
    this.positionX = x
    this.sprite.x = 39 * y + 30
    this.sprite.y = 46 * x
    this.event.emit('mount', this)
  }

  work() {
    this.event.emit('addTicker', this.workFn)
  }
  stopWork() {
    this.event.emit('removeTicker', this.workFn)
  }
}
