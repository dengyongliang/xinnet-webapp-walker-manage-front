<template lang="pug">
  Modal.modalAddAccount(width="480", :status="isShow",v-model="showed",title="创建账户",:mask-closable="maskClosable",:footer-hide="true")
    Form(:label-width="80")
      comp-input(name='userName',label="姓名：",ref="userName",:defaultValue="userName",:show="showed")
      comp-input(name='userEmail',label="邮箱：",:maxLength="64",ref="userEmail",:defaultValue="userEmail",:show="showed")
    .footer
      Button(@click="showed=false") 取消
      Button(type="primary", @click="saveAccount",:loading="loadingBtn") 确定

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
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showed: false,
      loadingBtn: false,
      userName: '',
      userEmail: ''
    }
  },
  methods: {
    saveAccount () {
      this.loadingBtn = true
      let emailV = this.$refs.userEmail.$refs.input.$refs.input._value
      let nameV = this.$refs.userName.$refs.input.$refs.input._value
      if (nameV === '') {
        this.$refs.userName.$refs.input.focus()
        this.$refs.userName.$refs.input.blur()
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
      let vm = this
      let params = {
        param: {
          userName: nameV,
          userEmail: emailV
        },
        callback: function (response) {
          vm.loadingBtn = false
          if( response.data.code === '1000' ){
            vm.$Message.success('账号创建成功！')
            vm.showed = false
            // 重置账号列表
            vm.$emit('refreshData')
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

      this.creatAdmin(params)
    },
    ...mapActions({
      creatAdmin: types.CREAT_ADMIN
    })
  },
  computed: {
    isShow () {
      if (this.showModal) {
        this.showed = true
      } else {
        this.showed = false
      }
    },
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {

  }
}
</script>
