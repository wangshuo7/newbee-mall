<template>
  <div class="out">
    <!-- Header -->
    <Header>
      <template v-slot:input>
        <div class="header-middle">
          <i class="iconfont">&#xe651;</i>
          <input class="search-input" type="" v-model="keyword" />
        </div>
      </template>
      <template v-slot:btn>
        <div class="header-right" @click="toSearch">搜索</div>
      </template>
    </Header>
    <!-- main -->
    <van-tabs v-model:active="active" type="card" color="rgb(27,174,174)">
      <van-tab title="推荐" name="">1</van-tab>
      <van-tab title="新品" name="new">2</van-tab>
      <van-tab title="价格" name="price">3</van-tab>
    </van-tabs>
    <!-- 空 -->
    <div class="temp" v-if="flag">
      <img src="https://s.yezgea02.com/1604041313083/kesrtd.png" alt="" />
      <div class="word">搜索想要的商品</div>
    </div>
    <!-- 产品列表 -->
    <ul class="product-list" v-else>
      <li
        class="product-item"
        v-for="(item, index) in productList"
        :key="index"
        @click="productDetail(item)"
      >
        <img
          :src="'http://backend-api-01.newbee.ltd' + item.goodsCoverImg"
          alt=""
        />
        <div class="product-info">
          <p class="product-name">{{ item.goodsName }}</p>
          <p class="product-subtitle">{{ item.goodsIntro }}</p>
          <span class="product-price">￥{{ item.sellingPrice }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getSearchData } from '@/api/Home.js'
import Header from '@/components/Header.vue'
export default defineComponent({
  data() {
    return {
      lock: false,
      flag: true,
      keyword: '',
      goodsCategoryId: '',
      orderBy: '',
      pageNumber: 1,
      list: [],
      productList: []
    }
  },
  component: {
    Header
  },
  methods: {
    toSearch() {
      this.clear()
      this.search()
    },
    clear() {
      this.productList = []
      document.documentElement.scrollTop = 0
    },
    search() {
      this.flag = false
      // this.lock = true
      getSearchData({
        keyword: this.keyword,
        goodsCategoryId: this.goodsCategoryId,
        orderBy: this.orderBy,
        pageNumber: this.pageNumber
      }).then((res) => {
        this.productList = this.productList.concat(res.data.list)
        this.lock = true
      })
    },
    productDetail(item) {
      this.$router.push({ path: `product/${item.goodsId}` })
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      let scroll = document.documentElement.scrollTop
      if (
        this.lock &&
        scroll > document.querySelector('.out').clientHeight - 667
      ) {
        this.pageNumber++
        this.search()
        this.lock = false
        console.log(this.pageNumber)
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.header-middle {
  height: 25px;
  width: 76%;
  background-color: #f7f7f7;
  border-radius: 20px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  .iconfont {
    margin-right: 10px;
  }
  .search-input {
    width: 170px;
    font-size: 16px;
    border: 0;
    background-color: #f7f7f7;
  }
}
.header-right {
  width: 35px;
  height: 28px;
  border-radius: 5px;
  background: #1baeae;
  color: #fff;
  font-size: 13px;
  line-height: 28px;
  padding: 0 2px;
  text-align: center;
}
.temp {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  .word {
    color: #969799;
    font-size: 14px;
    margin-top: 40px;
  }
  img {
    width: 150px;
    height: 150px;
  }
}
.product-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  padding: 10px 0;
  border-bottom: 0.02667rem solid #dcdcdc;
  img {
    width: 140px;
    height: 120px;
    padding: 0 10px;
  }
  .product-info {
    width: 56%;
    height: 110px;
    padding: 5px;
    text-align: left;
    .product-name {
      width: 100%;
      max-height: 40px;
      line-height: 20px;
      font-size: 15px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .product-subtitle {
      width: 100%;
      max-height: 20px;
      padding: 5px 0;
      font-size: 13px;
      color: #999;
      overflow: hidden;
    }
    .product-price {
      color: #1baeae;
      font-size: 16px;
    }
  }
}
</style>
