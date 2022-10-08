<template>
  <div class="user-box">
    <!-- 导航 -->
    <header class="simple-header">
      <van-icon name="arrow-left" @click="goBack" />
      <div class="simple-header-name">{{ name }}</div>
      <van-icon name="weapp-nav" />
    </header>
    <div class="user-info">
      <div class="info">
        <img src="@/assets/WechatIMG23.jpeg" />
        <div class="user-desc">
          <span>昵称：{{ users.nickName }}</span>
          <span>登录名：{{ users.loginName }}</span>
          <span class="name">个性签名：{{ users.introduceSign }}</span>
        </div>
      </div>
    </div>
    <ul class="user-list">
      <li @click="goTo('order')">
        <span>我的订单</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('address?from=mine')">
        <span>地址管理</span>
        <van-icon name="arrow" />
      </li>
    </ul>
    <div class="button">
      <van-button
        round
        block
        type="info"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="dialog"
        >退出登录</van-button
      >
    </div>
    <!-- nav -->
    <div class="nav-bar">
      <ul class="nav-list">
        <router-link class="nav-list-item active" to="/">
          <i class="iconfont">&#xea9a;</i>
          <span>首页</span>
        </router-link>
        <router-link class="nav-list-item" to="category">
          <i class="iconfont">&#xe811;</i>
          <span>分类</span>
        </router-link>
        <router-link class="nav-list-item" to="cart">
          <i class="iconfont">&#xeab2;</i>
          <span>购物车</span>
        </router-link>
        <router-link class="nav-list-item" to="user">
          <i class="iconfont">&#xeab3;</i>
          <span>我的</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getUserInfo, loginOut } from '../api/user'
import { Toast, Dialog } from 'vant'
import 'vant/es/dialog/style'

export default defineComponent({
  data() {
    return {
      show: false,
      name: '我的',
      users: {
        nickName: '',
        loginName: '',
        introduceSign: ''
      }
    }
  },
  async mounted() {
    // 获取用户信息
    const res = await getUserInfo()
    Toast({
      message: '获取用户信息',
      position: 'bottom'
    })
    // 状态码416清除token并跳转登录
    res.resultCode === 416 &&
      (localStorage.removeItem('token'), this.$router.push('/login'))
    console.clear()
    console.log(
      '%c%c当前页面%c我的',
      'line-height:26px;',
      'line-height:16px;padding:2px 6px;border-radius: 5px 0px 0px 5px;background:#1f7777;color:#fff;font-size:12px;',
      'padding:2px 8px;background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);color:#000;line-height:16px;font-size:12px;border-radius: 0px 5px 5px 0px;'
    )
    // 将用户信息赋值给data
    !!res.data && (this.users = res.data)
  },
  methods: {
    // 后退
    goBack() {
      this.$router.go(-1)
    },
    goTo(val) {
      this.$router.push({ path: val })
    },
    async loginOutbtn() {
      await loginOut()
      Toast.success('退出登录')
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 弹窗确认
    dialog() {
      Dialog.confirm({
        title: '退出登录',
        message: '确定要退出吗？'
      })
        .then(() => {
          // on confirm
          this.loginOutbtn()
        })
        .catch(() => {
          // on cancel
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  line-height: 44px;
  padding: 0 10px;
  box-sizing: border-box;
  color: #252525;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  .simple-header-name {
    font-size: 14px;
  }
}
// 主页面
.user-box {
  height: 100%;
  overflow: auto;
  .user-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    box-sizing: border-box;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .user-name {
      font-size: 14px;
    }
  }
  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, #1baeae, #78c6c6);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 90px;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      box-sizing: border-box;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 20px;
    margin-top: 20px;
    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}
// 退出登录
.button {
  display: flex;
  justify-content: center;
  margin-top: 190px;
  .van-button {
    width: 80%;
  }
}
// nav
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 1000;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  .nav-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 0;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;
      &.router-link-active {
        color: #1baeae;
      }
      i {
        text-align: center;
        font-size: 22px;
      }
      span {
        font-size: 12px;
      }
      .van-icon-shopping-cart-o {
        margin: 0 auto;
        margin-bottom: 2px;
      }
    }
  }
}
</style>
