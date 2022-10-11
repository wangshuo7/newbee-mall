<template>
  <div class="out">
    <header>
      <el-icon
        color="#fff"
        size="20px"
        @click="$router.push({ name: 'category' })"
        ><ArrowLeftBold
      /></el-icon>
      <input
        type="text"
        v-model="keyword"
        ref="inputdata"
        placeholder="请输入搜索内容"
      />
      <button @click="find">搜索</button>
    </header>
    <div class="img" v-show="isshow">
      <img src="../img/search.webp" alt="" />
    </div>
    <div id="all">
      <div
        class="content"
        v-for="item in searchList"
        :key="item.goodsId"
        @click="todetail(item.goodsId)"
      >
        <div class="pic">
          <img
            :src="'http://backend-api-01.newbee.ltd' + item.goodsCoverImg"
            alt=""
          />
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
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { tosearch, getcategorys } from '@/api/category'
export default defineComponent({
  components: {
    ArrowLeftBold
  },
  data() {
    return {
      flag: false,
      searchList: [],
      pagemun: 1,
      isshow: true,
      keyword: ''
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.inputdata.focus()
    })
  },
  methods: {
    //搜索
    find() {
      this.isshow = false
      this.flag = true
      tosearch({
        keyword: this.keyword,
        orderBy: '',
        pageNumber: this.pagemun
      }).then((res) => {
        // console.log(res.data)
        //因为需要多次获取渲染 所以需要push
        this.searchList.push(...res.data.list)
        //数据请求回来后再开锁
        //在进判断
        this.flag = true
      })
    },

    //去详情
    todetail(id) {
      getcategorys(id).then(() => {
        this.$router.push('/details/' + id)
      })
    }
  },
  //懒加载
  //当页面滚动值大于元素高度并且开锁 页码加一 发请求 再关锁
  mounted() {
    window.addEventListener('scroll', () => {
      let scroll = document.documentElement.scrollTop
      //再进判断，滚动值一开始小于（元素高度减去视图高度），当大于就请求，请求回来后，元素又被数据顶高了
      //所以滚动值又小了，当再次大于的时候，发请求 关锁
      if (
        this.flag &&
        scroll > document.querySelector('.out').clientHeight - 667
      ) {
        this.pagemun++
        this.find()
        this.flag = false
      }
    })
  },
  unmounted() {
    this.flag = false
  }
})
</script>

<style lang="scss" scoped>
header {
  padding-left: 15px;
  height: 60px;
  background-color: #1baeae;
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  width: 100%;
  input {
    margin: 15px;
    padding: 7px;
    width: 250px;
    border-radius: 17px;
    border: none;
  }
}
#all {
  margin-top: 80px;
}
.img {
  img {
    margin-top: 100px;
    width: 100%;
    height: 200px;
  }
}
.content {
  display: flex;
  margin: 22px;
  border-bottom: 1px solid #ccc;

  img {
    width: 140px;
    height: 120px;
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
button {
  color: #1baeae;
  border-radius: 0.36667rem;
  width: 50px;
  border: none;
  padding: 5px;
  font-size: 14px;
}
</style>
