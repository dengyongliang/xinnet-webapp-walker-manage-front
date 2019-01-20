<template lang="pug">
  Form(:label-width="150")
    FormItem(label="账号ID：")
      span.text {{detailData.userCode}}
      input(type="hidden",:value="userCode",ref="userCode")
    comp-input(name='userName',label="姓名：",ref="userName",:defaultValue="detailData.userName",:show="modify")
      span.text(v-if="!modify",slot="left") {{detailData.userName}}
    comp-input(name='userEmail',label="邮箱：",:maxLength="64",ref="userEmail",:defaultValue="detailData.userEmail",:show="modify", validate="email")
      span.text(v-if="!modify",slot="left") {{detailData.userEmail}}
    comp-input(name='userMobile',label="手机：",:maxLength="11",ref="userMobile",:defaultValue="detailData.userMobile",:show="modify", validate="mobile")
      span.text(v-if="!modify",slot="left") {{detailData.userMobile}}
    comp-input(name='tel',label="座机：",ref="tel",:defaultValue="detailData.userTel",:show="modify")
      span.text(v-if="!modify",slot="left") {{detailData.userTel}}
    comp-input(name='qq',label="QQ：",ref="qq",:defaultValue="detailData.qq",:show="modify")
      span.text(v-if="!modify",slot="left") {{detailData.qq}}
    comp-input(name='wx',label="微信号：",ref="wx",:defaultValue="detailData.wx",:show="modify")
      span.text(v-if="!modify",slot="left") {{detailData.wx}}
    FormItem(label="",v-if="detailData.status!==0")
      Button(type="primary",@click="btnModify",v-if="!modify") 修改
      Button(type="primary",@click="btnSaveDetail",:loading="loadingBtn",v-if="modify") 确定
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  props: {
    detailData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
      loadingBtn: false,
      modify: false
    }
  },
  methods: {
    btnModify () {
      this.modify = true
    },
    btnSaveDetail () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userEmail.value,
        this.$refs.userMobile.value,
        this.$refs.userName.value,
        this.$refs.tel.value,
        this.$refs.qq.value,
        this.$refs.wx.value
      ])

      if (result) {
        let params = {
          param: {
            userName: this.$refs.userName.value,
            userMobile: this.$refs.userMobile.value,
            userEmail: this.$refs.userEmail.value,
            userCode: this.$refs.userCode.value,
            userTel: this.$refs.tel.value,
            qq: this.$refs.qq.value,
            wx: this.$refs.wx.value
          },
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.$Message.success('管家信息修改成功！')
              // 重置账号列表
              this.$emit('refreshData')
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定')
              } else {
                this.$Message.error('管家信息修改失败')
              }
            }
          }
        }
        this.saveUserInfo(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      saveUserInfo: types.SET_USER_INFO
    })
  },
  computed: {

  },
  beforeMount () {
  }
}
</script>
