<template>
  <div class="bigestbox">
    <header>
      <div class="order">
        <a href="javascript:;" class="return" @click="$router.go(-1)">
          <i class="iconfont">&#xe608;</i>
        </a>
        <div class="headername">
          <p>订单详情</p>
        </div>
        <a href="javascript:;">
          <i class="iconfont">&#xf0141;</i>
        </a>
      </div>
    </header>
    <div class="allbox">
      <div class="statebox">
        <div class="state">
          <label>订单状态：</label>
          <span>{{ detailDate.orderStatusString }}</span>
        </div>
        <div class="identifier">
          <label>订单编号：</label>
          <span>{{ detailDate.orderNo }}</span>
        </div>
        <div class="time">
          <label>下单时间：</label>
          <span>{{ detailDate.createTime }}</span>
        </div>
        <div>
          <button class="btn1" @click="toPay" v-if="flag">去支付</button>
          <button class="btn2" @click="cancle" v-if="flag2">取消订单</button>
        </div>
      </div>
      <div class="middlebox">
        <div class="money">
          <label>商品金额：</label>
          <span>￥{{ detailDate.totalPrice }}</span>
        </div>
        <div class="method">
          <label>配送方式：</label>
          <span>普通快递</span>
        </div>
      </div>
      <div class="commodity">
        <van-card
          v-for="item in detailDate.newBeeMallOrderItemVOS"
          :key="item"
          :num="item.goodsCount"
          :price="item.sellingPrice"
          desc="全场包邮"
          :title="item.goodsName"
          :thumb="
            item.goodsCoverImg.indexOf('http') >= 0
              ? item.goodsCoverImg
              : `http://backend-api-01.newbee.ltd${item.goodsCoverImg}`
          "
        />
      </div>
    </div>
    <van-popup
      v-model:show="show"
      position="bottom"
      round
      :style="{ height: '30%' }"
      @click-overlay="overlay"
    >
      <van-button
        type="primary"
        block
        color="rgba(7,193,96,1)"
        @click="payType1"
        >微信支付</van-button
      >
      <van-button type="primary" block @click="payType2">支付宝支付</van-button>
    </van-popup>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getOrderDetailData,paySuccess,canclePay } from '@/api/order.js'
import { Dialog } from 'vant'
export default defineComponent({
  methods: {
    overlay() {
      this.overlayhide = false
    },
    toPay() {
      this.show = true
    },
    payType1() {
      // console.log(this.detailDate.orderNo) 
      paySuccess({
        payType: 1,
        orderNo: this.detailDate.orderNo
      }).then(() => {
        // console.log(res)
        this.$router.go(0)
      })
    },
    payType2() {
      console.log(this.detailDate.orderNo)
      paySuccess({
        payType: 2,
        orderNo: this.detailDate.orderNo
      }).then(() => {
        // console.log(res)
        this.$router.go(0)
      })
    },
    cancle(){
      Dialog.confirm({
      message:
        '确认取消订单?',
      confirmButtonColor:'red',
      })
        .then(() => {
          let orderNo = this.$route.params.id
          canclePay(orderNo).then(()=>{
            // console.log(res)
            this.flag2=false
            this.$router.go(0)
          })
        })
        .catch(() => {

        });
    },
  },
  data() {
    return {
      overlayhide: null,
      flag: null, // 判断支付按钮的显示与隐藏
      flag2:null,
      detailDate: [], // 详情页数据
      show: false
    }
  },
  created() {
    // console.log(this.$route.params.id)
    let orderNo = this.$route.params.id

    getOrderDetailData(orderNo).then((res) => {
      // console.log(res.data)
      this.detailDate = res.data
      if (res.data.orderStatus === 0) {
        this.flag = true
        this.flag2 = true
      } else if(res.data.orderStatus === 1){
        this.flag = false
        this.flag2 = true
      } else {
        this.flag = false
        this.flag2 = false
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.bigestbox {
  background: #f7f7f7;
  height: 100%;
}
a {
  text-decoration: none;
  color: #000;
}
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
}
header .order {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 43px;
  width: 100%;
  padding: 0 10px;
  font-size: 14px;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdcdc;
  background: #fff;
}
.allbox {
  margin-top: 44px;
  .statebox {
    padding: 20px;
    font-size: 14px;
    background: #fff;
    label {
      color: #999;
    }
    .state {
      margin-bottom: 10px;
    }
    .identifier {
      margin-bottom: 10px;
    }
    .time {
      margin-bottom: 10px;
    }
    span {
      color: #2c3e50;
    }
    .btn1 {
      width: 100%;
      height: 42px;
      background: rgb(27, 174, 174);
      border-radius: 3px;
      border: none;
      margin-bottom: 10px;
    }
    .btn2 {
      width: 100%;
      height: 42px;
      background: #fff;
      border-radius: 3px;
      border: 1px solid #ebedf0;
    }
  }
  .middlebox {
    margin: 20px 0;
    padding: 20px;
    font-size: 14px;
    background: #fff;
    label {
      color: #999;
    }
    span {
      color: #2c3e50;
    }
    .money {
      margin-bottom: 10px;
    }
    .method {
      margin-bottom: 10px;
    }
  }
  // .van-card {
  //   background: #fff;
  // }
  :deep(.van-card) {
    margin-top: 0;
    background: #fff;
    .van-card__content {
      justify-content: center;
    }
  }
}
:deep(.van-popup) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
  .van-button {
    margin-bottom: 15px;
    border-radius: 10px;
  }
}
</style>
