import { SUM } from '../mutations'

export default {
  state: {
    count: 0
  },
  mutations: {
    [SUM] (state, payload) {
      state.count += parseInt(payload)
    }
  }
}
