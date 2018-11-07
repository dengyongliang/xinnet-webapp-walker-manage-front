<template lang="pug">
  .pageLogin
    .main.clear
      .logo
        img(src="../../static/img/login/logo.png")
      Form(form="login", ref="form")
        FormItem
          Input.borderBox(:class="{ 'error': account.error != 0 }", name="account", v-model.trim="account.value", ref="account", @on-blur="onBlur", @on-focus="onFocus", placeholder="手机号/邮箱/用户名",)
          i.font.iconleft.font-people
          Alert(type="error",show-icon, style="display:inline-block",v-if="account.error == 1") 请输入登录名!
          Alert(type="error",show-icon, style="display:inline-block",v-if="account.error == 2") 您输入的登录名错误，请重新输入！
        FormItem
          Input.borderBox(type="password", name="password", placeholder="请输入密码", v-model.trim="password.value", :class="{ 'error': password.error != 0 }", ref="password", @on-blur="onBlur", @on-focus="onFocus")
          i.font.iconleft.font-lock1
          Alert(type="error",show-icon, style="display:inline-block",v-if="password.error == 1") 请输入密码!
          Alert(type="error",show-icon, style="display:inline-block",v-if="password.error == 2") 您输入的密码错误，请重新输入！

        FormItem.verificationCodeInput
          Input.borderBox(type="text", name="verificationCode", placeholder="请输验证码", :maxlength=6, :class="{ 'error': verificationCode.error != 0 }", v-model.trim="verificationCode.value", ref="verificationCode", @on-blur="onBlur", @on-focus="onFocus")
          a(href="javascript:;" @click="getVerificationCode", v-if="!verificationCode.success") 获取验证码
          i.font.iconleft.font-tick1
          span.tips
            i(v-if="verificationCode.success") 发送成功

          Alert(type="error",show-icon, style="display:inline-block",v-if="verificationCode.error == 1") 请输入短信口令!
          Alert(type="error",show-icon, style="display:inline-block",v-if="verificationCode.error == 2") 请输入6位的数字！
          Alert(type="error",show-icon, style="display:inline-block",v-if="verificationCode.error == 3") 输入短信口令错误，请重新输入！
          Alert(type="error",show-icon, style="display:inline-block",v-if="verificationCode.error == 4") 发送失败！
        FormItem
          Button(type="primary", @click="submit", :loading="loadingBtn") 登录

    Modal(v-model="modalAlertInfo.show",:title='modalAlertInfo.title',footer-hide,class-name="modalAlertInfo")
      div {{modalAlertInfo.content}}

</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import * as links from '../global/linkdo.js'
export default {
  data () {
    return {
      modalAlertInfo: {
        show: false,
        title: '',
        content: ''
      },
      loadingBtn: false,
      account: {
        value: '',
        error: 0
      },
      password: {
        value: '',
        error: 0
      },
      verificationCode: {
        value: '',
        error: 0,
        minlength: 6,
        success: false
      }
    }
  },
  methods: {
    submit () {
      this.loadingBtn = true
      if (this.$refs.account.value === '') {
        this.account.error = 1
        this.loadingBtn = false
        return false
      }
      if (this.$refs.password.value === '') {
        this.password.error = 1
        this.loadingBtn = false
        return false
      }
      if (this.$refs.verificationCode.value === '') {
        this.verificationCode.error = 1
        this.loadingBtn = false
        return false
      }
      if (this.$refs.verificationCode.value !== '' && this.$refs.verificationCode.value.length < 6) {
        this.verificationCode.error = 2
        this.loadingBtn = false
        return false
      }
      let param = {
        account: this.$refs.account.value,
        password: this.$refs.password.value,
        verificationCode: this.$refs.verificationCode.value
      }
      let vm = this
      let params = {
        param: {
          account: this.$refs.account.value,
          password: this.$refs.password.value,
          verificationCode: this.$refs.verificationCode.value
        },
        callback: function (response) {
          let data = response.data
          if (data.code === '1000') {
            window.location.href = '/'
          } else {
            vm.loadingBtn = false
            if (data.code === '100') {
              vm.account.error = 2
            } else if (data.code === '200') {
              vm.modalAlertInfo.show = true
              vm.modalAlertInfo.title = '失败'
              vm.modalAlertInfo.content = '用户已登录'
            } else if (data.code === '300') {
              vm.verificationCode.error = 3
            } else if (data.code === '400') {
              vm.password.error = 2
            } else if (data.code === '600') {
              vm.modalAlertInfo.show = true
              vm.modalAlertInfo.title = '失败'
              vm.modalAlertInfo.content = '用户被锁定'
            } else if (data.code === '700') {
              vm.modalAlertInfo.show = true
              vm.modalAlertInfo.title = '失败'
              vm.modalAlertInfo.content = '用户权限异常'
            }
          }
        }
      }

      this.loginSubmit(params)
    },
    getVerificationCode (e) {
      if (this.$refs.account.value === '') {
        this.account.error = 1
        this.loadingBtn = false
        return false
      }
      let vm = this
      let params = {
        param: {
          userCode: this.$refs.account.value
        },
        callback: function (response) {
          let data = response.data
          if (data.code === '1000') {
            vm.verificationCode.success = true
            vm.modalAlertInfo.show = true
            vm.modalAlertInfo.title = '发送成功'
            vm.modalAlertInfo.content = '短信口令已经发送，截止当天23:59:59有效，请注意保留！'
          } else if (data.code === '100') {
            vm.modalAlertInfo.show = true
            vm.modalAlertInfo.title = '发送失败'
            vm.modalAlertInfo.content = '手机号码错误'
          } else if (data.code === '200') {
            vm.modalAlertInfo.show = true
            vm.modalAlertInfo.title = '发送失败'
            vm.modalAlertInfo.content = '短信验证码已超上限'
          } else if (data.code === '300') {
            vm.modalAlertInfo.title = '提示'
            vm.modalAlertInfo.content = '短信口令已经发送，截止当天23:59:59有效，请注意保留！'
            vm.modalAlertInfo.show = true
          } else if (data.code === '900') {
            vm.verificationCode.error = 4
          }
        }
      }
      this.loginVerificationCode(params)
    },
    onFocus (e) {
      this.account.error = 0
      this.password.error = 0
      this.verificationCode.error = 0
    },
    onBlur (e) {
      let val = e.target.value
      let name = e.target.name

      if (name === 'verificationCode') {
        if (val !== '') {
          if (val.length < this.verificationCode.minlength) {
            this.verificationCode.error = 2
          }
        }
      }
    },
    ...mapActions({
      loginSubmit: types.LOGIN_SUBMIT,
      loginVerificationCode: types.LOGIN_VERIFICATIONCODE
    })
  },
  computed: {
    ...mapMutations([
      'types.SHOW_BODY_SPIN'
    ])
  },
  beforeMount () {
  },
  mounted(){
    this.$store.commit(types.SHOW_BODY_SPIN)
  }
}
</script>

<style scope>
.pageLogin{
  height:100%;
  background:url(../../static/img/login/bg.png) no-repeat;
  background-size:100% 100%;
  position:relative;
}
.pageLogin .main{
  width:720px;
  height:345px;
  background:rgba(255,255,255,0.3);
  position:absolute;
  left:50%;
  top:50%;
  margin:-170px 0 0 -360px;
  box-shadow:2px 2px 5px rgba(0,0,0,0.2)
}
.pageLogin .logo{
  float:left;
  width:360px;
  text-align:center;
  padding-top:112px;
}
.pageLogin form{
  width:360px;
  height:100%;
  background:#fff;
  float:right;
  padding:40px 30px;
}
.pageLogin .ivu-form-item{
  margin-bottom:15px;
  position:relative;
}
.pageLogin form input{
  width:300px;
  height:48px;
  background:#f3f4f8;
  border-color:#f3f4f8;
  padding-left:50px;
}
.pageLogin .ivu-form-item .iconleft{
  color:#bbbbbb;
  position:absolute;
  top:8px;
  left:15px;
}
.pageLogin .ivu-btn{
  width:100%;
  height:50px;
  line-height:50px;
  padding:0px;
}
.pageLogin .xwMsg{
  display:block;
  padding-top:5px;
}
.pageLogin .verificationCodeInput a{
  position:absolute;
  right:10px;
  top:15px;
  color:#2271f4;
  text-decoration: underline;
  line-height:20px;
}
.pageLogin .verificationCodeInput .tips{
  position:absolute;
  right:10px;
  top:15px;
  color:#333;
  line-height:20px;
}
</style>
