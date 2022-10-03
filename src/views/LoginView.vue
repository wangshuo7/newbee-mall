<template>
  <!-- 导航栏 -->
  <header class="simple-header">
    <van-icon name="arrow-left" @click="goBack" />
    <div class="simple-header-name">{{ name }}</div>
    <van-icon name="weapp-nav" />
  </header>
  <div class="loginContainer">
    <!-- 登录首页 -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      type: 'login',
      back: '/home'
    }
  },
  computed: {
    name() {
      return this.type == 'login' ? '登录' : '注册'
    }
  },
  methods: {
    goBack() {
      if (!this.back) {
        this.$router.go(-1)
      } else {
        this.$router.push({ path: this.back })
      }
      // this.$emit('callback')
    }
  }
})
</script>

<style lang="scss" scoped>
.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  line-height: 44px;
  padding: 0 10px;
  box-sizing: border-box;
  color: #252525;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  .simple-header-name {
    font-size: 14px;
  }
}
</style>
