<template lang="pug">
  #app
    Spin.spinBody(v-if="showBodySpin")
    router-view
</template>

<script>
import { mapState } from 'vuex'
import { emitter as restEmitter } from '@/global/axios'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
  },
  beforeMount () {
    restEmitter.on('noLogin', () => {
      this.$Message.error('登录超时，请重新登录！')
      setTimeout(() => {
        this.$router.replace({ path: '/login' })
      }, 300)
    })
    restEmitter.on('noPermission', () => {
      this.$Message.error('权限错误！')
      setTimeout(() => {
        this.$router.replace({ path: '/' })
      }, 300)
    })
    restEmitter.on('paramError', () => {
      this.$Message.error('参数错误！')
    })
    restEmitter.on('requestError', () => {
      this.$Message.error('请求失败！')
    })
    restEmitter.on('errorOther', () => {
      this.$Message.error('连接错误！')
    })
    restEmitter.on('errorServer', () => {
      this.$Message.error('连接到服务器失败！')
    })
  },
  methods: {
  },
  computed: {
    ...mapState([
      'showBodySpin'
    ])
  }
}
</script>

<style>
@import 'iview/dist/styles/iview.css';
@import 'assets/css/modal.css';
@import 'nprogress/nprogress.css';
@import 'assets/css/iconfont.css';
@import 'assets/css/xwNormalize.css';
@import 'assets/css/xwCommon.css';
#app{
  height:100%;
}
#nprogress .bar{
  z-index: 99999;
}
.spinBody{
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  text-align:center;
  z-index: 999;
  background:#fff;
}
.spinBody .ivu-spin-main{
  display:inline-block;
  line-height:200px;
}
.spinBody .ivu-spin-main .ivu-spin-dot{
  display:inline-block;
}
.ivu-btn{
  border-radius:0px;
}
.ivu-btn span{
  color:#2271f4;
}
.ivu-btn-primary .ivu-icon,
.ivu-btn-primary span{
  color:#fff;
}

.ivu-input-wrapper{
  margin-right:5px;
}
.ivu-input-wrapper .unit{
  margin-right:5px;
  display:inline-block;
}
.ivu-input{
  border-radius:0px;
  height:32px;
}
.ivu-input-wrapper.error .ivu-input{
  border:1px solid #f00;
}
.ivu-alert{
  margin-bottom:0px;
}
.ivu-form-item{
  margin-bottom:15px;
}
.ivu-form-item .ivu-alert-error{
  border:none;
  padding: 3px 10px 3px 20px;
  background:#fff;
}
.ivu-form-item .ivu-alert-error .ivu-alert-icon{
  top:3px;
  left:0px;
}
.ivu-form-item .ivu-alert-error .ivu-alert-icon i,
.ivu-form-item .ivu-alert-error .ivu-alert-message{
  color:#f00;
  vertical-align:middle;
  display:inline-block;
}
.ivu-table-wrapper{
  border:none;
}
.ivu-table th{
  background:#fff;
}
.ivu-table td.operate a{
  margin:0 3px;
}
.ivu-modal-content{
  border-radius:0px;
}
.ivu-modal .ivu-modal-header{
  border-bottom:none;
  text-align:center;
  padding-top:38px;
}
.ivu-modal .ivu-modal-header .ivu-modal-header-inner{
  font-size:16px!important;
  font-weight:200!important;
}
.ivu-modal .ivu-modal-footer{
  border-top:none;
  text-align:center;
  padding-top:20px;
  padding-bottom:40px;
}
.ivu-modal .ivu-modal-footer .ivu-btn{
  border-color:#cbcbcb;
  height:31px;
  line-height:31px;
  padding:0px 27px;
}
.ivu-modal .ivu-modal-footer .ivu-btn-primary{
  border-color:#2771f8;
  background:#2271f4;
}
.ivu-modal-confirm-footer .ivu-btn{
  height:31px;
  line-height:25px;
  padding:0px 27px;
}
.ivu-modal-confirm .ivu-icon{
  color:#f90;
}
.ivu-page{
  text-align:right;
  margin:0 20px 20px 20px;
}
.ivu-page,
.ivu-page *{
  font-size:12px!important;
}
.ivu-page .ivu-page-item,
.ivu-page .ivu-page-custom-text{
  border-color:#f6f8f9;
  background:none;
}
.ivu-page .ivu-page-item-active{
  background:#2271f4;
}
.ivu-page .ivu-page-item-active a{
  color:#fff;
}
.ivu-page .ivu-page-options-elevator input{
  text-align:center;
}
.ivu-drawer-body .ivu-form-item span.text{
  line-height:18px;
  display:inline-block;
  padding:7px 10px;
}
.ivu-drawer-header{
  background:#2271f4;
  height: 100px;
  line-height: 100px;
  vertical-align: middle;
  padding: 0 0 0 50px;
}
.ivu-drawer-header-inner{
  color:#fff;
  font-size: 18px;
  font-weight: 200;
  vertical-align: middle;
}
.ivu-drawer-body{
  height: calc(100% - 100px);
}
.ivu-drawer-close i{
  color:#fff!important;
}
.ivu-select-selection,
.ivu-select-dropdown{
  border-radius:0px;
}
.ivu-upload-select{
  background: #fff;
  border: 1px dashed #dcdee2;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color .2s ease;
}
.ivu-page-total{
  vertical-align:middle;
}
</style>
