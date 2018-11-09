<template lang="pug">
  .pageMain
    header-body(v-if="islogin")

    .frameBottom(v-if="islogin")
      .frameMenu
        menu-body
      .frameBody
        router-view
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '../store/types'
import { emitter as restEmitter } from '../global/rest'
import menuBody from '../modular/menu'
import headerBody from '../modular/header'
export default {
  name: 'MAIN_BODY',
  components: {
    menuBody,
    headerBody
  },
  data () {
    return {
      spinShow: true
    }
  },
  mounted () {
  },
  beforeMount () {
    let vm = this
    // 获取账号信息
    this.getCurrentUser()
    restEmitter.on('noLogin', () => {
      vm.$Message.error('登录超时，请重新登录！')
      setTimeout(() => {
        vm.$router.replace({ path: '/login' })
      },300)
    })
    restEmitter.on('noPermission', () => {
      vm.$Message.error('权限错误！')
      setTimeout(() => {
        vm.$router.replace({ path: '/' })
      },300)
    })
    restEmitter.on('paramError', () => {
      vm.$Message.error('参数错误！')
    })
    restEmitter.on('requestError', () => {
      vm.$Message.error('请求失败！')
    })
    restEmitter.on('errorOther', () => {
      vm.$Message.error('连接错误！')
    })
    restEmitter.on('errorServer', () => {
      vm.$Message.error('连接到服务器失败！')
    })
  },
  methods: {
    ...mapActions({
      getCurrentUser: types.GET_CURRENT_USER_DATA
    })
  },
  computed: {
    ...mapState([
      'pending',
      'islogin',
      'showBodySpin'
    ])
  },
}
</script>

<style scoped>
.pageMain{
  height:100%;
}

.frameBottom{
  width:100%;
  background:#f6f8f9;
  min-height:100%;
}
.frameBottom .frameMenu{
  width:220px;
  min-height:100%;
  background:#f6f8f9;
  position:fixed;
  top:0px;
  left:0px;
  border-right:1px solid #ecedef;
}

.frameBottom .frameBody{
  min-height:300px;
  margin-left: 220px;
  padding-top: 70px;
}

</style>
