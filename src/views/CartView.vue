<template>
  <div class="cart-container">
    <!-- 头部导航 -->
    <header>
      <el-icon size="16px" color="#373737">
        <ArrowLeftBold />
      </el-icon>
      <h3>购物车</h3>
      <el-icon size="16px" color="#373737">
        <MoreFilled />
      </el-icon>
    </header>

    <!-- content -->
    <div class="cart-content">
      <!-- <div v-for="item in cartData"> -->
      <div>
        <div class="radiobtn">
          <input type="radio" />
        </div>
        <div class="goods-img">
          <a href="">
            <img src="" alt="" />
          </a>
        </div>
        <div class="goods-detail">
          <div class="goods-title">
            <span></span>
            <span></span>
          </div>
          <div class="goods-btn">
            <div class="price"></div>
            <div class="goods-num"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ArrowLeftBold, MoreFilled } from '@element-plus/icons-vue'
export default defineComponent({
  components: {
    ArrowLeftBold,
    MoreFilled
  }
})
</script>

<style lang="scss" scoped>
.cart-container {
  width: 100%;
  height: 100%;
  header {
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    justify-content: space-between;
    align-content: center;
    height: 44px;
    border-bottom: 1px solid #ccc;
    .el-icon {
      display: block;
      margin-top: 15px;
      padding: 0 3%;
    }

    h3 {
      font-size: 14px;
      font-weight: 500;
    }
  }
  .cart-content {
    position: relative;
    top: 50px;
    height: 134px;
    display: flex;
    align-items: center;
    padding-left: 14px;
  }
}
</style>
