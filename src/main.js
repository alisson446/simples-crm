// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import InstantSearch from 'vue-instantsearch'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueClip from 'vue-clip'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import store from '@/store'
import router from '@/router'
import App from './App'

Vue.use(InstantSearch)
Vue.use(VueMaterial)
Vue.use(VueClip)
Vue.use(Vuetify)

Vue.config.productionTip = process.env.NODE_ENV === 'production'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
