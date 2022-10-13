<template>
  <div class="cart-container">
    <!-- 头部导航 -->
    <header>
      <i class="iconfont" @click="toHome">&#xe608;</i>
      <h3>购物车</h3>
      <i class="iconfont">&#xf0141;</i>
    </header>
    <!-- list -->
    <div class="goods-list" v-if="listData?.length !== 0">
      <!-- 复选框 -->
      <van-checkbox-group v-model="checked" @change="handelGroupAll">
        <van-swipe-cell
          style="width: 100%"
          v-for="item in listData"
          :key="item"
        >
          <van-checkbox :name="item.cartItemId" checked-color="#ff0844">
            <div class="box-content">
              <div class="goods-img">
                <img
                  :src="
                    item.goodsCoverImg.indexOf(
                      'newbee-mall.oss-cn-beijing.aliyuncs.com'
                    ) != -1
                      ? item.goodsCoverImg
                      : 'http://backend-api-01.newbee.ltd' + item.goodsCoverImg
                  "
                  alt=""
                />
              </div>
              <div class="content-text">
                <div class="goods-title">
                  <span>{{ item.goodsName }}</span>
                  <span class="num">x{{ item.goodsCount }}</span>
                </div>
                <div class="goods-btn">
                  <div class="price">
                    ￥{{ item.sellingPrice * item.goodsCount }}
                  </div>
                  <van-stepper
                    v-model="item.goodsCount"
                    disable-input
                    :min="1"
                    input-width="35px"
                    button-size="28px"
                    theme="15px"
                    @click.stop="changeNum(item.goodsCount, item.cartItemId)"
                  />
                </div>
              </div>
            </div>
          </van-checkbox>
          <template #right>
            <van-button
              square
              icon="delete"
              type="danger"
              class="delete-button"
              stop-propagation
              @click="deleteItem(item.cartItemId)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <!-- 结算 -->
    <div class="settlement" v-if="listData?.length !== 0">
      <van-checkbox
        v-model="checkedValue"
        @click="checkAll"
        checked-color="#ff0844"
        >全选</van-checkbox
      >
      <van-submit-bar
        :price="totalPrice * 100"
        button-color="linear-gradient(to right, #ff0844 0%, #ffb199 100%)"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
    <!-- 没有商品 -->
    <div class="listnull" v-else>
      <van-icon name="smile-o" />
      <div>购物车空空如也</div>
      <van-button
        color="linear-gradient(to right, #ff0844 0%, #ff3199 100%)"
        type="primary"
        @click="toHome"
        block
        >前往首页</van-button
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getShopCart, putShopCart, deleteShopCart } from '@/api/cart'
import { Toast } from 'vant'
import { mapState, mapMutations } from 'vuex'
export default defineComponent({
  data() {
    return {
      value: 1,
      checked: [], // 选择购买
      listData: [], // 商品列表
      checkedValue: false // 全选标识
    }
  },
  computed: {
    ...mapState(['iconNum']),
    totalPrice() {
      let sum = 0
      let arr = this.listData?.filter((item) => {
        return this.checked.find((prop) => {
          return prop === item.cartItemId
        })
      })
      arr?.forEach((item) => {
        sum += item.goodsCount * item.sellingPrice
      })
      return sum
    }
  },
  mounted() {
    Toast.loading({ message: '加载中...', forbidClick: true })
    this.getShopCartFunc()
    this.changeCartIconColor('f5576c')
  },
  beforeUnmount() {
    this.changeCartIconColor('000')
  },
  methods: {
    ...mapMutations(['changeIconNum', 'changeCartIconColor']),
    onSubmit() {
      let cartItemIds = ''
      // console.log(JSON.stringify(this.checked))
      this.checked.forEach((item) => {
        cartItemIds += item + ','
      })
      cartItemIds = cartItemIds.substring(0, cartItemIds?.length - 1)
      // console.log(cartItemIds)
      if (this.checked?.length !== 0) {
        this.$router.push('/orders?cartItemIds=' + cartItemIds)
      } else {
        Toast('请选择商品')
      }
    },
    toHome() {
      this.$router.push('/')
    },
    deleteItem(cartItemId) {
      deleteShopCart(cartItemId).then((res) => {
        if (res.resultCode === 200) {
          this.getShopCartFunc()
        } else {
          Toast(res.message)
        }
      })
    },

    /**
     * checkboxGroup全选判断
     * @param {*} value 被选中的值
     */
    handelGroupAll(value) {
      // 判断此时数据是否满足全选条件
      if (!!value.length && value.length === this.listData.length) {
        this.checkedValue = true
      } else {
        this.checkedValue = false
      }
    },
    /**
     * 点击全选
     */
    checkAll() {
      // 判断点击的是全选还是取消全选
      if (this.checkedValue) {
        this.checked = []
        this.listData.forEach((item) => {
          this.checked.push(item.cartItemId)
        })
      } else {
        this.checked = []
      }
    },
    /**
     * 购物车修改数量
     * @param {*} goodsCount 商品数量
     * @param {*} cartItemId 商品的itemId
     */
    async changeNum(goodsCount, cartItemId) {
      let sub_data = {
        goodsCount: Number(goodsCount),
        cartItemId
      }
      let res = await putShopCart(sub_data)
      if (res.resultCode !== 200) {
        Toast(res.message)
      }
      this.getShopCartFunc()
    },
    /**
     * 请求购物车商品列表
     */
    getShopCartFunc() {
      getShopCart().then((res) => {
        this.listData = res.data
        this.changeIconNum(res.data?.length)
        Toast.clear()
        // console.log(res)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.cart-container {
  width: 100%;
  height: 100%;
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

.goods-list {
  position: relative;
  top: 60px;
  min-height: 40px;
  width: 100%;
  padding-bottom: 100px;

  .van-checkbox {
    padding-left: 14px;
    .box-content {
      display: flex;
      width: 100%;
      .goods-img {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content-text {
        box-sizing: border-box;
        padding: 20px;
        width: 240px;
        .goods-title {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #2c3e50;
          .num {
            margin-left: 10px;
          }
        }
        .goods-btn {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          .price {
            font-size: 16px;
            color: red;
          }
        }
      }
    }
  }
}

.delete-button {
  height: 100%;
}

// 结算
.settlement {
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 50px;
  padding: 14px;
  background-color: #fff;
  // border-top: 1px solid rgb(27, 174, 174);
}
:deep(.van-submit-bar__bar) {
  position: fixed;
  bottom: 52px;
  right: 14px;
}
.listnull {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  padding-top: 200px;
  div {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .van-icon-smile-o {
    font-size: 50px;
  }
  .title {
    font-size: 16px;
    margin-bottom: 20px;
  }
}
</style>
