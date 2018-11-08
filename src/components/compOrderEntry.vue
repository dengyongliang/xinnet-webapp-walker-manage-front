<template lang="pug">
  Form(:label-width="150", :status="leave")
    FormItem(label="产品：")
      Select(v-model="orderMethod")
        Option(v-for="item in orderMethodList",:value="item.value",:key="item.value") {{ item.label }}
    FormItem(label="客户：")
      Select(v-model="orderMethod")
        Option(v-for="item in orderMethodList",:value="item.value",:key="item.value") {{ item.label }}
    comp-input(name='userName',label="域名：",:show="refresh",ref="userName",defaultValue="")
    comp-input(name='userName',label="金额：",:show="refresh",ref="userName",defaultValue="")
      span.unit(slot="right") 元
    FormItem(label="订单类型：")
      Select(v-model="orderMethod")
        Option(v-for="item in orderMethodList",:value="item.value",:key="item.value") {{ item.label }}
    FormItem(label="付款方式：")
      <RadioGroup v-model="payMethod">
          <Radio label="金斑蝶"></Radio>
          <Radio label="爪哇犀牛"></Radio>
          <Radio label="印度黑羚"></Radio>
      </RadioGroup>
    FormItem(label="")
      Button(type="primary",@click="billSubmit",:loading="loadingBtn") 确定
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
export default {
  components: {
    compInput
  },
  props: {
    refresh: {
      type: Boolean,
      default: 'false'
    }
  },
  data () {
    return {
      loadingBtn: false,
      payMethod: '',
      orderMethod: '',
      orderMethodList: [
        {
            value: '',
            label: '全部'
        },
        {
            value: '用户下单v',
            label: '用户下单'
        },
        {
            value: '系统下单v',
            label: '系统下单'
        },
        {
            value: '线下下单v',
            label: '线下下单'
        }
      ]
    }
  },
  methods: {
    billSubmit () {
      this.loadingBtn = true

      let vm = this
      let params = {
        param: {
          id: this.$refs.id.value
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
    leave () {
      if (!this.refresh) {
        this.orderMethod = ''
      }
    }
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>