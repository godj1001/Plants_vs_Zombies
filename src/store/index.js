import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 150
  },
  mutations: {
    increment (state) {
      state.count += 10
    },
    cost(state, data) {
      console.log(data.cost)
      state.count -= data.cost
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    cost(context) {
      context.commit('cost')
    }
  }
})
export default store
