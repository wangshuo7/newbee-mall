<template>
  <div>
    <!-- 头部 -->
    <header v-bind="head">
      <router-link to="./category" href="#" class="header-classify">
        <i class="iconfont">&#xe611;</i>
      </router-link>
      <div class="search">
        <span class="search-name">顽和商城</span>
        <router-link to="./search" href="#" class="search-title"
          >晚星破晓&emsp;未来可期</router-link
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
      // 分类数据
      categoryList: [
        {
          name: '顽和家电',
          imgUrl:
            'https://image3.suning.cn/uimg/cms/img/165710989476671143.png?from=mobile',
          categoryId: 100001
        },
        {
          name: '顽和超市',
          imgUrl:
            'https://image3.suning.cn/uimg/cms/img/161293951076282456.png?from=mobile',
          categoryId: 100003
        },
        {
          name: '全球购',
          imgUrl:
            'https://image3.suning.cn/uimg/cms/img/166001087785136433.png?from=mobile',
          categoryId: 100002
        },
        {
          name: '手机数码',
          imgUrl:
            '	https://image1.suning.cn/uimg/cms/img/161293957567317395.png?from=mobile',
          categoryId: 100004
        },
        {
          name: '家居家装',
          imgUrl:
            '	https://image3.suning.cn/uimg/cms/img/165711026680588659.png?from=mobile',
          categoryId: 100005
        },
        {
          name: '服饰百货',
          imgUrl:
            '	https://image1.suning.cn/uimg/cms/img/165717934177245432.png?from=mobile',
          categoryId: 100006
        },
        {
          name: '9.9元拼',
          imgUrl: 'https://image1.suning.cn/uimg/cms/img/165717927411065855.png?from=mobile',
          categoryId: 100007
        },
        {
          name: '签到有礼',
          imgUrl:
            '	https://image1.suning.cn/uimg/cms/img/161293963977525820.png?from=mobile',
          categoryId: 100008
        },
        {
          name: '领券中心',
          imgUrl:
            '	https://image3.suning.cn/uimg/cms/img/161293965567020138.png?from=mobile',
          categoryId: 100009
        },
        {
          name: '更多频道',
          imgUrl:
            'https://image3.suning.cn/uimg/cms/img/161293968063152286.png?from=mobile',
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
    color: #ff0844;
  }

  .header-classify .iconfont {
    font-size: 20px;
    line-height: 50px;
    color: #ff0844;
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
      color: #ff0844;
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
  background: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
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
    background: #e7bbe5;
    border-radius: 20px;
    margin: 10px 0;
    display: flex;
    align-items: center;

    .search-name {
      color: #e455f4;
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
    color: #e455f4;
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
        color: #eb2222;
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
