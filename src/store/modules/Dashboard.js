// import { CHECK_AUTH_STATE } from '../actions'
import { auth } from '../../../api/firebase'
import router from '@/router'

auth.onAuthStateChanged(function (user) {
  if (!user) {
    // User is signed out.
    router.push('/signin')
  }
})

export default {
  state: {},
  mutations: {},
  actions: {}
}
