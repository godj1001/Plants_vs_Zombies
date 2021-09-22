import store from '../../store'
import * as PIXI from 'pixi.js'
import Body from '@/class/Body'
export default class Sunflower extends Body {
  static cost = 50

  constructor(props) {
    super(props)
    this.name = '向日葵'
    this.health = 100
    store.commit('cost', { cost: Sunflower.cost })
    this.texture = PIXI.Texture.from(require('../../assets/vegetable/Sunflower.gif'))
  }

  work() {
    setInterval(() => {
      console.log('provide sun')
      store.commit('increment')
      console.log(store.state.count)
    }, 3000)
  }
}
