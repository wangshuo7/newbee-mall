<template>
  <div>
    <!-- 头部 -->
    <header v-bind="head">
      <router-link to="./category" href="#" class="header-classify">
        <i class="iconfont">&#xe611;</i>
      </router-link>
      <div class="search">
        <span class="search-name">新蜂商城</span>
        <router-link to="./search" href="#" class="search-title"
          >山河无恙，人间皆安</router-link
        >
      </div>
      <router-link to="./user" href="#" class="header-user">
        <i class="iconfont">&#xe60f;</i>
      </router-link>
    </header>

    <!-- 轮播图 -->
    <Swipe></Swipe>

    <!-- 分类 -->
    <div class="categorylist-box">
      <div
        class="categorylist"
        v-for="item in categoryList"
        :key="item.categoryId"
        @click="toast"
      >
        <img :src="item.imgUrl" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>

    <!-- 商品 -->
    <!-- 新品上线 -->
    <div class="goods">
      <div class="goods-header">新品上线</div>
      <div class="goods-box">
        <a
          class="goods-item"
          v-for="item in newGoods"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <img :src="item.goodsCoverImg" alt="" />
          <div class="goods-bottom">
            <div class="good-title">
              {{ item.goodsIntro }}
            </div>
            <div class="good-price">￥{{ item.sellingPrice }}</div>
          </div>
        </a>
      </div>
    </div>
    <!-- 热门商品 -->
    <div class="goods">
      <div class="goods-header">热门商品</div>
      <div class="goods-box">
        <a
          class="goods-item"
          v-for="item in hotGoods"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <img :src="item.goodsCoverImg" alt="" />
          <div class="goods-bottom">
            <div class="good-title">
              {{ item.goodsName }}
            </div>
            <div class="good-price">￥{{ item.sellingPrice }}</div>
          </div>
        </a>
      </div>
    </div>
    <!-- 最佳推荐 -->
    <div class="goods">
      <div class="goods-header">最佳推荐</div>
      <div class="goods-box">
        <a
          class="goods-item"
          v-for="item in recommendGoods"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <img
            :src="
              item.goodsCoverImg.indexOf('http') >= 0
                ? item.goodsCoverImg
                : `http://backend-api-01.newbee.ltd${item.goodsCoverImg}`
            "
            alt=""
          />
          <div class="goods-bottom">
            <div class="good-title">
              {{ item.goodsName }}
            </div>
            <div class="good-price">￥{{ item.sellingPrice }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getHomeData } from '@/api/Home.js'
import Swipe from '@/components/VantSwipe.vue'
import { Toast } from 'vant'
export default defineComponent({
  components: {
    Swipe
  },
  data() {
    return {
      // 动态切换header的class名
      head: {
        class: 'header'
      },
      bannerList: [],
      // 分类数据
      categoryList: [
        {
          name: '新蜂超市',
          imgUrl:
            'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
          categoryId: 100001
        },
        {
          name: '新蜂服饰',
          imgUrl:
            'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
          categoryId: 100003
        },
        {
          name: '全球购',
          imgUrl:
            'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
          categoryId: 100002
        },
        {
          name: '新蜂生鲜',
          imgUrl:
            'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
          categoryId: 100004
        },
        {
          name: '新蜂到家',
          imgUrl:
            'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
          categoryId: 100005
        },
        {
          name: '充值缴费',
          imgUrl:
            'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
          categoryId: 100006
        },
        {
          name: '9.9元拼',
          imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
          categoryId: 100007
        },
        {
          name: '领劵',
          imgUrl:
            'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
          categoryId: 100008
        },
        {
          name: '省钱',
          imgUrl:
            'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
          categoryId: 100009
        },
        {
          name: '全部',
          imgUrl:
            'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
          categoryId: 100010
        }
      ],
      // 商品数据
      hotGoods: [],
      newGoods: [],
      recommendGoods: []
    }
  },
  mounted() {
    Toast.loading({ message: '加载中...', forbidClick: true })
    getHomeData().then((res) => {
      // Toast({
      //   message: '首页',
      //   position: 'bottom'
      // })
      this.hotGoods = res.data.hotGoodses
      this.newGoods = res.data.newGoodses
      this.recommendGoods = res.data.recommendGoodses
      Toast.clear()
    }),
      this.scroll()
  },
  methods: {
    goToDetail(item) {
      // console.log(item)
      this.$router.push({ path: `good/${item.goodsId}` })
    },
    toast() {
      Toast('敬请期待')
    },
    scroll() {
      window.addEventListener('scroll', () => {
        let scrollTop =
          document.documentElement.scrollTop ||
          document.body.scrollTop
        scrollTop > 100
          ? (this.head.class = 'header-active')
          : (this.head.class = 'header')
      })
    }
  }
})
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

// 头部样式
.header {
  width: 100%;
  height: 50px;
  // background-color: #1baeae;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

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
  width: 100%;
  height: 50px;
  background-color: #1baeae;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

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

// 分类样式
.categorylist-box {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 0.34667rem;

  .categorylist {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 0.96rem;
      height: 0.96rem;
      margin: 0.34667rem auto 0.21333rem auto;
    }
  }
}

// 商品样式
.goods {
  display: flex;
  flex-direction: column;

  .goods-header {
    height: 1.333333rem;
    background-color: #f9f9f9;
    line-height: 1.33333rem;
    text-align: center;
    color: #1baeae;
    font-size: 0.42667rem;
    font-weight: 500;
  }

  .goods-box {
    display: flex;
    flex-wrap: wrap;

    .goods-item {
      display: flex;
      flex-direction: column;
      width: 50%;
      padding: 0.26667rem 0.26667rem;
      border-bottom: 1px solid #e9e9e9;

      img {
        display: block;
        width: 3.2rem;
        margin: 0 auto;
      }

      .goods-bottom {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .good-title {
        font-size: 0.37333rem;
        text-align: center;
      }

      .good-price {
        color: #1baeae;
        text-align: center;
        font-size: 0.37333rem;
      }
    }

    .goods-item:nth-child(2n - 1) {
      border-right: 1px solid #e9e9e9;
    }
  }
}
</style>
