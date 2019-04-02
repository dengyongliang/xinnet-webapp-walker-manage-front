<template lang="pug">
  Form(:label-width="150")
    comp-input(name='userEmail',label="邮箱：",ref="userEmail",:defaultValue="detailData.userEmail", validate="email")
    comp-input(name='userName',label="姓名：",ref="userName",:defaultValue="detailData.userName", )
    comp-input(name='userMobile',label="手机：",ref="userMobile",:defaultValue="detailData.userMobile", validate="mobile")
    FormItem(label="角色：")
      RadioGroup(v-model="roleId",@on-change="onChange",ref="roleId")
        Radio(v-for="item in rolesList",:label="item.id", :key="item.id") {{item.roleName}}
    input(type="hidden",:value="detailData.userCode",ref="userCode")
    FormItem(label="")
      Button(type="primary",@click="btnModifyInfo",:loading="loadingBtn") 修改
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
    detailData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    },
    from: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loadingBtn: false,
      roleId: ''
    }
  },
  methods: {
    btnModifyInfo () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userName,
        this.$refs.userMobile,
        this.$refs.userEmail
      ])

      if (result) {
        let params = {
          userName: this.$refs.userName,
          userMobile: this.$refs.userMobile,
          userEmail: this.$refs.userEmail,
          userCode: this.$refs.userCode,
          roleId: this.roleId
        }
        this.$store.dispatch('UPDATE_USER_INFO', params).then((response) => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success('用户信息修改成功')
            // 重置store用户信息
            if (this.from === 'accountMy') {
              // vm.$store.dispatch(types.GET_CURRENT_USER_DATA)
            } else {
              this.$emit('refreshData')
            }
          } else {
            if (response.data.code === '200') {
              this.$Message.error('用户不存在')
            } else if (response.data.code === '300') {
              this.$Message.error('用户被锁定')
            } else if (response.data.code === '400') {
              this.$Message.error('手机号码已存在')
            } else if (response.data.code === '600') {
              this.$Message.error('角色不存在')
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
      },
      rolesList (state) {
        return state.user.rolesList
      }
    })
  },
  beforeMount () {
  },
  mounted () {
    this.roleId = this.detailData.roleId
  }
}
</script>
