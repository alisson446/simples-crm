import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import HelloWorld from './modules/HelloWorld'
import Signup from './modules/Signup'
import Signin from './modules/Signin'
import Dashboard from './modules/Dashboard'

Vue.use(Vuex)
Vue.use(VueMaterial)

export default new Vuex.Store({
  modules: {
    HelloWorld,
    Signup,
    Signin,
    Dashboard
  }
})
