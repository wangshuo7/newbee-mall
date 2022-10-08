<template>
  <div id="bigbox">
    <header>
      <el-icon color="#fff" size="20px" @click="$router.push({ name: 'home' })"
        ><ArrowLeftBold /></el-icon
      ><input type="text" />
    </header>
    <div class="content">
      <div class="left">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item
            v-for="item in catelist"
            :key="item.categoryId"
            @click="selectedType(item.categoryId)"
          >
            <el-icon><icon-menu /></el-icon>
            <span>{{ item.categoryName }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <el-scrollbar height="400px">
        <div class="right">
          <div
            class="thing"
            v-for="item in catelist"
            :key="item.categoryId"
            v-show="flag == item.categoryId"
          >
            <div
              v-for="value in item.secondLevelCategoryVOS"
              :key="value.categoryId"
            >
              <h2>{{ value.categoryName }}</h2>
              <div class="list">
                <div
                  class="every"
                  v-for="newItem in value.thirdLevelCategoryVOS"
                  :key="newItem"
                  @click="toCates(newItem.categoryId)"
                >
                  <div>
                    <el-icon color="#409EFC" class="no-inherit" size="30px">
                      <PriceTag />
                    </el-icon>
                  </div>
                  <div>
                    {{ newItem.categoryName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
      <footer>
        <router-link to="/">首页</router-link>
        <router-link to="/category">分类</router-link>
        <router-link to="/cart">购物车</router-link>
        <router-link to="/user">我的</router-link>
      </footer>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getcategoryList } from '@/api/category'
import { PriceTag, ArrowLeftBold } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    PriceTag,
    ArrowLeftBold
  },
  data() {
    return {
      catelist: [],
      flag: '15'
    }
  },
  methods: {
    //获取商品分类列表
    getcate() {
      getcategoryList().then((res) => {
        console.log(res.data)
        this.catelist = res.data
      })
    },
    //隐藏切换分类
    selectedType(item) {
      console.log(item)
      this.flag = item
    },
    //跳转分类商品页面
    toCates(id) {
      this.$router.push('/cates/' + id)
    }
  },
  mounted() {
    this.getcate()
  }
})
</script>

<style lang="scss" scoped>
#bigbox {
  height: 100%;
  position: relative;
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
  width: 100%;
  display: flex;
  .left {
    width: 200px;
    span {
      font-size: 18px;
    }
  }
  .right {
    width: 100%;
    h2 {
      margin-left: 20px;
    }
  }
}

footer {
  height: 70px;
  width: 100%;
  background-color: rgb(56, 54, 54);
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 22px;
  a {
    color: #fff;
    text-decoration: none;
  }
}
.list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  .every {
    margin: 10px 12px;
    width: 30%;
    height: 100px;
    font-size: 20px;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
