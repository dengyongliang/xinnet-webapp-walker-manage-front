<template lang="pug">
.contAccountMy
  <!-- 标题区 -->
  h1.pageTitle.clear 我的账户
    .tR(v-if="myUserInfo.userRoles[0].roleCode!='super'")
      Button(@click="drawerModifyPw=true") 修改密码
      Button(@click="drawerModifyInfo=true") 修改信息

  .secMain
    Spin(v-if="showSpin",size="large")
    Form.accountInfo(:label-width="150",v-if="showCont")
      FormItem(label="员工姓名：")
        span.text {{myUserInfo.userName}}
      FormItem(label="角色：")
        span.text {{myUserInfo.userRoles[0].roleName}}
      FormItem(label="手机：")
        span.text {{myUserInfo.userMobile}}
      FormItem(label="邮箱：")
        span.text {{myUserInfo.userEmail}}

  <!-- 修改密码 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerModifyPw",@on-close="closeDrawerModifyPw",title="修改密码",:mask-closable="maskClosable",@on-visible-change="drawerChange")
    comp-account-password-modify(:refresh="refresh",:userCode="myUserInfo.userCode")

  <!-- 修改信息 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerModifyInfo",@on-close="closeDrawerModifyInfo",title="修改信息",:mask-closable="maskClosable",@on-visible-change="drawerChange")
    comp-account-info-modify(:refresh="refresh",:userName="myUserInfo.userName",:userMobile="myUserInfo.userMobile",:userEmail="myUserInfo.userEmail",:userCode="myUserInfo.userCode", from="accountMy")

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '@/store/types'
import compAccountInfoModify from '@/components/compAccountInfoModify'
import compAccountPasswordModify from '@/components/compAccountPasswordModify'
export default {
  components: {
    compAccountPasswordModify,
    compAccountInfoModify
  },
  data () {
    return {
      refresh: false,
      showSpin: true,
      showCont: false,
      drawerModifyPw: false,
      drawerModifyInfo: false
    }
  },
  mounted () {
    this.showSpin = false
    setTimeout( () => {
      this.showCont = true
    }, 350 )
  },
  methods: {
    drawerChange () {
      if (this.drawerModifyPw || this.drawerModifyInfo) {
        this.refresh = true
      } else {
        this.refresh = false
      }
    },
    closeDrawerModifyPw () {

    },
    closeDrawerModifyInfo () {

    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      },
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
  },
  watch: {
    myUserInfo: {
      handler (newName, oldName) {
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.pageTitle .tR{
  float:right;
  font-size:12px;
}
.pageTitle .tR input{
  height:32px;
  line-height:32px;
  min-height:32px;
  margin-left:10px;
}
.pageTitle .tR .ivu-btn{
  margin-left:10px;
}
.accountInfo{
  padding:30px 60px;
}
.accountInfo .v{
  padding-top:13px;
}
.modifyInfo .trEmail .v{
  padding-top:13px;
}

</style>
