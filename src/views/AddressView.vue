<template>
  <div class="address-container">
    <el-header>
      <el-icon @click="this.$router.go(-1)"><ArrowLeft /></el-icon>
      <span>地址管理</span>
      <el-icon><More /></el-icon>
    </el-header>
    <el-main>
      <div v-for="item in addressList" :key="item">
        <span>{{ item.userName }} {{ item.userPhone }}</span>

        <br />
        <span
          >{{ item.cityName }} {{ item.provinceName }}
          {{ item.regionName }}</span
        >
        <el-button @click="getaddresslist(item.addressId)">修改</el-button>
      </div>
    </el-main>
    <el-footer>
      <el-row class="mb-4">
        <el-button type="primary" round @click="toaddressList"
          >新增地址</el-button
        >
      </el-row>
    </el-footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ArrowLeft, More } from '@element-plus/icons-vue'
import { myAddressList } from '@/api/address'
import { Toast } from 'vant'

export default defineComponent({
  components: {
    ArrowLeft,
    More
  },
  data() {
    return {
      oldaddresslist: [],

      addressList: [],
      data: [
        {
          addressId: 0,
          cityName: 'string',
          defaultFlag: 0,
          detailAddress: 'string',
          provinceName: 'string',
          regionName: 'string',
          userId: 1,
          userName: 'string',
          userPhone: 'string'
        }
      ],
      message: 'string',
      resultCode: 0
    }
  },
  // created() {
  //   myAddressList({
  //     data: [
  //       {
  //         addressId: this.data.addressId,
  //         cityName: this.data.cityName,
  //         defaultFlag: user.defaultFlag,
  //         detailAddress: this.data.detailAddress,
  //         provinceName: this.data.provinceName,
  //         regionName: this.data.regionName,
  //         userId: this.data.userId,
  //         userName: this.data.userName,
  //         userPhone: this.data.userPhone
  //       }
  //     ],
  //     message: this.message,
  //     resultCode: this.resultCode
  //   }).then((res) => {
  //     console.log(res)
  //   })
  // },
  created() {
    myAddressList(this.data.addressId).then((res) => {
      this.addressList = res.data
      Toast({
        message: '地址列表',
        position: 'bottom'
      })
      // console.log(this.addressList)
    })
  },
  methods: {
    getaddresslist(id) {
      this.$router.push(`/addresslist/${id}`)
    },
    toaddressList() {
      this.$router.push(`addresslist/0`)
    }
  }
})
</script>

<style lang="scss" scoped>
.address-container {
  position: relative;
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    height: 40px;
    span {
      font-size: 18px;
    }
    .el-icon {
      font-size: 18px;
    }
  }
  .el-main {
    div {
      position: relative;
      margin-bottom: 30px;
      span:nth-of-type(1) {
        font-size: 18px;
        margin-left: 20px;
      }

      span:nth-of-type(2) {
        display: block;
        margin-top: 8px;
        font-size: 14px;
        margin-left: 20px;
      }
      .el-button {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
  }
}
.el-footer {
  position: relative;
  .el-button {
    position: absolute;

    width: 330px;
    height: 50px;
  }
}
</style>
