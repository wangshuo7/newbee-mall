import { createStore } from 'vuex'

import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state: {
    iconNum: 0,
    searchList: []
  },
  mutations: {
    changeIconNum(state, payload) {
      state.iconNum = payload
    },
    pushSearchList(state, payload) {
      state.searchList.push(...payload)
    },
    deleteSearchList(state) {
      state.searchList = []
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
