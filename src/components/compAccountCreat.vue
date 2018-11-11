<template lang="pug">
  Form(:label-width="150",)
    comp-input(name='userName',label="姓名：",ref="userName",defaultValue="")
    comp-input(name='userMobile',label="联系手机：",ref="userMobile",defaultValue="")
    comp-input(name='userEmail',label="联系邮箱：",ref="userEmail",defaultValue="")
    FormItem(label="角色：")
      RadioGroup(v-model="roleCode.value",@on-change="onChange",ref="roleCode")
        Radio(v-for="item in rolesList",:label="item.roleCode") {{item.roleName}}
      Alert(type="error",show-icon, style="display:inline-block",v-show="roleCode.error!=0") 请选择角色权限！
    comp-re-password(defaultValue="",ref="compRePassword",label1="请输入登录密码：",label2="重复输入密码：")

    FormItem(label="")
      Button(type="primary",@click="creatAccount",:loading="loadingBtn") 确定
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import validateFormResult from '@/global/validateForm'
import compInput from './compInput'
import compRePassword from './compRePassword'
export default {
  components: {
    compInput,
    compRePassword
  },
  props: {

  },
  data () {
    return {
      loadingBtn: false,
      roleCode: {
        error: 0,
        value: ''
      }
    }
  },
  methods: {
    onChange (e) {
      this.roleCode.error = 0
    },
    creatAccount () {
      // console.log(this.rolesList)
      // let a = validateFormResult([this.$refs.userName,this.$refs.userMobile])
      // console.log(this.$refs.roleCode)
      this.loadingBtn = true
      let userName = this.$refs.userName.$refs.input.$refs.input.value
      let userMobile = this.$refs.userMobile.$refs.input.$refs.input.value
      let userEmail = this.$refs.userEmail.$refs.input.$refs.input.value
      let password = this.$refs.compRePassword.$refs.password.$refs.input.value
      let repassword = this.$refs.compRePassword.$refs.rePassword.$refs.input.value

      if (userName === '') {
        this.$refs.userName.$refs.input.focus()
        this.$refs.userName.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (userMobile === '') {
        this.$refs.userMobile.$refs.input.focus()
        this.$refs.userMobile.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (!this.GLOBALS.IS_PHONE_AVAILABLE(userMobile)) {
        this.$refs.userMobile.$refs.input.focus()
        this.$refs.userMobile.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (userEmail === '') {
        this.$refs.userEmail.$refs.input.focus()
        this.$refs.userEmail.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (!this.GLOBALS.IS_EMAIL_AVAILABLE(userEmail)) {
        this.$refs.userEmail.$refs.input.focus()
        this.$refs.userEmail.$refs.input.blur()
        this.loadingBtn = false
        return false
      }

      if (this.roleCode.value === '') {
        this.loadingBtn = false
        this.roleCode.error = 1
        return false
      }
      if (password === '') {
        this.$refs.compRePassword.$refs.password.focus()
        this.$refs.compRePassword.$refs.password.blur()
        this.loadingBtn = false
        return false
      }
      if (!this.GLOBALS.regPw.test(password)) {
        this.$refs.compRePassword.$refs.password.focus()
        this.$refs.compRePassword.$refs.password.blur()
        this.loadingBtn = false
        return false
      }
      if (repassword === '') {
        this.$refs.compRePassword.$refs.rePassword.focus()
        this.$refs.compRePassword.$refs.rePassword.blur()
        this.loadingBtn = false
        return false
      }
      if (!this.GLOBALS.regPw.test(repassword)) {
        this.$refs.compRePassword.$refs.rePassword.focus()
        this.$refs.compRePassword.$refs.rePassword.blur()
        this.loadingBtn = false
        return false
      }
      if (password !== repassword) {
        this.$refs.compRePassword.$refs.rePassword.focus()
        this.$refs.compRePassword.$refs.rePassword.blur()
        this.loadingBtn = false
        return false
      }
      let vm = this
      let params = {
        param: {
          userName: userName,
          userMobile: userMobile,
          userEmail: userEmail,
          roleCode: this.roleCode.value,
          password: password
        },
        callback: function (response) {
          vm.loadingBtn = false
          if (response.data.code === '1000'){
            vm.$Message.success('添加成功')
            // 添加成功，重新加载用户列表数据
            vm.$emit('refreshData')
          } else {
            if (response.data.code === '100') {
              vm.$Message.error('角色编码错误')
            } else if (response.data.code === '200') {
              vm.$Message.error('用户已存在')
            } else {
              vm.$Message.error('添加失败')
            }
          }
        }
      }
      this.creatNewAccount(params)
    },
    ...mapActions({
      creatNewAccount: types.CREAT_NEW_ACCOUNT
    })
  },
  computed: {
    ...mapState({
      rolesList (state) {
        return state.user.rolesList
      }
    })
  },
  beforeMount () {
  },
  watch: {
    rolesList: {
      handler (newName, oldName) {
      },
      deep: true
    }
  }
}
</script>