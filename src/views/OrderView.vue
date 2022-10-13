<template>
  <header>
    <div class="order">
      <a href="javascript:;" class="return" @click="$router.replace('/user')">
        <i class="iconfont">&#xe608;</i>
      </a>
      <div class="headername">
        <p>我的订单</p>
      </div>
      <a href="#">
        <i class="iconfont">&#xf0141;</i>
      </a>
    </div>
    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <van-tabs
          v-model:active="active"
          color="rgb(27, 174, 174)"
          title-active-color="rgb(27, 174, 174)"
          @change="getListData"
          v-model="status"
        >
          <!-- <van-tab
            v-for="(item, index) in navList"
            :title="item"
            :key="index"
            @click="clickme(index)"
          >
          </van-tab> -->
          <van-tab title="全部" name=""></van-tab>
          <van-tab title="待付款" name="0"></van-tab>
          <van-tab title="待确认" name="1"></van-tab>
          <van-tab title="待发货" name="2"></van-tab>
          <van-tab title="已发货" name="3"></van-tab>
          <van-tab title="交易完成" name="4"></van-tab>
        </van-tabs>
      </div>
    </el-scrollbar>
  </header>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    loading-text="加载中..."
    @refresh="onRefresh"
    success-duration="300"
  >
    <div class="allPaid">
      <div class="toPaid" v-for="item in ordersList.list" :key="item">
        <div class="matter">
          <div class="time">订单时间: {{ item.createTime }}</div>
          <div>{{ item.orderStatusString }}</div>
        </div>
        <div
          class="commodity"
          v-for="term in item.newBeeMallOrderItemVOS"
          :key="term"
        >
          <van-card
            @click="watchDetail(item)"
            :num="term.goodsCount"
            :price="term.sellingPrice"
            desc="全场包邮"
            :title="term.goodsName"
            :thumb="
              term.goodsCoverImg.indexOf('http') >= 0
                ? term.goodsCoverImg
                : `http://backend-api-01.newbee.ltd${term.goodsCoverImg}`
            "
          />
        </div>
      </div>

      <div class="foot">没有更多了</div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { defineComponent } from 'vue'
import { getOrderData } from '@/api/order.js'
export default defineComponent({
  methods: {
    /**
     * 查看详情页
     * 动态路由跳转
     */
    watchDetail(item) {
      console.log(item)
      this.$router.push('/order-detail/' + item.orderNo)
    },
    getListData(name) {
      console.log(name)
      getOrderData({
        pageNumber: 1,
        status: name
      }).then((res) => {
        console.log(res.data)
        this.ordersList = res.data
      })
    },
    onRefresh() {
      this.isLoading = false
    }
  },
  data() {
    return {
      status: '',
      isLoading: true,
      // navList: ['全部', '待付款', '待确认', '待发货', '已发货', '交易完成'],
      ordersList: {}
    }
  }
})
</script>

<style lang="scss" scoped>
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

.allPaid {
  margin-top: 88px;
  background: #f9f9f9;
  .toPaid {
    margin: 20px 10px;
    background: #fff;
  }
  .commodity {
    background: #fff;
  }
}
// .allPaid {
//   height: 100%;
// }
.matter {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 0;
  color: #2c3e50;
}
:deep(.van-card) {
  margin-top: 0;
  background: #fff;
  .van-card__content {
    justify-content: center;
  }
}
.van-card__header {
  .van-card__content {
    justify-content: center;
  }
}
.foot {
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  color: #969799;
}
</style>
