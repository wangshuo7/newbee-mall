import { createStore } from 'vuex'
//vuex持久化保存插件
import createPersistedState from 'vuex-persistedstate'
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      userInfo: null
    }
  },
  mutations: {
    keep(state, payload) {
      state.userInfo = payload
    }
  },
  plugins: [
    createPersistedState({
      // 设置持久化的数据
      reducer: (state) => {
        return {
          userInfo: state.userInfo
        }
      }
    })
  ]
})

export default store