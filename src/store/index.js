import { createStore } from 'vuex'

import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state() {},
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
