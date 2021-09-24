import * as PIXI from 'pixi.js'
import Subscribe from '@/class/Subscribe'

export default class Stage {
  static instance;
  constructor(root) {
    if (Stage.instance) {
      return Stage.instance
    }
    this.room = new Array(5).fill(0).map(() => {
      return new Array(9).fill(null)
    })

    this.event = new Subscribe()

    this.subscribe = new Subscribe()
    this.spriteList = []
    this.zombieList = new Array(5).fill(0).map(() => {
      return []
    })
    this.initApp()
    root.appendChild(this.app.view)
    this.initEvent()
    Stage.instance = this
  }
  restart() {
    this.spriteList = []
    this.zombieList = new Array(5).fill(0).map(() => {
      return []
    })
  }
  /**
   * init app of pixi
   */
  initApp() {
    this.app = new PIXI.Application({
      transparent: true,
      width: 423,
      height: 230
    })
    this.app.view.style.position = 'absolute'
    this.app.view.style.left = '255px'
    this.app.view.style.top = '96px'
    this.app.view.style.height = '230px'
    this.app.view.style.width = '423px'
  }
  initEvent() {
    this.event.on('destroy', (e) => {
      this.removeSprite(e)
    })

    this.event.on('mount', (e) => {
      this.addSprite(e)
    })

    this.event.on('addTicker', (e) => {
      this.app.ticker.add(e)
    })
    this.event.on('removeTicker', (e) => {
      this.app.ticker.remove(e)
    })
    this.event.on('zombieMount', (e) => {
      this.addZombie(...e)
    })
    this.event.on('removeZombie', (e) => {
      this.removeZombie(...e)
    })
  }

  /**
   * 添加精灵
   * @param body
   */
  addSprite(body) {
    this.spriteList.push(body)
    this.app.stage.addChild(body.sprite)
    body.startWork()
  }

  /**
   * remove the sprite from stage
   * @param body
   */
  removeSprite(body) {
    const index = this.spriteList.findIndex(s => s.id === body.id)
    this.spriteList.splice(index, 1)
    body.sprite.destroy()
    try {
      body.stopWork()
    } catch (e) {
      console.log(body + 'dont have stopwork fn')
    }
  }

  /**
   * set body (vegetable) in room
   * @param positionX
   * @param positionY
   * @param vegetable
   */
  setVegetable(positionX, positionY, vegetable) {
    this.room[positionX][positionY] = vegetable
    vegetable.setSprite(positionX, positionY)
  }
  addZombie(zombie, y) {
    this.zombieList[y].push(zombie)
    this.app.stage.addChild(zombie.sprite)
    zombie.startWork()
  }
  removeZombie(y, zombie) {
    let index = this.zombieList[y].findIndex((i) => {
      return i.id === zombie.id
    })
    this.zombieList[y].splice(index, 1)
    zombie.sprite.destroy()
  }
}
