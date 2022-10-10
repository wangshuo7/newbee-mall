<template>
  <div class="cart-container">
    <!-- 头部导航 -->
    <header>
      <i class="iconfont" @click="toBack">&#xe608;</i>
      <h3>生成订单</h3>
      <i class="iconfont">&#xf0141;</i>
    </header>
    <!-- 地址信息栏 -->
    <div class="address">
      <div>
        <p>{{ userInfo.userName }} {{ userInfo.userPhone }}</p>
        <p>
          {{ userInfo.provinceName }} {{ userInfo.cityName }}
          {{ userInfo.regionName }} {{ userInfo.detailAddress }}
        </p>
      </div>
      <van-icon name="arrow" size="20" />
    </div>
    <!-- list -->
    <div class="list">
      <div class="list-item" v-for="item in ordersList" :key="item">
        <van-card
          :num="item.goodsCount"
          :price="item.sellingPrice"
          :title="item.goodsName"
          :thumb="
            item.goodsCoverImg.indexOf(
              'newbee-mall.oss-cn-beijing.aliyuncs.com'
            ) != -1
              ? item.goodsCoverImg
              : 'http://backend-api-01.newbee.ltd' + item.goodsCoverImg
          "
        />
      </div>
      <div class="kong" v-if="flag"></div>
    </div>
    <!-- 结算 -->
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>￥{{ ordersPrice }}</span>
      </div>
      <van-button
        @click="showPopup"
        class="pay-btn"
        color="#1baeae"
        type="primary"
        >生成订单</van-button
      >
    </div>
    <div>
      <van-popup
        v-model:show="show"
        position="bottom"
        round
        :style="{ height: '30%' }"
      >
        <van-button type="primary" block color="rgba(7,193,96,1)"
          >微信支付</van-button
        >
        <van-button type="primary" block>支付宝支付</van-button>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getShopCartOrders, getAddressDefault } from '@/api/cart'

export default defineComponent({
  mounted() {
    let topScroll = document.documentElement.scrollTop
    console.log(topScroll)
    if (topScroll !== 0) {
      this.flag = true
    }
  },
  computed: {
    ordersPrice() {
      let sum = 0
      this.ordersList.forEach((item) => {
        sum += item.goodsCount * item.sellingPrice
      })
      return sum
    }
  },
  methods: {
    showPopup() {
      this.show = true
      // console.log(this.show)
    },
    toBack() {
      this.$router.go(-1)
    }
  },
  data() {
    return {
      flag: false, // 空元素得到显示隐藏
      show: false,
      ordersList: [], // 产品列表
      userInfo: [] // 收件人信息
    }
  },
  created() {
    getShopCartOrders({
      cartItemIds: this.$route.query.cartItemIds
    }).then((res) => {
      console.log(res)
      this.ordersList = res.data
    }),
      getAddressDefault().then((res) => {
        this.userInfo = res.data
      })
  }
})
</script>

<style lang="scss" scoped>
:deep(.van-popup) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  .van-button {
    margin-bottom: 15px;
    border-radius: 10px;
  }
}
.cart-container {
  width: 100%;
  height: 100%;
  background: rgb(249, 249, 249);
  // 头部
  header {
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    justify-content: space-between;
    align-content: center;
    height: 44px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    z-index: 10000;
    .iconfont {
      padding: 0 3%;
      line-height: 44px;
    }

    h3 {
      font-size: 14px;
      font-weight: 500;
    }
  }
}
// 地址信息栏
.address {
  position: relative;
  top: 44px;
  width: 100%;
  height: 96px;
  background-color: rgb(249, 249, 249);
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-bottom: 3px dashed skyblue;
}
.list {
  position: relative;
  top: 66px;
  min-height: 40px;
  background: #fff;
  .list-item {
    height: 120px;
    margin-bottom: 15px;
    .van-card {
      background: #fff;
    }
  }
}
::v-deep .van-card__header {
  height: 100px;
}
::v-deep .van-image__img {
  height: 100px;
}
::v-deep .van-card__price-integer {
  color: red;
}
::v-deep .van-card__content {
  height: 88px;
}
.kong {
  width: 100%;
  height: 100px;
}
// 结算
.pay-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 10px 0;
  padding-bottom: 50px;
  border-top: 1px solid #e9e9e9;
  > div {
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    margin: 10px 0;
    font-size: 14px;
    span:nth-child(2) {
      color: red;
      font-size: 18px;
    }
  }
  .pay-btn {
    position: fixed;
    bottom: 7px;
    right: 0;
    left: 0;
    width: 90%;
    margin: 0 auto;
  }
}
</style>
