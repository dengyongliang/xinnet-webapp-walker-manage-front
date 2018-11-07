<template lang="pug">
  .frameTop.clear
    .logo
      img(src="../../static/img/logo.png")
      span 后台管理
    .userInfo
      router-link(class="userName",to="/account/my") {{myUserInfo.userName}}
      a(href="javascript:;", @click="logout", class="exit") 退出
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      }
    })
  },
  methods: {
    logout () {
      let vm = this
      let params = {
        callback: function (response) {
          if( response.data.code === '1000' ){
            vm.$Message.success('登出成功')
            vm.$router.replace({ path: '/login' })
          } else {
          }
        }
      }
      this.loginOut(params)
    },
    ...mapActions({
      loginOut: types.LOGIN_OUT
    })
  },

  beforeMount () {
  }
}
</script>

<style scoped>
.frameTop{
  width: 100%;
  height: 50px;
  position:fixed;
  left:0px;
  top:0px;
  background: #2e3254;
  line-height: 50px;
  vertical-align: middle;
  z-index: 999;
}
.frameTop .logo{
    display: inline-block;
}
.frameTop .logo img{
  padding-left: 20px;
}
.frameTop .logo span{
  font-size: 14px;
  color: #fff;
  margin-left: 20px;
}
.frameTop .userInfo{
  float: right;
  color:#ccc;
  font-size: 12px;
  padding-right: 30px;
}
.frameTop .userInfo .userName{
  color:#fff;
}
.frameTop .userInfo .exit{
  color:#fff;
  border-left: solid 1px #434765;
  padding-left: 20px;
  margin-left: 20px;
}
</style>