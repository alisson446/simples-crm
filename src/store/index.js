import Vue from 'vue'
import Vuex from 'vuex'
import HelloWorld from './modules/HelloWorld'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(Vuex)
Vue.use(VueMaterial)

export default new Vuex.Store({
  modules: {
    HelloWorld
  }
})
