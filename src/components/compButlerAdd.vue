<template lang="pug">
.compButlerAdd
  Form(:label-width="80")
    comp-input(name='userName',label="姓名：",ref="userName",:defaultValue="userName")
    comp-input(name='userEmail',label="邮箱：",:maxLength="64",ref="userEmail",:defaultValue="userEmail", validate="email")
  .footer
    Button(@click="close") 取消
    Button(type="primary", @click="saveAccount",:loading="loadingBtn") 确定

</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loadingBtn: false,
      userName: '',
      userEmail: ''
    }
  },
  methods: {
    close () {
      this.$emit('closeModal')
    },
    saveAccount () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userEmail,
        this.$refs.userName
      ])

      if (result) {
        let params = {
          param: {
            userName: this.$refs.userName.value,
            userEmail: this.$refs.userEmail.value
          },
          callback: (response) => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('账号创建成功！')
              this.$emit('closeModal')
              // 重置账号列表
              this.$emit('refreshData')
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户已存在')
              } else {
                this.$Message.error('账号创建失败')
              }
            }
          }
        }
        this.creatAdmin(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      creatAdmin: types.CREAT_ADMIN
    })
  },
  computed: {
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {

  }
}
</script>
