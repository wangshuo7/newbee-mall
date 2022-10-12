<template>
  <!-- <van-notice-bar left-icon="volume-o" :text="detail.goodsIntro" /> -->
  <div class="good-detail">
    <van-nav-bar
      title="商品详情"
      @click-left="onClickLeft"
    >
      <template #left>
        <i class="iconfont">&#xe608;</i>
      </template>
    </van-nav-bar>
    <div class="detail-content">
      <div class="imagepreview">
        <img
          :src="
            !!detail.goodsCoverImg &&
            (detail.goodsCoverImg.indexOf('http') >= 0
              ? detail.goodsCoverImg
              : `http://backend-api-01.newbee.ltd/${detail.goodsCoverImg}`)
          "
          alt=""
        />
      </div>

      <div class="good-info">
        <div class="good-title">
          {{ detail.goodsName }}
        </div>
        <div class="good-desc">免邮费 顺丰快递</div>
        <div class="good-price">
          <span
            ><s>原价¥{{ detail.originalPrice }}</s></span
          >
          <span>现价¥{{ detail.sellingPrice }}</span>
        </div>
      </div>

      <div class="good-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="good-content" v-html="detail.goodsDetailContent"></div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" dot />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        @click="goTo()"
        :badge="!iconNum ? '' : iconNum"
      />
      <!-- <van-action-bar-icon icon="cart-o" text="购物车" @click="goTo()" /> -->
      <van-action-bar-button
        color="linear-gradient(250deg, #ff0844 0%, #ffb199 100%)"
        type="warning"
        @click="handleAddCart"
        text="加入购物车"
      />
      <van-action-bar-button
        color="linear-gradient(250deg, #ff0844 0%, #ffb199 100%)"
        type="danger"
        @click="goToCart"
        text="立即购买"
      />
    </van-action-bar>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getDetail } from '@/api/good.js'
import { addCart, getShopCart } from '@/api/cart.js'
import { mapState, mapMutations } from 'vuex'
import { Toast } from 'vant'

export default defineComponent({
  data() {
    return {
      //   count: null,
      detail: []
    }
  },

  computed: {
    ...mapState(['iconNum'])
  },
  created() {
    getDetail(this.$route.params.id).then((res) => {
      this.detail = res.data
      console.log(this.detail)
    })
  },
  mounted() {
    this.getCartList()
  },
  methods: {
    ...mapMutations(['changeIconNum']),
    // 去购物车

    getCartList() {
      getShopCart().then((res) => {
        // console.log(res)
        // console.log(res.data.length)
        // this.$store.count = res.data.length
        // console.log(this.$store.count)
        //   this.count = res.data.length
        this.changeIconNum(res.data.length)
      })
    },
    goToCart() {
      addCart({ goodsCount: 1, goodsId: this.detail.goodsId }).then((res) => {
        console.log(res)
        if (res.resultCode == 500) {
          Toast.success('已经添加到购物车')
        }
      })
      this.$router.push({ path: '/cart' })
    },
    // 添加购物车
    handleAddCart() {
      addCart({ goodsCount: 1, goodsId: this.detail.goodsId }).then((res) => {
        // console.log(res)
        if (res.resultCode == 200) {
          Toast.success('添加成功')
          // this.count++
          this.getCartList()
        }
      })
    },
    goTo() {
      this.$router.push({ path: '/cart' })
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
})
</script>

<style lang="scss" scoped>
.good-detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .van-nav-bar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }

  .detail-content {
    width: 94%;
    margin-top: 50px;
    align-self: center;

    .imagepreview {
      img {
        width: 100%;
        height: auto;
      }
    }

    .good-info {
      .good-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }

      .good-desc {
        padding: 10px 0;
        font-size: 14px;
        text-align: left;
        color: rgb(144, 135, 135);
      }

      .good-price {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        // padding: 0 10px;

        span:nth-child(1) {
          color: #999;
          font-size: 16px;
        }

        span:nth-child(2) {
          color: #f63515;
          font-size: 22px;
        }
      }
    }

    .good-intro {
      width: 100%;

      ul {
        width: 100%;
        margin: 10px 0 0 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;

          &:last-child {
            border-right: none;
          }
        }
      }

      .good-content {
        img {
          width: 100%;
        }
      }
    }
  }

  .van-action-bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
  }
}
</style>
