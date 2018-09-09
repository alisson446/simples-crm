import Vue from 'vue'
import Vuex from 'vuex'

import HelloWorld from './modules/HelloWorld'
import Signup from './modules/Signup'
import Signin from './modules/Signin'
import Dashboard from './modules/Dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    HelloWorld,
    Signup,
    Signin,
    Dashboard
  }
})
