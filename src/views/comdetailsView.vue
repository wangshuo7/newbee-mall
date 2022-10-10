<template>
  <div id="all">
    <header>
      <el-icon color="#fff" size="20px" @click="$router.go(-1)"
        ><ArrowLeftBold
      /></el-icon>
      <p class="title">商品详情</p>
    </header>
    <div class="about">
      <img :src="imgurl" alt="" />
      <p class="one">{{ detailsList.goodsName }}</p>
      <p class="two">{{ detailsList.tag }}</p>

      <p class="money">￥{{ detailsList.originalPrice }}</p>
      <p>（商品详情获取中......)</p>
    </div>
    <el-button type="primary" round @click="pushcar">加入购物车</el-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getcategorys, topush } from '@/api/category'
import { ArrowLeftBold } from '@element-plus/icons-vue'
export default defineComponent({
  components: {
    ArrowLeftBold
  },
  data() {
    return {
      detailsList: []
    }
  },
  methods: {
    pushcar() {
      topush({
        goodsCount: 1,
        goodsId: this.detailsList.goodsId
      })
    }
  },
  computed: {
    imgurl() {
      // console.log('222', this.detailsList)
      return (
        //判断地址里是否已携带一部分请求头
        !!this.detailsList.goodsCarouselList &&
        (this.detailsList.goodsCarouselList[0].indexOf(
          'newbee-mall.oss-cn-beijing.aliyuncs.com'
        ) != -1
          ? this.detailsList.goodsCarouselList[0]
          : 'http://backend-api-01.newbee.ltd' +
            this.detailsList.goodsCarouselList[0])
      )
    }
  },

  created() {
    console.log(this.$route)
    getcategorys(this.$route.params.id).then((res) => {
      console.table(res.data)
      this.detailsList = res.data
    })
  }
})
</script>

<style lang="scss" scoped>
#all {
  position: relative;
}
header {
  padding-left: 15px;
  height: 60px;
  background-color: #1baeae;
  position: fixed;
  top: 0px;
  display: flex;
  align-items: center;

  width: 100%;
  .title {
    font-size: 20px;
    color: #fff;
    font-weight: 800;
    padding-left: 100px;
  }
}
.about {
  padding-top: 100px;
  img {
    width: 300px;
    margin-left: 35px;
  }
  .one {
    font-size: 14px;
    font-weight: 800;
  }
  .two {
    font-size: 14px;
    font-weight: 500;
    color: #666;
  }
  .money {
    color: rgb(47, 83, 201);
    font-size: 14px;
    font-weight: 800;
  }
}
</style>
