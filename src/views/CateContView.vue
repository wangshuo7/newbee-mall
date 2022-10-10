<template>
  <div id="box">
    <header>
      <el-icon
        color="#fff"
        size="20px"
        @click="$router.push({ name: 'category' })"
        ><ArrowLeftBold /></el-icon
      ><input
        type="text"
        v-model="keyword"
        @focus="$router.push({ name: 'search' })"
      />
    </header>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#1baeae"
      text-color="#fff"
      active-text-color="rgb(32 118 198);"
    >
      <el-menu-item index="1" @click="qiehuan">推荐</el-menu-item>
      <el-menu-item index="3" @click="qiehuan2">新品</el-menu-item>
      <el-menu-item index="4">价格</el-menu-item>
    </el-menu>
    <div id="all">
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
    <BottomNav></BottomNav>
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
      flag: true,
      keyword: ''
    }
  },
  methods: {
    // //搜索
    // find() {
    //   console.log(this.keyword)
    //   tosearch({ keyword: this.keyword, orderBy: '', pageNumber: 1 }).then(
    //     (res) => {
    //       console.log(res)
    //     }
    //   )
    // },

    getcatecon() {
      //首页数据
      getindex().then((res) => {
        console.log(res.data)
        this.hotGoodses = this.flag ? res.data.hotGoodses : res.data.newGoodses
        console.clear()
      })
    },
    //商品详情
    getdatail(id) {
      getcategorys(id).then(() => {
        this.$router.push('/details/' + id)
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
#box {
  position: relative;
}
.el-menu--horizontal {
  justify-content: space-around;
  position: fixed;
  top: 60px;
  width: 100%;
}
.el-menu-item {
  border-radius: 35px;
}

.el-menu--horizontal > .el-menu-item {
  font-size: 20px;
}
#all {
  padding: 130px 0 50px 0;
}
header {
  padding-left: 15px;
  height: 60px;
  background-color: #1baeae;
  position: fixed;
  display: flex;
  align-items: center;

  width: 100%;
  input {
    margin: 15px;
    padding: 7px;
    width: 250px;
    border-radius: 17px;
    border: none;
  }
}
.content {
  display: flex;
  margin: 22px;
  border-bottom: 1px solid #ccc;

  img {
    width: 110px;
  }
  .pro {
    margin-left: 30px;
    .one {
      font-size: 14px;
      font-weight: 800;
    }
    .two {
      font-size: 14px;
      font-weight: 500;
      color: #666;
    }
    .three {
      color: rgb(47, 83, 201);
      font-size: 14px;
      font-weight: 800;
    }
  }
}
</style>
