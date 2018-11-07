<template lang="pug">
  Form(:label-width="150")
    comp-input(name='userEmail',label="邮箱：",:show="refresh",ref="userEmail",:defaultValue="userEmail")
    comp-input(name='userName',label="姓名：",:show="refresh",ref="userName",:defaultValue="userName")
    comp-input(name='userMobile',label="手机：",:show="refresh",ref="userMobile",:defaultValue="userMobile")
    input(type="hidden",:value="userCode",ref="userCode")
    FormItem(label="")
      Button(type="primary",@click="btnModifyInfo",:loading="loadingBtn") 修改
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
export default {
  components: {
    compInput
  },
  props: {
    refresh: {
      type: Boolean,
      default: false
    },
    userEmail: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    },
    userMobile: {
      type: String,
      default: ''
    },
    userCode: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    btnModifyInfo () {
      this.loadingBtn = true
      console.log(this.$refs)
      let userName = this.$refs.userName.$refs.input.$refs.input.value
      let userEmail = this.$refs.userEmail.$refs.input.$refs.input.value
      let userMobile = this.$refs.userMobile.$refs.input.$refs.input.value
      let userCode = this.$refs.userCode.value

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
      let vm = this
      let params = {
        param: {
          userName: userName,
          userMobile: userMobile,
          userEmail: userEmail,
          userCode: userCode
        },
        callback: function (response) {
          vm.loadingBtn = false
          if (response.data.code === '1000') {
            vm.$Message.success('用户信息修改成功')
            // 重置store用户信息
            if (vm.from === "accountMy") {
              vm.$store.dispatch(types.GET_CURRENT_USER_DATA)
            } else {
              vm.$emit('refreshData')
            }
          } else {
            if (response.data.code === '200') {
              vm.$Message.error('用户不存在')
            } else if (response.data.code === '300') {
              vm.$Message.error('用户被锁定')
            } else if (response.data.code === '500') {
              vm.$Message.error('参数错误或参数为空')
            } else if (response.data.code === '900') {
              vm.$Message.error('操作失败')
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
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      }
    })
  },
  beforeMount () {
  }
}
</script>