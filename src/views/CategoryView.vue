<template>
  <div id="bigbox">
    <header>
      <el-icon color="#fff" size="20px" @click="$router.go(-1)"
        ><ArrowLeftBold /></el-icon
      ><input type="text" @focus="$router.push({ name: 'search' })" />
    </header>
    <div class="content">
      <div class="left">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item
            v-for="item in catelist"
            :key="item.categoryId"
            @click="selectedType(item.categoryId)"
          >
            {{ item.categoryName }}
            <!-- <span>{{ item.categoryName }}</span> -->
          </el-menu-item>
        </el-menu>
      </div>
      <el-scrollbar height="500px">
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
                  <div style="min-width: 30px">
                    {{ newItem.categoryName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getcategoryList } from '@/api/category'
import { PriceTag, ArrowLeftBold } from '@element-plus/icons-vue'
import { Toast } from 'vant'

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
        // console.log(res.data)
        this.catelist = res.data
        Toast.clear()
      })
    },
    //隐藏切换分类
    selectedType(item) {
      // console.log(item)
      this.flag = item
    },
    //跳转分类商品页面
    toCates(id) {
      this.$router.push('/cates/' + id)
    }
  },
  mounted() {
    Toast.loading({ message: '加载中...', forbidClick: true })
    this.getcate()
  }
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  width: 110px;
}
#bigbox {
  height: 100%;
  position: relative;
}
header {
  padding-left: 15px;
  height: 60px;
  background-color: #1baeae;
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 10;
  input {
    margin: 15px;
    padding: 7px;
    width: 250px;
    border-radius: 17px;
    border: none;
  }
}
:deep(.el-menu-item) {
  padding: 8px !important;
  color: #000;
}
.content {
  width: 100%;
  display: flex;
  .left {
    width: 110px;
    margin-top: 60px;
  }
  .right {
    width: 100%;
    margin-top: 80px;
    h2 {
      margin-left: 20px;
    }
  }
}

// footer {
//   height: 70px;
//   width: 100%;
//   background-color: rgb(56, 54, 54);
//   position: fixed;
//   bottom: 0px;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   font-size: 22px;
//   a {
//     color: #fff;
//     text-decoration: none;
//   }
// }
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 18px;
  .every {
    width: 30%;
    height: 100px;
    font-size: 14px;

    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
