<template>
  <div class="bottom-nav">
    <router-link class="nav-list-item active" :to="{ name: 'home' }">
      <i class="iconfont">&#xea9a;</i>
      <span>首页</span>
    </router-link>
    <router-link class="nav-list-item" :to="{ name: 'category' }">
      <i class="iconfont">&#xe811;</i>
      <span>分类</span>
    </router-link>
    <router-link class="nav-list-item" :to="{ name: 'cart' }">
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="iconNum ? iconNum : ''"
      />
    </router-link>
    <router-link class="nav-list-item" :to="{ name: 'user' }">
      <i class="iconfont">&#xeab3;</i>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import { getShopCart } from '@/api/cart.js'
import { mapState } from 'vuex'
export default defineComponent({
  data() {
    return {
      cartList: []
    }
  },
  computed: {
    ...mapState(['iconNum']),
    cartNum() {
      return this.cartList.length
    }
  }
})
</script>
<style lang="scss" scoped>
.bottom-nav {
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #e9e9e9;
  padding: 5px 0;
  display: flex;
  justify-content: space-around;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  .nav-list-item {
    color: #000;
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    &.router-link-active {
      // 表示router-link激活选中时的状态
      color: #f5576c;
    }
    .iconfont {
      font-size: 22px;
    }
    span {
      font-size: 12px;
    }
  }
}
</style>
