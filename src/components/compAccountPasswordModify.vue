<template lang="pug">
  Form(:label-width="150")
    comp-input(name='oldPassword',label="请输入原密码：",:show="refresh",ref="oldPassword",defaultValue="")
    comp-re-password(defaultValue="",ref="compRePassword",:show="refresh",label1="请输入新密码：",label2="请重复输入新密码：")
    input(type="hidden",:value="userCode",ref="userCode")
    FormItem(label="")
      Button(type="primary",@click="btnModifyPw",:loading="loadingBtn") 修改
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import compRePassword from './compRePassword'
export default {
  components: {
    compInput,
    compRePassword
  },
  props: {
    refresh: {
      type: Boolean,
      default: false
    },
    userCode: {
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
    btnModifyPw () {
      // console.log(this.$refs)
      // this.$refs.oldPassword.$refs.msgError.$el.style.display="inline-block"
      // this.$refs.oldPassword.$refs.msgError.$el.children[1].innerHTML="JSAALJFSKFK"
      let oldp = this.$refs.oldPassword.$refs.input.$refs.input._value
      let newp = this.$refs.compRePassword.$refs.password.$refs.input._value
      let rep = this.$refs.compRePassword.$refs.rePassword.$refs.input._value
      let userCode = this.$refs.userCode.value

      this.loadingBtn = true
      if (oldp === '') {
        this.$refs.oldPassword.$refs.input.focus()
        this.$refs.oldPassword.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (newp === '') {
        this.$refs.compRePassword.$refs.password.focus()
        this.$refs.compRePassword.$refs.password.blur()
        this.loadingBtn = false
        return false
      }
      if (!this.GLOBALS.regPw.test(newp)) {
        this.$refs.compRePassword.$refs.password.focus()
        this.$refs.compRePassword.$refs.password.blur()
        this.loadingBtn = false
        return false
      }
      if (rep === '') {
        this.$refs.compRePassword.$refs.rePassword.focus()
        this.$refs.compRePassword.$refs.rePassword.blur()
        this.loadingBtn = false
        return false
      }
      if (!this.GLOBALS.regPw.test(rep)) {
        this.$refs.compRePassword.$refs.rePassword.focus()
        this.$refs.compRePassword.$refs.rePassword.blur()
        this.loadingBtn = false
        return false
      }
      if (newp !== rep) {
        this.$refs.compRePassword.$refs.rePassword.focus()
        this.$refs.compRePassword.$refs.rePassword.blur()
        this.loadingBtn = false
        return false
      }
      let vm = this
      let params = {
        param: {
          oldPassword: oldp,
          newPassword: newp,
          userCode: userCode
        },
        callback: function (response) {
          vm.loadingBtn = false
          if (response.data.code === '1000') {
            vm.$Message.success('密码修改成功')
            vm.$emit('refreshData')
          } else {
            if (response.data.code === '200') {
              vm.$Message.error('用户不存在')
            } else if (response.data.code === '300') {
              vm.$Message.error('用户被锁定')
            } else if (response.data.code === '400') {
              vm.$Message.error('原始密码错误')
            } else if (response.data.code === '500') {
              vm.$Message.error('参数错误或参数为空')
            } else if (response.data.code === '900') {
              vm.$Message.error('操作失败')
            }
          }
        }
      }
      this.savePw(params)
    },
    ...mapActions({
      savePw: types.SET_USER_PASSWORD,
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