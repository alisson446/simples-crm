import Vue from 'vue'
import Vuex from 'vuex'
import { SUM } from './constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    [SUM] (state, payload) {
      state.count += parseInt(payload)
    }
  }
})
