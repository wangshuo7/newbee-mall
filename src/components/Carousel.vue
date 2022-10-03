<template>
  <div class="block text-center" m="t-4">
    <el-carousel
      height="150px"
      arrow="never"
      autoplay="true"
      ref="slideCarousel"
    >
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    bannerList: Array
  },
  mounted() {
    this.slideBanner()
  },
  methods: {
    // 轮播图滑动
    slideBanner() {
      //选中的轮播图
      var box = document.querySelector('.el-carousel__container')
      var startPoint = 0
      var stopPoint = 0
      //重置坐标
      var resetPoint = function () {
        startPoint = 0
        stopPoint = 0
      }
      //手指按下
      box.addEventListener('touchstart', function (e) {
        //手指点击位置的X坐标
        startPoint = e.changedTouches[0].pageX
      })
      //手指滑动
      box.addEventListener('touchmove', function (e) {
        //手指滑动后终点位置X的坐标
        stopPoint = e.changedTouches[0].pageX
      })
      //当手指抬起的时候，判断图片滚动离左右的距离
      let that = this
      box.addEventListener('touchend', function () {
        console.log('1:' + startPoint)
        console.log('2:' + stopPoint)
        if (stopPoint == 0 || startPoint - stopPoint == 0) {
          resetPoint()
          return
        }
        if (startPoint - stopPoint > 0) {
          resetPoint()
          that.$refs.slideCarousel.next()
          return
        }
        if (startPoint - stopPoint < 0) {
          resetPoint()
          that.$refs.slideCarousel.prev()
          return
        }
      })
    },
    goTo(url) {
      window.open(url)
    }
  }
})
</script>

<style lang="scss" scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
