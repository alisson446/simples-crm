import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import HelloWorld from './modules/HelloWorld'
import Signup from './modules/Signup'

Vue.use(Vuex)
Vue.use(VueMaterial)

export default new Vuex.Store({
  modules: {
    HelloWorld,
    Signup
  }
})
