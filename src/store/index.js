import Vue from 'vue'
import Vuex from 'vuex'

import Signup from './modules/Signup/index'
import Signin from './modules/Signin/index'
import Dashboard from './modules/Dashboard/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Signup,
    Signin,
    Dashboard
  }
})
