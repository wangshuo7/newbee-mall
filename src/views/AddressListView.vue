<template>
  <div class="addresslist-container">
    <el-header>
      <el-icon @click="this.$router.go(-1)"><ArrowLeft /></el-icon>
      <span>新增地址</span>
      <el-icon><More /></el-icon>
    </el-header>
    <el-main>
      <el-form label-width="120px" :rules="rules" :model="addressForm">
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
          <el-form-item label="省份" prop="provinceName">
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
        <div class="defaultaddress">
          <span>是否设为默认地址</span>
          <el-switch
            v-model="addressForm.defaultFlag"
            @click="becomedefaultaddress()"
          />
        </div>
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
  aditAddressList,
  defaultAddressList
} from '@/api/address'
import { Toast } from 'vant'
export default defineComponent({
  data() {
    return {
      rules: {
        userName: [
          {
            validator: this.validateuserName,
            trigger: 'blur'
          }
        ],
        userPhone: [{ validator: this.validateuserPhone, trigger: 'blur' }],
        provinceName: [
          { required: true, message: '必须输入省份', trigger: 'blur' }
        ],
        cityName: [
          { required: true, message: '必须输入城市', trigger: 'blur' }
        ],
        regionName: [
          { required: true, message: '必须输入详细地址', trigger: 'blur' }
        ]
      },

      list: [],
      addressForm: {
        addressId: '',
        cityName: '',
        defaultFlag: false,
        detailAddress: '',
        provinceName: '',
        regionName: '',
        userName: '',
        userPhone: '',
        userId: ''
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
    validateuserName(rule, value, callback) {
      if (value === '') {
        callback(new Error('必须输入姓名 '))
      } else {
        if (value.length > 3) {
          callback(new Error('请输入正确的姓名'))
        }
        callback()
      }
    },
    validateuserPhone(rule, value, callback) {
      if (value === '') {
        callback(new Error('必须输入电话 '))
      } else {
        if (
          !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
            value
          )
        ) {
          callback(new Error('请输入正确的电话'))
        }
        callback()
      }
    },
    becomedefaultaddress() {
      defaultAddressList(this.$route.params.id)
    },
    // 删除
    deleteaddresslist() {
      deleteAddressList(this.$route.params.id).then((res) => {
        !!res.data && (this.addressForm = res.data)
        this.$router.push('/address')
      })
    },

    toaddressList() {
      if (
        this.addressForm.userName != '' &&
        this.addressForm.userPhone != '' &&
        this.addressForm.cityName != '' &&
        this.addressForm.provinceName != '' &&
        this.addressForm.regionName != ''
      ) {
        this.$route.params.id == 0 ? this.add() : this.edit()
      } else {
        Toast({
          message: '请将信息填写完整',
          position: 'bottom'
        })
      }
    },
    add() {
      addAddressList({
        cityName: this.addressForm.cityName,
        userName: this.addressForm.userName,
        regionName: this.addressForm.regionName,
        userPhone: this.addressForm.userPhone,
        detailAddress: this.addressForm.detailAddress,
        defaultFlag: this.addressForm.defaultFlag ? 1 : 0,
        provinceName: this.addressForm.provinceName
      }).then(() => {
        this.$router.go(-1)
      })
    },
    async edit() {
      // this.addressForm.defaultFlag = this.addressForm.defaultFlag ? 1 : 0
      await aditAddressList({
        addressId: this.addressForm.addressId,
        userId: this.addressForm.userId,
        cityName: this.addressForm.cityName,
        userName: this.addressForm.userName,
        regionName: this.addressForm.regionName,
        userPhone: this.addressForm.userPhone,
        detailAddress: this.addressForm.detailAddress,
        defaultFlag: this.addressForm.defaultFlag ? 1 : 0,
        provinceName: this.addressForm.provinceName
      })
      this.$router.go(-1)
    }
  },
  async mounted() {
    Toast.loading({ message: '加载中...', forbidClick: true })
    let res =
      this.$route.params.id != 0
        ? await getAddressList(this.$route.params.id)
        : ''
    Toast.clear()
    !!res.data &&
      ((this.addressForm = res.data),
      (this.addressForm.defaultFlag =
        res.data?.defaultFlag == 1 ? true : false))

    // console.log(this.addressForm)
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
    background-color: #fff;
    justify-content: space-between;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    height: 30px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    span {
      font-size: 18px;
    }
    .el-icon {
      font-size: 18px;
    }
  }

  .el-button {
    background: linear-gradient(to right, #ff0844 0%, #ffb199 100%);
    border: none;
    margin-left: 6px;
    margin-top: 20px;
    width: 400px;
    height: 50px;
  }
  .el-main {
    margin-top: 30px;
    section {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ccc;
      margin-top: 20px;
    }
    .defaultaddress {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ccc;
      margin-top: 20px;
      span {
        font-size: 14px;
        margin-left: 43px;
        margin-right: 120px;
      }
    }
  }
}
</style>
