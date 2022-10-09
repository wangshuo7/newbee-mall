<template>
  <div class="addresslist-container">
    <el-header>
      <el-icon @click="this.$router.go(-1)"><ArrowLeft /></el-icon>
      <span>新增地址</span>
      <el-icon><More /></el-icon>
    </el-header>
    <el-main>
      <el-form label-width="120px">
        <section>
          <el-form-item label="姓名" prop="userName">
            <el-input placeholder="收货人姓名" v-model="addressForm.userName" />
          </el-form-item>
        </section>
        <section>
          <el-form-item label="电话" prop="userPhone">
            <el-input
              placeholder="收货人手机号"
              v-model="addressForm.userPhone"
            />
          </el-form-item>
        </section>
        <section>
          <el-form-item label="省份" prop="cityName">
            <el-input
              placeholder="省份名称"
              v-model="addressForm.provinceName"
            />
          </el-form-item>
        </section>
        <section>
          <el-form-item label="城市" prop="cityName">
            <el-input placeholder="城市名称" v-model="addressForm.cityName" />
          </el-form-item>
        </section>

        <section>
          <el-form-item label="详细地址" prop="regionName">
            <el-input
              placeholder="街道，门牌，楼层房间号等信息"
              v-model="addressForm.regionName"
            />
          </el-form-item>
        </section>
      </el-form>
      <el-row class="mb-4">
        <el-button type="primary" round @click="toaddressList">保存</el-button>
        <el-button
          v-show="isShow"
          type="primary"
          round
          @click="deleteaddresslist()"
          >删除</el-button
        >
      </el-row></el-main
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ArrowLeft, More } from '@element-plus/icons-vue'
import {
  addAddressList,
  deleteAddressList,
  getAddressList,
  aditAddressList
} from '@/api/address'
import { Toast } from 'vant'
export default defineComponent({
  data() {
    return {
      // isShow: false,
      list: [],
      addressForm: {
        cityName: '',
        defaultFlag: 0,
        detailAddress: '',
        provinceName: '',
        regionName: '',
        userName: '',
        userPhone: ''
      }
    }
  },
  computed: {
    isShow() {
      return this.$route.params.id == 0 ? false : true
    }
  },
  components: {
    ArrowLeft,
    More
  },
  methods: {
    deleteaddresslist() {
      deleteAddressList(this.$route.params.id).then((res) => {
        !!res.data && (this.addressForm = res.data)
        this.$router.push('/address')
      })
    },
    toaddressList() {
      this.$route.params.id == 0 ? this.add() : this.edit()
      this.$router.push('/address')
    },
    add() {
      addAddressList({
        cityName: this.addressForm.cityName,
        userName: this.addressForm.userName,
        regionName: this.addressForm.regionName,
        userPhone: this.addressForm.userPhone,
        detailAddress: this.addressForm.detailAddress,
        defaultFlag: this.addressForm.defaultFlag,
        provinceName: this.addressForm.provinceName
      }).then((res) => {
        console.log(res)
      })
    },
    async edit() {
      let res = await aditAddressList(this.addressForm)
      console.log(res)
    }
  },
  async mounted() {
    console.log(this.$route)
    let res =
      this.$route.params.id != 0
        ? await getAddressList(this.$route.params.id)
        : ''
    !!res.data && (this.addressForm = res.data)
    Toast({
      message: '修改地址',
      position: 'bottom'
    })
  }
})
</script>

<style lang="scss" scoped>
.addresslist-container {
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

  .el-button {
    margin-left: 6px;
    margin-top: 20px;
    width: 400px;
    height: 50px;
  }
  .el-main {
    section {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ccc;
      margin-top: 20px;
    }
  }
}
</style>
