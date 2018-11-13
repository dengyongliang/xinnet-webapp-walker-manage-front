<template lang="pug">
  Form(:label-width="150")
    FormItem(label="产品：")
      comp-select(name="orderGoodsType",:list="orderGoodsTypeList",ref="orderGoodsType",defaultValue="3")
    FormItem(label="客户：")
      comp-select(name="customerId",:list="clientList",ref="customerId",label="客户")
    comp-input(name='domain',label="域名：",ref="domain")
    comp-input(name='money',label="金额：",ref="money")
      span.unit(slot="right") 元
    FormItem(label="订单类型：")
      comp-select(name="orderType",:list="orderTypeList",ref="orderType")
    FormItem(label="付款方式：")
      comp-radio(name="orderPayType",label="付款方式",:list="orderPayTypeList",ref="orderPayType")
    FormItem(label="")
      Button(type="primary",@click="submit",:loading="loadingBtn") 确定
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import compRadio from './compRadio'
import compSelect from './compSelect'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compRadio,
    compSelect
  },
  props: {
  },
  data () {
    return {
      loadingBtn: false,
      orderPayTypeList: [
        {
          label: '1',
          value: '信用消费'
        },
        {
          label: '2',
          value: '预付费消费'
        }
      ],
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
      let result = validateFormResult([
        this.$refs.customerId,
        this.$refs.domain,
        this.$refs.money,
        this.$refs.orderType,
        this.$refs.orderPayType
      ])
      if (!result) {
        this.loadingBtn = false
      } else {
        let vm = this
        let params = {
          param: {
            customerId: this.$refs.customerId.value,
            orderGoodsInfo: this.$refs.domain.value,
            orderMoney: this.$refs.money.value,
            orderType: this.$refs.orderType.value,
            orderPayType: this.$refs.orderPayType.value,
          },
          callback: function (response) {
            vm.loadingBtn = false
            if (response.data.code === '1000'){
              vm.$Message.success('录入成功')
              // 添加成功，重新加载列表数据
              vm.$emit('refreshData')
            } else {
              if (response.data.code === '100') {
                vm.$Message.error('客户不存在')
              } else if (response.data.code === '200') {
                vm.$Message.error('账号余额不足')
              } else if (response.data.code === '300') {
                vm.$Message.error('账号异常')
              } else if (response.data.code === '300') {
                vm.$Message.error('结算失败')
              } else {
                vm.$Message.error('录入失败')
              }
            }
          }
        }
        console.log(params.param)
        this.submitAddOrderEntry(params)
      }
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