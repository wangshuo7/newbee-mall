<template>
  <!-- 导航栏 -->
  <header class="simple-header">
    <van-icon name="arrow-left" @click="goBack" />
    <div class="simple-header-name">{{ name }}</div>
    <van-icon name="weapp-nav" />
  </header>
  <div class="login-Container">
    <!-- logo -->
    <van-image width="100" height="100" :src="logoURL" />
    <!-- 登录首页 -->
    <div v-if="type == 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginForm.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button
            round
            block
            type="info"
            color="#1baeae"
            native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username1"
          name="username1"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
          <van-button
            round
            block
            type="info"
            color="#1baeae"
            native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import logoURL from '@/assets/logo.png'
import { login } from '@/api/user.js'
// 引入md5加密
import md5 from 'js-md5'

export default defineComponent({
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        ticket: '',
        randstr: ''
      },
      username1: '',
      password1: '',
      type: 'login',
      back: '/home',
      logoURL
    }
  },
  computed: {
    name() {
      return this.type == 'login' ? '登录' : '注册'
    }
  },
  methods: {
    goBack() {
      if (!this.back) {
        this.$router.go(-1)
      } else {
        this.$router.push({ path: this.back })
      }
      // this.$emit('callback')
    },
    async onSubmit(values) {
      // 腾讯云验证码
      // this.verificationCode()
      if (this.type == 'login') {
        const data = await login({
          loginName: values.username,
          passwordMd5: md5(values.password)
        })
        localStorage.setItem('token', data)
        // this.$router.push('/')
      } else {
        await register({
          loginName: values.username1,
          password: values.password1
        })
        Toast.success('注册成功')
        this.type = 'login'
      }
    },
    verificationCode() {
      let captchaId = '197617624'
      // 腾讯滑块验证码appid生成一个滑块验证码对象
      var captcha = new TencentCaptcha(captchaId, function (res) {
        if (res.ret === 0) {
          // 页面上滑动正确，请求自己的业务接口
          // 记得把验证成功的票据和随机字符带到自己接口中去腾讯验证票据的真实性
          // _this.searchData.ticket = res.ticket
          // _this.searchData.randStr = res.randstr
          // _this.getSearchResult()
          console.log(res, '腾讯云验证码')
        }
      })
      captcha.langFun()
      // 滑块显示
      captcha.show()
    }
  }
})
</script>

<style lang="scss" scoped>
.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
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
// login-container
.login-Container {
  .van-image {
    width: 100px;
    height: 100px;
    display: block;
    margin: 130px auto 50px;
  }
  .login-body {
    padding: 0 20px;
  }
  .login {
    .link-register {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
      margin-bottom: 50px;
    }
  }
  .register {
    .link-login {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
}
</style>
