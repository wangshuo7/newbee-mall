import { createStore } from 'vuex'

import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state: {
    iconNum: 0
  },
  mutations: {
    changeIconNum(state, payload) {
      state.iconNum = payload
    }
  },
  actions: {},
  plugins: [
    createPersistedState({
      reducer: () => {
        return {}
      }
    })
  ]
})

export default store
