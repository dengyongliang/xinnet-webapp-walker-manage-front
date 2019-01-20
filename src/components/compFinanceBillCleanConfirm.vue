<template lang="pug">
  Form(:label-width="150")
    FormItem(label="客户：")
      span.text {{customerName}}
    FormItem(label="账单金额：")
      span.text {{totalMoney}}
    FormItem(label="结算周期：")
      span.text {{thisCycle}}
    FormItem(label="预付款余额：")
      span.text {{payBalance}}
    FormItem(label="")
      Button(type="primary",@click="billSubmit",:loading="loadingBtn") 确定结算
    input(type="hidden", :value="id",ref="id")
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
export default {
  components: {
  },
  props: {
    customerName: {
      type: String,
      default: ''
    },
    totalMoney: {
      default: ''
    },
    thisCycle: {
      type: String,
      default: ''
    },
    payBalance: {
      default: ''
    },
    id: {
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
      let params = {
        param: {
          id: this.$refs.id.value
        },
        callback: (response) => {
          this.loadingBtn = false
          if (response.data.code === '1000') {
            this.$Message.success('结算确认成功')
            // 添加成功，重新加载列表数据
            this.$emit('refreshData')
          } else {
            if (response.data.code === '100') {
              this.$Message.error('客户不存在')
            } else if (response.data.code === '200') {
              this.$Message.error('账号余额不足')
            } else if (response.data.code === '300') {
              this.$Message.error('账号异常')
            } else if (response.data.code === '400') {
              this.$Message.error('结算失败')
            } else if (response.data.code === '600') {
              this.$Message.error('账单已结算')
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
