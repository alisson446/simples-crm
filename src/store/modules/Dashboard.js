import { auth } from '../../../api/firebase'
import { SIGNOUT } from '../constants'
import router from '@/router'

export default {
  state: {},
  mutations: {},
  actions: {
    [SIGNOUT] () {
      auth.signOut().then(function () {
        router.push('/signin')
      })
    }
  }
}
