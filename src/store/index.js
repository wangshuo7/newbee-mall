import { createStore } from 'vuex'

import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state: {
    // 购物车角标
    iconNum: 0,
    // 搜索缓存
    searchList: [],
    // 购物车icon颜色
    cartIconColor: '000'
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
    },
    changeCartIconColor(state, payload) {
      state.cartIconColor = payload
    }
  },
  actions: {},
  plugins: [
    createPersistedState({
      reducer: (state) => {
        return {
          iconNum: state.iconNum,
          searchList: state.searchList,
          cartIconColor: state.cartIconColor
        }
      }
    })
  ]
})

export default store
