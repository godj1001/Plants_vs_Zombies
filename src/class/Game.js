import { getValue } from './vault'
import Stage from '@/class/Stage'
import BaseZombie from '@/class/zombie/BaseZombie'

export default class Game {
  constructor() {
    this.vault = getValue()
    this.stage = {
      room: []
    }
  }
  setStage(stage) {
    this.stage = new Stage(stage)
  }

  setVegetable(positionX, positionY, vegetable) {
    this.stage.setVegetable(positionX, positionY, vegetable)
  }

  startGame() {
    console.log('僵尸来了')
    setTimeout(() => {
      setInterval(() => {
        let y = Math.floor(Math.random() * 5)
        let zombie = new BaseZombie()
        zombie.setSprite(423, y)
      }, 2000)
    }, 10000)
  }
}
