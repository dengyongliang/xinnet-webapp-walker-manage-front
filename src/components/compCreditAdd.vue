<template lang="pug">
  div(:status="leave")
    .search
      Input(placeholder="企业名称/客户ID",ref="queryInput",:value="value",v-if="refresh")
      Button(type="primary",@click="querySubmit",:loading="loadingBtn") 搜索
    Form(:label-width="150", v-if="refresh && showed")
      FormItem(label="企业名称：")
        span.text {{customerName}}
      FormItem(label="客户ID：")
        span.text {{customerId}}
        input(type="hidden",:value="customerId", ref="customerId")
      comp-input(name='creditMoney',label="信用额度：",:show="refresh",ref="creditMoney",:defaultValue="creditMoney")

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
          creditMoney: this.$refs.creditMoney.$refs.input.value
        },
        callback: function (response) {
          vm.loadingBtn = false
          if( response.data.code === '1000' ){
            vm.$Message.success('额度修改成功！')
            vm.$emit('refreshData')
          } else {
            vm.$Message.error('额度修改失败！')
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
          customerCode: this.$refs.queryInput.value
        },
        callback: function (response) {
          vm.loadingBtn = false
          if( response.data.code === '1000' ){
            vm.customerId = response.data.data.code
            vm.customerName = response.data.data.name
            vm.showed = true
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
    leave () {
      if (this.refresh) {
        this.showed = false
        return false
      } else {
        return false
      }
    }
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