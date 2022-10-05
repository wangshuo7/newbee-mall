<template>
  <router-view></router-view>
  <BottomNav></BottomNav>
</template>

<script>
import { defineComponent } from 'vue'
import BottomNav from './components/BottomNav.vue'
export default defineComponent({
  components: {
    BottomNav
  }
})
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
