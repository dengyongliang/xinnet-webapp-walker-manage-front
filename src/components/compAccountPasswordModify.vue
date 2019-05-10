<template lang="pug">
  Form(:label-width="150")
    comp-re-password(defaultValue="",ref="compRePassword",label1="新密码：",label2="重复新密码：")
    input(type="hidden",:value="userCode",ref="userCode")
    FormItem(label="")
      Button(type="primary",@click="btnModifyPw",:loading="loadingBtn") 修改
</template>

<script>
import { mapState } from 'vuex'
import compRePassword from './compRePassword'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
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
        this.$refs.compRePassword
      ])

      if (result) {
        let params = {
          newPassword: this.$refs.compRePassword.value1,
          userCode: this.$refs.userCode.value
        }
        console.log(params)
        this.$store.dispatch('UPDATE_USER_PASSWORD', params).then((response) => {
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
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    }
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
