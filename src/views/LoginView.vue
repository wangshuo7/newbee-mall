<template>
  <!-- 导航栏 -->
  <transition name="slide-left">
    <div class="login-view">
      <header class="simple-header">
        <van-icon name="arrow-left" @click="goBack" />
        <div class="simple-header-name">{{ name }}</div>
        <van-icon name="weapp-nav" />
      </header>
      <div class="login-Container">
        <!-- logo -->
        <van-image
          width="100"
          height="100"
          src="../../public/u.png"
        />
        <h1>新蜂商城</h1>
        <!-- 登录首页 -->
        <div v-if="type == 'login'" class="login-body login">
          <van-form @submit="onSubmit">
            <van-cell-group>
              <van-field
                v-model="loginForm.username"
                name="username"
                label="用户名"
                placeholder="用户名"
                right-icon="manager-o"
                label-width="50"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                v-model="loginForm.password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                label-width="50"
                right-icon="closed-eye"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
            </van-cell-group>
            <div style="margin: 16px">
              <div class="link-register" @click="this.type = 'register'">
                立即注册
              </div>

              <van-button
                round
                block
                type="info"
                color="linear-gradient(to right,#f2b314,#face5d)"
                native-type="submit"
                >登录</van-button
              >
              <van-checkbox
                icon-size="16px"
                v-model="checked"
                checked-color="#f2b314"
                >您已阅读并同意<a
                  style="color: #3e3e3e; text-decoration: none"
                  href="javascript:;"
                  >《用户服务协议》《隐私权政策》</a
                ></van-checkbox
              >
            </div>
          </van-form>
        </div>
        <div v-else class="login-body register">
          <van-form @submit="onSubmit">
            <van-cell-group>
              <van-field
                v-model="username1"
                name="username1"
                label="手机号"
                placeholder="手机号"
                right-icon="phone-o"
                :rules="[{ required: true, message: '请填写手机号' }]"
              />
              <van-field
                v-model="password1"
                type="password"
                name="password1"
                label="密码"
                placeholder="密码"
                right-icon="closed-eye"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
              <van-field
                v-model="password2"
                type="password"
                name="password1"
                label="确认密码"
                right-icon="closed-eye"
                placeholder="请再次填写密码"
                :rules="[
                  {
                    required: true,
                    message: '请填写确认密码',
                    validator: validatorMessage
                  }
                ]"
              />
            </van-cell-group>
            <div style="margin: 16px">
              <div class="link-login" @click="type = 'login'">已有登录账号</div>
              <van-button
                round
                block
                type="info"
                color="linear-gradient(to right,#f2b314,#face5d)"
                native-type="submit"
                >注册</van-button
              >
            </div>
          </van-form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from 'vue'
import logoURL from '@/assets/logo.png'
import { login, register } from '@/api/user.js'
import { Toast } from 'vant'
import 'vant/es/toast/style'
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
      password2: '',
      type: 'login',
      back: '/home',
      logoURL,
      checked: true
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
      this.verificationCode(values)
    },
    validatorMessage(val) {
      if (val != this.password1) {
        return '两次密码不同，请重新输入'
      }
    },
    verificationCode(values) {
      // 验证密钥
      let captchaId = '197617624'
      // 腾讯滑块验证码appid生成一个滑块验证码对象
      let captcha = new TencentCaptcha(captchaId, async (res) => {
        // 判断验证码是否通过
        if (res.ret === 0) {
          if (this.type == 'login') {
            const res = await login({
              loginName: values.username,
              passwordMd5: md5(values.password)
            })
            !!res?.data &&
              (Toast.success('登录成功'), // 轻提示弹框
              localStorage.setItem('token', res?.data), //本地存储token
              this.$router.push('/')) // 跳转首页
          } else {
            const res = await register({
              loginName: values.username1,
              password: values.password1
            })
            res?.resultCode == 200 &&
              (Toast.success('注册成功'), (this.type = 'login'))
          }
          // 页面上滑动正确，请求自己的业务接口
          // 记得把验证成功的票据和随机字符带到自己接口中去腾讯验证票据的真实性
          // _this.searchData.ticket = res.ticket
          // _this.searchData.randStr = res.randstr
          // _this.getSearchResult()
        }
      })
      captcha.langFun()
      // 滑块显示
      captcha.show()
    }
  },
  mounted() {
    console.clear()
    /* console.log(
      '%c%c当前页面%c登录/注册',
      'line-height:26px;',
      'line-height:16px;padding:2px 6px;border-radius: 5px 0px 0px 5px;background:#1f7777;color:#fff;font-size:12px;',
      'padding:2px 8px;background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);color:#000;line-height:16px;font-size:12px;border-radius: 0px 5px 5px 0px;'
    ) */
  }
})
</script>

<style lang="scss" scoped>
.van-cell-group {
  border-radius: 10px;
  box-shadow: 0 0 50px 2px rgba(153, 152, 152, 0.1);
  overflow: hidden;
  padding: 10px;
}
.login-view {
  background: #f8f8fa;
  height: 100%;
  overflow: auto;
}
:deep(.van-checkbox) {
  margin-top: 10px;
  box-sizing: border-box;
  span {
    color: #8f8f8f;
  }
}
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
// login-container
.login-Container {
  .van-image {
    width: 100px;
    height: 100px;
    display: block;
    box-sizing: border-box;
    margin: 100px auto 0px;
  }
  h1 {
    font-size: 30px;
    font-family: sans-serif;
    color: #f2b314;
    text-align: center;
    font-weight: 900;
    position: relative;
    top: 0px;
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
      margin-bottom: 70px;
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
  .van-button {
    border: none;
  }
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 1s;
  position: absolute;
  backface-visibility: hidden;
}
</style>
