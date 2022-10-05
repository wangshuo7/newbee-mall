<template>
  <div>
    <header class="simple-header">
      <van-icon name="arrow-left" @click="goBack" />
      <div class="simple-header-name">{{ name }}</div>
      <van-icon name="weapp-nav" />
    </header>
    <div class="seting-box">
      <div class="input-item">
        <van-field v-model="nickName" label="昵称" />
        <van-field v-model="introduceSign" label="个性签名" />
        <van-field v-model="password" type="password" label="修改密码" />
      </div>
      <van-button
        class="save-btn"
        color="#1baeae"
        type="primary"
        @click="save"
        block
        round
        >保存</van-button
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getUserInfo, EditUserInfo } from '../api/user'
import { Toast } from 'vant'
import md5 from 'js-md5'
export default defineComponent({
  data() {
    return {
      name: '账号管理',
      nickName: '',
      introduceSign: '',
      password: ''
    }
  },
  // 获取用户信息
  async mounted() {
    const { data } = await getUserInfo()
    Toast({
      message: '获取用户信息',
      position: 'bottom'
    })
    this.nickName = data.nickName
    this.introduceSign = data.introduceSign
  },
  methods: {
    async save() {
      const params = {
        introduceSign: this.introduceSign, // 个性签名
        nickName: this.nickName, // 用户昵称
        passwordMd5: md5(this.password) //  Md5加密用户密码
      }
      // 发送修改请求
      const res = await EditUserInfo(params)
      console.log(res)
      // 轻提示保存成功
      Toast.success('保存成功')
      setTimeout(() => {
        this.$router.go(-1)
      }, 500)
    },
    goBack() {
      this.$router.go(-1)
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
.seting-box {
  padding-top: 60px;
  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>
