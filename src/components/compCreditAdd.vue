<template lang="pug">
  div
    .search
      Input(placeholder="企业名称/客户ID",ref="queryInput",v-model="customerCode")
      Button(type="primary",@click="querySubmit",:loading="loadingBtn") 搜索
    Form(:label-width="150", v-if="showed")
      FormItem(label="企业名称：")
        span.text {{customerName}}
      FormItem(label="客户ID：")
        span.text {{customerId}}
        input(type="hidden",:value="customerId", ref="customerId")
      comp-input(name='creditMoney',label="信用额度：",ref="creditMoney",:defaultValue="creditMoney")

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
      customerName: ''
    }
  },
  methods: {
    submit () {
      this.loadingBtn = true
      let vm = this
      let params = {
        param: {
          customerId: this.$refs.customerId.value,
          creditMoney: this.$refs.creditMoney.$refs.input.$refs.input.value
        },
        callback: function (response) {
          vm.loadingBtn = false
          if( response.data.code === '1000' ){
            vm.$Message.success('额度修改成功！')
            vm.$emit('refreshData')
          } else {
            if (response.data.code === '100') {
              vm.$Message.error('客户账号异常')
            } else if (response.data.code === '400') {
              vm.$Message.error('结算失败')
            } else {
              vm.$Message.error('额度修改失败！')
            }            
          }
        }
      }
      this.submitAddCredit(params)
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
              vm.showed = true
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
    ...mapActions({
      queryClient: types.QUERY_CLIENT,
      submitAddCredit: types.SUBMIT_ADD_CREDIT
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