import Vue from 'vue'
import Vuex from 'vuex'
import HelloWorld from './modules/HelloWorld'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    HelloWorld
  }
})
