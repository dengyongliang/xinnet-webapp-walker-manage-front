<template lang="pug">
  div
    .search
      Input(placeholder="企业名称/客户ID",ref="queryInput",v-model="customerCode")
      Button(type="primary",@click="querySubmit",:loading="loadingBtn") 搜索
    Form(:label-width="150", v-show="showed")
      FormItem(label="企业名称：")
        span.text {{customerName}}
      FormItem(label="客户ID：")
        span.text {{customerId}}
        input(type="hidden",:value="customerId", ref="customerId")
      FormItem(label="预付款余额：")
        span.text {{payBalance}} 元
      FormItem(label="增加预付款金额：")
        Input(
          type="text",
          name="money",
          style="width:240px",
          @on-blur="onBlur",
          @on-focus="onFocus",
          ref="money",
          :value = "value",
          :class="{ 'error': showErrorMoney }"
        )
        span.unit 元
        Alert(type="error",show-icon, style="display:inline-block",v-show="showErrorMoney",ref="msgErrorMoney") {{errorTextMoney}}
      FormItem(label="再次输入增加预付款：")
        Input(
          type="text",
          name="remoney",
          style="width:240px",
          @on-blur="onBlur",
          @on-focus="onFocus",
          ref="remoney",
          :value = "value",
          :class="{ 'error': showErrorReMoney }"
        )
        span.unit 元
        Alert(type="error",show-icon, style="display:inline-block",v-show="showErrorReMoney",ref="msgErrorReMoney") {{errorTextReMoney}}
      FormItem(label="")
        <!-- Button(@click="close()") 取消 -->
        Button(type="primary",@click="submit",:loading="loadingBtn") 确定
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
export default {
  components: {
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
      customerCode: '',
      loadingBtn: false,
      showed: false,
      showErrorMoney: false,
      showErrorReMoney: false,
      errorTextMoney: '',
      errorTextReMoney: '',
      customerName: '',
      customerId: '',
      payBalance: '',
      value: ''
    }
  },
  methods: {
    submit () {
      this.loadingBtn = true
      let money = this.$refs.money.$refs.input.value
      let remoney = this.$refs.remoney.$refs.input.value
      if (money === '') {
        this.loadingBtn = false
        this.showErrorMoney = true
        this.errorTextMoney = '请输入金额！'
        this.$refs.money.focus()
        this.$refs.money.blur()
        return false
      }
      if (remoney === '') {
        this.loadingBtn = false
        this.showErrorReMoney = true
        this.errorTextReMoney = '请再次输入金额！'
        this.$refs.remoney.focus()
        this.$refs.remoney.blur()
        return false
      }
      if (remoney !== money) {
        this.loadingBtn = false
        this.showErrorReMoney = true
        this.errorTextReMoney = '输入金额不一致！'
        this.$refs.remoney.focus()
        this.$refs.remoney.blur()
        return false
      }

      let vm = this
      let params = {
        param: {
          customerId: this.$refs.customerId.value,
          payMoney: this.$refs.money.$refs.input.value
        },
        callback: function (response) {
          vm.loadingBtn = false
          if( response.data.code === '1000' ){
            vm.$Message.success('预付款修改成功！')
            vm.$emit('refreshData')
          } else {
            if (response.data.code === '100') {
              vm.$Message.error('客户账号异常！')
            } else if (response.data.code === '400') {
              vm.$Message.error('结算失败！')
            } else {
              vm.$Message.success('预付款修改失败！')
            }
          }
        }
      }
      this.submitAddPayment(params)
    },
    close () {
      this.onClose();
    },
    querySubmit () {
      this.loadingBtn = true
      let vm = this
      let params = {
        param: {
          customerCode: this.customerCode
        },
        callback: function (response) {
          vm.loadingBtn = false
          if( response.data.code === '1000' ){
            if (response.data.data !== null ) {
              vm.customerId = response.data.data.id
              vm.customerName = response.data.data.name
              vm.payBalance = response.data.data.payBalance
              vm.showed = true
              vm.showErrorMoney = false
              vm.showErrorReMoney = false
            } else {
              vm.$Message.error('查询不到指定信息')
            }
          } else {
            vm.showed = false
            vm.$Message.error('查询失败')
          }
        }
      }
      this.queryClient(params)
    },
    onBlur (e) {
      let val = e.target.value
      let name = e.target.name
      if (name === 'money') {
        if (val === '') {
          this.showErrorMoney = true
          this.errorTextMoney = '请输入金额！'
        }
      }
      if (name === 'remoney') {
        if (val === '') {
          this.showErrorReMoney = true
          this.errorTextReMoney = '请再次输入金额！'
        }
        if (val !== '' && this.$refs.money.$refs.input.value !== val) {
          this.showErrorReMoney = true
          this.errorTextReMoney = '输入金额不一致！'
        }
      }
    },
    onFocus (e) {
      let val = e.target.value
      let name = e.target.name
      if (name === 'money') {
        this.errorTextMoney = '',
        this.showErrorMoney = false
      } else if (name === 'remoney'){
        this.errorTextReMoney = '',
        this.showErrorReMoney = false
      }
    },
    ...mapActions({
      queryClient: types.QUERY_CLIENT,
      submitAddPayment: types.SUBMIT_ADD_PAYMENT
    })
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