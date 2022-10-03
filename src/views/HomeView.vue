<template>
  <header v-bind="head">
    <a href="#" class="header-classify">
      <i class="iconfont">&#xe611;</i>
    </a>
    <div class="search">
      <span class="search-name">新蜂商城</span>
      <a href="#" class="search-title">山河无恙，人间皆安</a>
    </div>
    <a href="#" class="header-user">
      <i class="iconfont">&#xe60f;</i>
    </a>
  </header>
  <Carousel></Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import Carousel from '@/components/Carousel.vue'
export default defineComponent({
  data() {
    return {
      // 动态切换header的class名
      head: {
        class: 'header'
      },
      bannerList: [] // 轮播图列表
    }
  },
  components: {
    Carousel
  }
})
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.header {
  height: 50px;
  // background-color: #1baeae;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;

  .header-classify,
  .header-user {
    color: #1baeae;
  }

  .header-classify .iconfont {
    font-size: 20px;
    line-height: 50px;
  }

  .header-user .iconfont {
    font-size: 27px;
    line-height: 50px;
  }

  .search {
    width: 74%;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    margin: 10px 0;
    display: flex;
    align-items: center;

    .search-name {
      color: #1baeae;
      font-size: 20px;
      font-weight: 700;
      border-right: 1px solid #666;
      padding: 0 10px;
    }

    .search-title {
      color: #666;
      font-size: 10px;
      flex: 1;
      text-align: center;
    }
  }
}
.header-active {
  height: 50px;
  background-color: #1baeae;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  .header-classify,
  .header-user {
    color: #fff;
  }
  .header-classify .iconfont {
    font-size: 20px;
    line-height: 50px;
  }
  .header-user .iconfont {
    font-size: 27px;
    line-height: 50px;
  }
  .search {
    width: 74%;
    background: #bbe7e7;
    border-radius: 20px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    .search-name {
      color: #1baeae;
      font-size: 20px;
      font-weight: 700;
      border-right: 1px solid #666;
      padding: 0 10px;
    }
    .search-title {
      color: #666;
      font-size: 10px;
      flex: 1;
      text-align: center;
    }
  }
}
</style>
