<template>
  <div class="game" id="game">
    <div class="toast" v-show="toast">
      <img src="../assets/toast.gif" alt="">
    </div>
    <div class="vegetable-list">
      <div class="vegetable-list__item" :overcost="vegetable.cost>vaultValue" :active="vegetableSelect === vegetable" v-for="vegetable in vegetableList" :key="vegetable.name" @mousedown="select(vegetable)">
        {{ vegetable.name }}
      </div>
    </div>
    <div class="vault">
      {{vaultValue}}
    </div>
    <div class="table" id="stage">
      <div class="row " v-for="(row,x) in game.stage.room" :key="x">
        <div class="cell" v-for="(cell,y) in row" :key="y" @click="clickRoom(x,y)">
          <cell :content="cell">
          </cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from '@/class/Game'
// import Base from '@/class/vegetable/base'
import Sunflower from '@/class/vegetable/sunflower'
import Peashooter from '@/class/vegetable/Peashooter'
import Potato from '@/class/vegetable/Potato'
const getInstance = (Fn, position) => {
  console.log('instance')
  return new Fn(position)
}
const vegetableList = [
  { name: '向日葵', content: Sunflower, cost: Sunflower.cost },
  { name: '豌豆射手', content: Peashooter, cost: Peashooter.cost },
  { name: '土豆', content: Potato, cost: 100 }
  // { name: '樱桃炸弹', content: Sunflower, cost: 150 },
  // { name: '倭瓜拳手', content: Sunflower, cost: 50 }
]
export default {
  name: 'Game',
  components: {
    cell: () => import('./cell.vue')
  },
  data() {
    return {
      vegetableList,
      vegetableSelect: '',
      game: new Game(),
      start: false,
      toast: false
    }
  },
  computed: {
    vaultValue: function () {
      return this.$store.state.count
    }
  },
  mounted() {
    this.$nextTick(() => {
      const stage = document.getElementById('game')
      this.game.setStage(stage)
    })
  },
  methods: {
    costValue (value) {
      this.vaultValue -= value
    },
    clickRoom(x, y) {
      console.log(document.getElementById('game'))
      if (this.game.stage.room[x][y] !== null || this.vegetableSelect === '') {
        return
      }
      let v = getInstance(this.vegetableSelect.content, { x, y })
      this.game.setVegetable(x, y, v)
      this.vegetableSelect = ''
      this.$forceUpdate()
      this.startGame()
    },
    startGame() {
      if (!this.start) {
        this.game.startGame()
        this.start = true
        setTimeout(() => {
          this.toast = true
          setTimeout(() => {
            this.toast = false
          }, 1000)
        }, 3000)
      }
    },
    select(v) {
      if (this.vaultValue < v.cost) {
        return
      }
      this.vegetableSelect = v
    }
  }
}
</script>

<style scoped lang="scss">
.game{
  background: url("../assets/bg.jpg") no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  width: 679px;
  height: 364px;
  position: relative;
  user-select: none;
  overflow: hidden;
  .toast{
    z-index: 10;
    position: absolute;
    width: 200px;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .vault{
    position: absolute;
    min-width: 50px;
    text-align: center;
    border: 2px solid #895c24;
    left:170px;
    top:50px;
    padding: 4px 12px ;
    font-size: 16px;
    color: white;
    background: #cf9236;
    border-radius: 5px;
  }
  .vegetable-list{
    width: 360px;
    background: #cf9236;
    position: absolute;
    left: 250px;
    padding:10px 4px ;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 2px solid #895c24;
    border-radius: 5px;
    .vegetable-list__item{
      background: white;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      width: 40px;
      margin-left: 10px;
      border-radius: 5px;
      border: 2px solid rgba(0, 0, 0, 0);

      &:first-child{
        margin-left: 0;
      }
      &[active=true]{
        border: 2px solid red;
      }
      &[overcost=true]{
        background: #7f7f7f;
        cursor: not-allowed;
      }
    }
  }
  .table{
    position: absolute;
    left: 255px;
    top:96px;
    z-index: 2;
  }
}

.row{
  height: 46px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.cell{
  &:hover{
    background: rgba(245, 245, 220, 0.16);
  }
  display: inline-block;
  height: 100%;
  width: 39px;
}
</style>
