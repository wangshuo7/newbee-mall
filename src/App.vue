<template>
  <!-- 页面过渡动画 -->
  <!-- <router-view v-slot="{ Component }">
    <transition name="slide">
      <component :is="Component" />
    </transition>
  </router-view> -->

  <router-view></router-view>
  <BottomNav v-if="$route.path !== '/orders'"></BottomNav>
</template>

<script>
import { defineComponent } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
export default defineComponent({
  name: 'demo',
  components: {
    BottomNav
  }
})
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body,
#app {
  height: 100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.15s ease-in;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
