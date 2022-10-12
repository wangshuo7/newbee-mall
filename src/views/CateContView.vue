<template>
  <div id="box">
    <header>
      <el-icon color="#fff" size="20px" @click="$router.go(-1)"
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
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
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
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getindex } from '@/api/category'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { Toast } from 'vant'

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
        // console.log(res.data)
        this.hotGoodses = this.flag ? res.data.hotGoodses : res.data.newGoodses
        console.clear()
        Toast.clear()
      })
    },
    //商品详情
    getdatail(id) {
      this.$router.push('/good/' + id)
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
  mounted() {
    Toast.loading({ message: '加载中...', forbidClick: true })
    this.getcatecon()
  }
})
</script>

<style lang="scss" scoped>
#box {
  position: relative;
}
.el-menu {
  background: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
}
.el-menu--horizontal {
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 50px;
  width: 100%;
}
.el-menu-demo {
  height: 50px;
}
.el-menu-item {
  border-radius: 35px;
  height: 30px;
}
// .is-active {
//   border: 0;
// }
.el-menu-item:not(.is-disabled):hover {
  background-color: rgb(254, 166, 227);
  border: 1px solid orange;
}

.el-menu--horizontal > .el-menu-item {
  font-size: 20px;
}
#all {
  padding: 90px 0 50px 0;
}
header {
  padding-left: 15px;
  height: 50px;
  background: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
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
