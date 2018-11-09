<template lang="pug">
  Form(:label-width="150")
    FormItem(label="产品：")
      Select(v-model="param.orderGoodsType",style="width:240px")
        Option(v-for="item in orderGoodsTypeList",:value="item.value",:key="item.value") {{ item.label }}
    FormItem(label="客户：")
      Select(v-model="param.customerId",style="width:240px",name="customerId",@on-change="selectChange")
        Option(v-for="item in clientList",:value="item.value",:key="item.value") {{ item.label }}
      Alert(type="error",show-icon, style="display:inline-block",v-if="error.customerId.show") {{error.customerId.text}}
    comp-input(name='domain',label="域名：",ref="domain")
    comp-input(name='money',label="金额：",ref="money")
      span.unit(slot="right") 元
    FormItem(label="订单类型：")
      Select(v-model="param.orderType",style="width:240px")
        Option(v-for="item in orderTypeList",:value="item.value",:key="item.value") {{ item.label }}
    FormItem(label="付款方式：")
      RadioGroup(v-model="param.orderPayType",@on-change="radioChange")
        Radio(label="2") 预付费消费
        Radio(label="1") 信用消费
      Alert(type="error",show-icon, style="display:inline-block",v-if="error.orderPayType.show") {{error.orderPayType.text}}
    FormItem(label="")
      Button(type="primary",@click="submit",:loading="loadingBtn") 确定
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
      error: {
        customerId: {
          show: false,
          text: ''
        },
        orderPayType: {
          show: false,
          text: ''
        }
      },
      param: {
        orderGoodsType: '3',
        customerId: '',
        orderGoodsInfo: '',
        orderPayType: '',
        orderType: '1'
      },
      orderGoodsTypeList: [
        {
          value: '3',
          label: '域名回购'
        }
      ],
      orderTypeList: [
        {
            value: '1',
            label: '新开'
        }
      ],
      clientList: []
    }
  },
  methods: {
    submit () {
      this.loadingBtn = true
      let domainV = this.$refs.domain.$refs.input.$refs.input.value
      let moneyV = this.$refs.money.$refs.input.$refs.input.value
      if (this.param.customerId === ''){
        this.error.customerId.show = true
        this.error.customerId.text = '请选择客户！'
        this.loadingBtn = false
        return false
      }
      if (domainV === '') {
        this.$refs.domain.$refs.input.focus()
        this.$refs.domain.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (moneyV === '') {
        this.$refs.money.$refs.input.focus()
        this.$refs.money.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (this.param.orderPayType === ''){
        this.error.orderPayType.show = true
        this.error.orderPayType.text = '请选择付款方式！'
        this.loadingBtn = false
        return false
      }
      let vm = this
      let params = {
        param: {
          customerId: this.param.customerId,
          orderGoodsInfo: domainV,
          orderMoney: moneyV,
          orderType: this.param.orderType,
          orderPayType: this.param.orderPayType
        },
        callback: function (response) {
          if (response.data.code === '1000'){
            vm.loadingBtn = false
            vm.$Message.success('录入成功')
            // 添加成功，重新加载列表数据
            vm.$emit('refreshData')
          } else {
            vm.loadingBtn = false
            if (response.data.code === '100') {
              vm.$Message.error('客户不存在')
            } else if (response.data.code === '200') {
              vm.$Message.error('账号余额不足')
            } else if (response.data.code === '300') {
              vm.$Message.error('账号异常')
            } else if (response.data.code === '300') {
              vm.$Message.error('结算失败')
            }
          }
        }
      }
      console.log(params.param)
      this.submitAddOrderEntry(params)
    },
    radioChange () {
      this.error.orderPayType.show = false
    },
    selectChange () {
      this.error.customerId.show = false
    },
    ...mapActions({
      submitAddOrderEntry: types.SUBMIT_ADD_ORDER_ENTRY,
      queryClientList: types.QUERY_CLIENT_LIST
    })
  },
  computed: {
  },
  beforeMount () {
    let vm = this
    let params = {
      param: {},
      callback: function (response) {
        if (response.data.code === '1000'){
          let data = response.data.data.list
          if (data.length > 0) {
            vm.clientList = data.map(function (value, index, array) {
              return {value: value.id, label: value.name}
            })
          }
        } else {
          vm.$Message.error('客户查询失败')
        }
      }
    }
    this.queryClientList(params)
  },
  watch: {
  }
}
</script>