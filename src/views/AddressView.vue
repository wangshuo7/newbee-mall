<template>
  <div class="address-container">
    <el-header>
      <el-icon @click="this.$router.go(-1)"><ArrowLeft /></el-icon>
      <span>地址管理</span>
      <el-icon><More /></el-icon>
    </el-header>
    <el-main>
      <div
        v-for="item in addressList"
        :key="item"
        class="div1"
        @click="chooseAddress"
        :_id="item.addressId"
      >
        <div :_id="item.addressId">
          <span class="span1" :_id="item.addressId"
            >{{ item.userName }} {{ item.userPhone }}</span
          >

          <br />
          <span class="span2" :_id="item.addressId"
            >{{ item.cityName }} {{ item.provinceName }}
            {{ item.regionName }}</span
          >
        </div>
        <div class="div2" :_id="item.addressId">
          <van-tag
            :_id="item.addressId"
            round
            color="#7232dd"
            v-show="!!item.defaultFlag"
            >默认</van-tag
          >
          <el-button
            :_id="item.addressId"
            @click="getaddresslist(item.addressId)"
            >修改</el-button
          >
        </div>
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
      fullPath: '',
      message: 'string',
      resultCode: 0
    }
  },

  mounted() {
    myAddressList(this.data.addressId).then((res) => {
      this.addressList = res.data
      Toast({
        message: '地址列表',
        position: 'bottom'
      })
    })
  },
  methods: {
    getaddresslist(id) {
      this.$router.push(`/addresslist/${id}`)
    },
    toaddressList() {
      this.$router.push(`addresslist/0`)
    },
    chooseAddress(event) {
      console.log(event.target.getAttribute('_id'))
      this.$router.replace(
        this.fullPath + '&' + `addressId=${event.target.getAttribute('_id')}`
      )
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path == '/orders') {
        vm.fullPath = `${from.path}?cartItemIds=${from.query.cartItemIds}`
        console.log(from)
        // this.$router.push(from.fullPath)
      }
    })
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
    .div1 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
      .span1 {
        font-size: 18px;
        display: block;
      }

      .span2 {
        font-size: 14px;
        display: block;
      }
    }
    .div2 {
      .van-tag {
        margin-right: 65px;
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
