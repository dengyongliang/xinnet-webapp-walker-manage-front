<template lang="pug">
  Form(:label-width="150")
    FormItem(label="账号ID：")
      span.text {{userCode}}
      input(type="hidden",:value="userCode",ref="userCode")
    comp-input(name='userName',label="姓名：",ref="userName",:defaultValue="userName",)
    comp-input(name='userEmail',label="邮箱：",:maxLength="64",ref="userEmail",:defaultValue="userEmail",)
    comp-input(name='userMobile',label="手机：",:maxLength="11",ref="userMobile",:defaultValue="userMobile",)
    comp-input(name='tel',label="座机：",ref="tel",:defaultValue="userTel",)
    comp-input(name='qq',label="QQ：",ref="qq",:defaultValue="qq",)
    comp-input(name='wx',label="微信号：",ref="wx",:defaultValue="wx",)
    FormItem(label="")
      Button(type="primary",@click="btnSaveDetail",:loading="loadingBtn") 确定
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
export default {
  components: {
    compInput
  },
  props: {
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userMobile: {
      type: String,
      required: true
    },
    userCode: {
      type: String,
      required: true
    },
    userTel: {
      type: String,
      required: false
    },
    qq: {
      type: String,
      required: false
    },
    wx: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    btnSaveDetail () {
      let emailV = this.$refs.userEmail.$refs.input.$refs.input._value
      let mobileV = this.$refs.userMobile.$refs.input.$refs.input._value
      let nameV = this.$refs.userName.$refs.input.$refs.input._value
      let telV = this.$refs.tel.$refs.input.$refs.input._value
      let qqV = this.$refs.qq.$refs.input.$refs.input._value
      let wxV = this.$refs.wx.$refs.input.$refs.input._value
      let codeV = this.$refs.userCode.value

      //console.log(this.$refs.userMobile.$refs.input.$refs.input._value)
      this.loadingBtn = true
      if (nameV === '') {
        this.$refs.userName.$refs.input.focus()
        this.$refs.userName.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (mobileV === '') {
        this.$refs.userMobile.$refs.input.focus()
        this.$refs.userMobile.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (!this.GLOBALS.IS_PHONE_AVAILABLE(mobileV)) {
        this.$refs.userMobile.$refs.input.focus()
        this.$refs.userMobile.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (emailV === '') {
        this.$refs.userEmail.$refs.input.focus()
        this.$refs.userEmail.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (!this.GLOBALS.IS_EMAIL_AVAILABLE(emailV)) {
        this.$refs.userEmail.$refs.input.focus()
        this.$refs.userEmail.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (telV === '') {
        this.$refs.tel.$refs.input.focus()
        this.$refs.tel.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (qqV === '') {
        this.$refs.qq.$refs.input.focus()
        this.$refs.qq.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (wxV === '') {
        this.$refs.wx.$refs.input.focus()
        this.$refs.wx.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      let vm = this
      let params = {
        param: {
          userName: nameV,
          userMobile: mobileV,
          userEmail: emailV,
          userCode: codeV,
          userTel: telV,
          qq: qqV,
          wx: wxV
        },
        callback: function (response) {
          vm.loadingBtn = false
          if( response.data.code === '1000' ){
            vm.$Message.success('管家信息修改成功！')
            // 重置账号列表
            vm.$emit('refreshData')
          } else {
            if (response.data.code === '200') {
              vm.$Message.error('用户不存在')
            } else if (response.data.code === '300') {
              vm.$Message.error('用户被锁定')
            } else {
              vm.$Message.error('管家信息修改失败')
            }
          }
        }
      }
      this.saveUserInfo(params)
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
