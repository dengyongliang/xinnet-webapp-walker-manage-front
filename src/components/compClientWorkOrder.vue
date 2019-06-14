<template lang="pug">
  Form(:label-width="150") 
    FormItem(label="状态：")
      span.text(v-if="obj.status===1") 待处理
      span.text(v-if="obj.status===2") 处理中
      span.text(v-if="obj.status===3") 已完成
    FormItem(label="问题类型：")
      span.text(v-if="obj.questionType===1") 委托注册
      span.text(v-if="obj.questionType===2") 域名回购
      span.text(v-if="obj.questionType===3") 安全问题
      span.text(v-if="obj.questionType===4") 财务问题
      span.text(v-if="obj.questionType===5") 托管域名信息修改及续费
      span.text(v-if="obj.questionType===6") 域名赎回
      span.text(v-if="obj.questionType===7") 注册局锁
      span.text(v-if="obj.questionType===8") 其它问题
    FormItem(label="域名：")
      span.text {{obj.domainName}} 
    FormItem(v-show="obj.questionType===2")(label="预算：")
      span.text {{obj.money}}
    FormItem(v-show="obj.questionType===5")(label="修改类型：")
      span.text(v-if="obj.updateType===1") 续费
      span.text(v-if="obj.updateType===2") 解析设置
      span.text(v-if="obj.updateType===3") 修改DNS
      span.text(v-if="obj.updateType===4") 修改域名信息
      span.text(v-if="obj.updateType===5") 过户
      span.text(v-if="obj.updateType===6") 其它
    FormItem(v-show="obj.questionType===3")(label="安全问题类型：")
      span.text(v-if="obj.securityType===1") 域名解析被篡改
      span.text(v-if="obj.securityType===2") 账号登录异常
      span.text(v-if="obj.securityType===3") 域名过期未续费
      span.text(v-if="obj.securityType===4") 其他
    FormItem(v-show="obj.questionType===4")(label="订单编号：")
      span.text {{obj.orderCode}}
    FormItem(label="问题描述：")
      span.text {{obj.description}}
    FormItem(v-show="obj.status===1")(label="")
      Button(type="primary",@click="btnSubmit('todo')",:loading="loadingBtn") 设为处理中
    FormItem(v-show="obj.status===2")(label="")
      Button(type="primary",@click="btnSubmit('tocomplate')",:loading="loadingBtn") 设为已完成
</template>
<script>
export default {
  components: {
  },
  props: {
    obj: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    selectChange () {
    },
    btnSubmit(type) {
      this.loadingBtn = true
      let op = 1;
      if (type === 'todo') {
        op = 2;
      } else {
        op = 3;
      }
      let params = {
          id: this.obj.id,
          status: op
      }
      this.$store.dispatch('WORK_ORDER_UPDATE', params).then((response) => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('设置成功！')
              // 刷新呢列表
              this.$emit('refreshData')
            } else {
              this.$Message.error('设置失败！')
            }
          }).catch(() => {})
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped>
.stopStartClient{
  color:#2d8cf0;
  display:inline-block;
  margin-left:10px;
}
</style>
