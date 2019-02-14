<template lang="pug">
  Form(:label-width="150")
    comp-input(name='oldPassword',label="原密码：",ref="oldPassword",defaultValue="")
    comp-re-password(defaultValue="",ref="compRePassword",label1="新密码：",label2="重复新密码：")
    input(type="hidden",:value="userCode",ref="userCode")
    FormItem(label="")
      Button(type="primary",@click="btnModifyPw",:loading="loadingBtn") 修改
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import compRePassword from './compRePassword'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compRePassword
  },
  props: {
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
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.oldPassword,
        this.$refs.compRePassword
      ])

      if (result) {
        let params = {
          param: {
            oldPassword: this.$refs.oldPassword.value,
            newPassword: this.$refs.compRePassword.value1,
            userCode: this.$refs.userCode
          },
          callback: (response) => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('密码修改成功')
              this.$emit('refreshData')
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定')
              } else if (response.data.code === '400') {
                this.$Message.error('原始密码错误')
              } else {
                this.$Message.error('密码修改失败')
              }
            }
          }
        }
        this.savePw(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      savePw: types.SET_USER_PASSWORD
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
