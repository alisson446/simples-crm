import { auth } from '../../../../api/firebase'
import router from '@/router'

export default function signout () {
  auth.signOut().then(function () {
    router.push('/signin')
  })
}
