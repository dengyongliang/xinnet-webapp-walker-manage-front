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
import { mapState } from 'vuex'
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
    // 获取账号信息
    this.$store.dispatch('MY_USER_INFO').then((response) => {}).catch(() => {})
  },
  methods: {
  },
  computed: {
    ...mapState([
      'islogin'
    ])
  }
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
