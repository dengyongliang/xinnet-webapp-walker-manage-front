<template lang="pug">
  Form(:label-width="150",)
    comp-input(name='userName',label="姓名：",ref="userName",defaultValue="")
    comp-input(name='userMobile',label="联系手机：",ref="userMobile",defaultValue="", validate="mobile")
    comp-input(name='userEmail',label="联系邮箱：",ref="userEmail",defaultValue="", validate="email")
    FormItem(label="角色：")
      comp-radio(:list="rolesList", ref="roleCode")
      //- RadioGroup(v-model="roleCode.value",@on-change="onChange",ref="roleCode")
      //-   Radio(v-for="item in rolesList",:label="item.roleCode", :key="item.roleCode") {{item.roleName}}
      //- Alert(type="error",show-icon, style="display:inline-block",v-show="roleCode.error!=0") 请选择角色权限！
    comp-re-password(defaultValue="",ref="compRePassword",label1="请输入登录密码：",label2="重复输入密码：")

    FormItem(label="")
      Button(type="primary",@click="creatAccount",:loading="loadingBtn") 确定
</template>

<script>
import { mapState } from 'vuex'
import validateFormResult from '@/global/validateForm'
import compInput from './compInput'
import compRePassword from './compRePassword'
import compRadio from './compRadio'
export default {
  components: {
    compInput,
    compRadio,
    compRePassword
  },
  props: {

  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    creatAccount () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userName,
        this.$refs.userMobile,
        this.$refs.userEmail,
        this.$refs.roleCode,
        this.$refs.compRePassword
      ])

      if (result) {
        let params = {
          userName: this.$refs.userName.value,
          userMobile: this.$refs.userMobile.value,
          userEmail: this.$refs.userEmail.value,
          roleCode: this.$refs.roleCode.param.code,
          password: this.$refs.compRePassword.value1
        }
        console.log(params)
        this.$store.dispatch('ADD_USER_INFO', params).then((response) => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success('添加成功')
            // 添加成功，重新加载用户列表数据
            this.$emit('refreshData')
          } else {
            if (response.data.code === '100') {
              this.$Message.error('角色编码错误')
            } else if (response.data.code === '200') {
              this.$Message.error('用户已存在')
            } else {
              this.$Message.error('添加失败')
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
      rolesList (state) {
        return this.GLOBALS.CONVERT_RADIO(state.user.rolesList, {
          label: 'id',
          code: 'roleCode',
          value: 'roleName'
        })
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
