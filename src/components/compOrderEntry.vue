<template lang="pug">
  Form(:label-width="150")
    FormItem(label="产品：")
      comp-select(name="orderGoodsType",:list="orderGoodsTypeList",ref="orderGoodsType",defaultValue="3")
    FormItem(label="客户：")
      comp-select(name="customerId",:list="clientList",ref="customerId",label="客户", :on-parentmethod="queryCompanysFun")
    comp-input(name='domain',label="域名：",ref="domain")
    comp-input(name='money',label="金额：",ref="money")
      span.unit(slot="right") 元
    FormItem(label="承担费用企业：")
      comp-select(name="companyId",:list="companysList",ref="companyId",label="承担费用企业", v-if="showCompany")
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
      clientList: [],
      companysList: [],
      showCompany: true
    }
  },
  methods: {
    submit () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.customerId,
        this.$refs.companyId,
        this.$refs.domain,
        this.$refs.money,
        this.$refs.orderType,
        this.$refs.orderPayType
      ])
      if (!result) {
        this.loadingBtn = false
      } else {
        let param = {
          customerId: this.$refs.customerId.value,
          companyId: this.$refs.companyId.value,
          orderGoodsInfo: this.$refs.domain.value,
          orderMoney: this.$refs.money.value,
          orderType: this.$refs.orderType.value,
          orderPayType: this.$refs.orderPayType.value
        }
        this.$store.dispatch('ORDER_ENTRY', param).then((response) => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success('录入成功')
            // 添加成功，重新加载列表数据
            this.$emit('refreshData')
          } else {
            if (response.data.code === '100') {
              this.$Message.error('客户不存在')
            } else if (response.data.code === '200') {
              this.$Message.error('账号余额不足')
            } else if (response.data.code === '300') {
              this.$Message.error('账号异常')
            } else if (response.data.code === '300') {
              this.$Message.error('结算失败')
            }
          }
        }).catch(() => {})
      }
    },
    queryCompanysFun (obj) {
      this.showCompany = false
      let params = {
        customerId: obj.value
      }
      this.$store.dispatch('QUERY_COMPANYS', params).then((response) => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          let data = response.data.data
          this.showCompany = true
          if (data.length > 0) {
            this.companysList = data.map(function (value, index, array) {
              return {value: value.id, label: value.name}
            })
          }
        } else {
          this.$Message.error('客户可用企业列表查询失败')
        }
      }).catch(() => {})
    }
  },
  computed: {
  },
  beforeMount () {
    this.$store.dispatch('FIND_CUSTOMER_LIST').then((response) => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        let data = response.data.data.list
        if (data.length > 0) {
          this.clientList = data.map(function (value, index, array) {
            return {value: value.id, label: value.name}
          })
        }
      } else {
        this.$Message.error('客户查询失败')
      }
    }).catch(() => {})
  },
  watch: {
  }
}
</script>
