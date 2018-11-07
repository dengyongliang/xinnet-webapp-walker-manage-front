<template lang="pug">
  Form(:label-width="150")
    FormItem(label="客户：")
      span.text {{client}}
    FormItem(label="账单金额：")
      span.text {{money}}
    FormItem(label="结算周期：")
      span.text {{cycle}}
    FormItem(label="预付款余额：")
      span.text {{balance}}
    FormItem(label="")
      Button(type="primary",@click="billSubmit",:loading="loadingBtn") 确定结算
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
export default {
  components: {
  },
  props: {
    client: {
      type: String,
      default: ''
    },
    money: {
      type: String,
      default: ''
    },
    cycle: {
      type: String,
      default: ''
    },
    balance: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    billSubmit () {
      this.loadingBtn = true

      let vm = this
      let params = {
        param: {

        },
        callback: function (response) {
          if (response.data.code === '1000'){
            vm.loadingBtn = false
            vm.$Message.success('结算确认成功')
            // 添加成功，重新加载列表数据
            vm.$emit('refreshData')
          } else {
            if (response.data.code === '900') {
              vm.$Message.error('结算确认失败')
            }
          }
        }
      }
      this.confirmBillClean(params)
    },
    ...mapActions({
      confirmBillClean: types.CONFIRM_BILL_CLEAN
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