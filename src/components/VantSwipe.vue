<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1baeae">
    <van-swipe-item v-for="item in bannerList" :key="item">
      <img :src="item" alt="" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { defineComponent } from 'vue'
// import { getHomeData } from '@/api/Home.js'

export default defineComponent({
  data() {
    return {
      bannerList: [
        'https://image4.suning.cn/uimg/cms/img/166547239184953877.jpg',
        'https://image1.suning.cn/uimg/cms/img/166445104253973015.jpg',
        'https://image3.suning.cn/uimg/cms/img/164429932589856143.jpg'
      ]
    }
  }
  // created() {
  //   getHomeData().then((res) => {
  //     this.bannerList = res.data.carousels
  //   })
  // }
})
</script>

<style lang="scss" scoped>
.my-swipe {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
