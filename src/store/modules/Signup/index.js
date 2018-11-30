import {
  SIGNUP,
  CHECK_FIELD_VALUE_EXISTS,
  USER_CREATED
} from '../../constants'

import checkFieldValueExists from './checkFieldValueExists'
import signup from './signup'

export default {
  state: {
    authUserId: null,
    userAccount: null,
    userName: null,
    userEmail: null,
    userAccountExists: false,
    userAccountInvalided: false,
    emailExists: false,
    userSaved: false,
    sending: false
  },
  mutations: {
    [USER_CREATED] (state, payload) {
      state.authUserId = payload.authUserId
      state.userAccount = payload.userAccount
      state.userName = payload.userName
      state.userEmail = payload.userEmail
      state.userSaved = true
      state.sending = false
    }
  },
  actions: {
    [CHECK_FIELD_VALUE_EXISTS]: checkFieldValueExists,
    [SIGNUP]: signup
  }
}
