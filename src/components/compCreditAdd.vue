<template lang="pug">
  div
    .search
      Input(placeholder="企业名称/客户ID",ref="queryInput",v-model="customerCode")
      Button(type="primary",@click="querySubmit",:loading="loadingBtn") 搜索
    Form(:label-width="150", v-if="showed")
      FormItem(label="企业名称：")
        span.text {{customerName}}
      FormItem(label="客户ID：")
        span.text {{customerCode}}
        input(type="hidden",:value="customerId", ref="customerId")
      FormItem(label="当前信誉额度：")
        span.text 0.00元
      comp-re-money(
        label1="信用额度：",
        label2="再次输入信用额度：",
        ref="reMoney"
      )
        span.unit(slot="right1") 元
        span.unit(slot="right2") 元
      FormItem(label="")
        Button(type="primary",@click="submit",:loading="loadingBtn") 确定
</template>

<script>
import compReMoney from './compReMoney'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compReMoney
  },
  props: {
    refresh: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function
    }
  },
  data () {
    return {
      value: '',
      loadingBtn: false,
      creditMoney: '',
      showed: false,
      customerId: '',
      customerCode: '',
      customerName: ''
    }
  },
  methods: {
    submit () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.reMoney
      ])
      if (result) {
        let params = {
          customerId: this.$refs.customerId.value,
          creditMoney: this.$refs.reMoney.value1
        }
        this.$store.dispatch('ADD_CREDIT_MONEY', params).then((response) => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success('额度修改成功！')
            this.$emit('refreshData')
          } else {
            if (response.data.code === '100') {
              this.$Message.error('客户账号异常')
            } else if (response.data.code === '400') {
              this.$Message.error('结算失败')
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    },
    close () {
      this.onClose()
    },
    querySubmit () {
      this.loadingBtn = true
      this.$store.dispatch('FIND_CUSTOMER', {customerCode: this.customerCode}).then((response) => {
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          if (response.data.data !== null) {
            this.customerId = response.data.data.id
            this.customerCode = response.data.data.code
            this.customerName = response.data.data.name
            this.showed = true
          } else {
            this.$Message.error('查询不到指定信息')
          }
        } else {
          this.showed = false
          this.$Message.error('查询失败')
        }
      }).catch(() => {})
    }
  },
  computed: {
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>

<style scoped>
.search{
  padding:0 20px;
  margin-bottom:20px;
}
.search .ivu-input-wrapper{
  width:500px;
}
</style>
