<template>
  <div>
    <header>
      <el-icon
        color="#fff"
        size="20px"
        @click="$router.push({ name: 'category' })"
        ><ArrowLeftBold /></el-icon
      ><input type="text" />
    </header>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="1" @click="qiehuan">推荐</el-menu-item>
      <el-menu-item index="3" @click="qiehuan2">新品</el-menu-item>
      <el-menu-item index="4">价格</el-menu-item>
    </el-menu>
    <div
      class="content"
      v-for="item in hotGoodses"
      :key="item.goodsId"
      @click="getdatail(item.goodsId)"
    >
      <div class="pic">
        <img :src="item.goodsCoverImg" alt="" />
      </div>
      <div class="pro">
        <p class="one">{{ item.goodsName }}</p>
        <p class="two">{{ item.goodsIntro }}</p>
        <p class="three">￥{{ item.sellingPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getindex, getcategorys } from '@/api/category'
import { ArrowLeftBold } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    ArrowLeftBold
  },
  data() {
    return {
      hotGoodses: [],
      flag: true
    }
  },
  methods: {
    getcatecon() {
      //首页数据
      getindex().then((res) => {
        console.log(res.data)
        this.hotGoodses = this.flag ? res.data.hotGoodses : res.data.newGoodses
      })
    },
    //商品详情
    getdatail(id) {
      getcategorys(id).then((res) => {
        console.log(res, '1111111')
      })
    },
    qiehuan() {
      this.flag = true
      this.getcatecon()
    },
    qiehuan2() {
      this.flag = false
      this.getcatecon()
    }
  },
  created() {
    this.getcatecon()
  }
})
</script>

<style lang="scss" scoped>
.el-menu--horizontal {
  justify-content: space-around;
}
.el-menu--horizontal > .el-menu-item {
  font-size: 20px;
}
header {
  padding-left: 15px;
  height: 70px;
  background-color: rgb(56, 54, 54);
  input {
    width: 700px;
    margin-left: 200px;
    margin-top: 20px;
    padding: 8px;
    border-radius: 18px;
    border: none;
  }
}
.content {
  display: flex;
  img {
    margin-left: 30px;
    width: 260px;
    height: 250px;
  }
  .pro {
    margin-left: 300px;
    .one {
      font-size: 22px;
      font-weight: 800;
    }
    .two {
      font-size: 22px;
      font-weight: 500;
      color: #666;
    }
    .three {
      color: rgb(47, 83, 201);
      font-size: 22px;
      font-weight: 800;
    }
  }
}
</style>
