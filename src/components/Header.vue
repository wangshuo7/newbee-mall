<template>
  <div class="header">
    <div class="header-left" @click="goBack">
      <i class="iconfont">&#xe608;</i>
    </div>
    <slot name="input"></slot>
    <slot name="btn"></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1)
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 44px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
