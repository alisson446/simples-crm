import Vue from 'vue'
import Vuex from 'vuex'
import HelloWorld from './modules/HelloWorld'
import 'vue-material/dist/vue-material.min.css'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    HelloWorld
  }
})
