<template lang="pug">
  div(:status="leave")
    .search
      Input(placeholder="企业名称/客户ID",ref="queryInput",:value="value",v-if="refresh")
      Button(type="primary",@click="querySubmit",:loading="loadingBtn") 搜索
    Form(:label-width="150", v-show="showed")
      FormItem(label="企业名称：")
        span.text {{client}}
      FormItem(label="客户ID：")
        span.text {{clientId}}
      FormItem(label="预付款余额：")
        span.text {{balance}}
      FormItem(label="增加预付款金额：")
        Input(
          type="text",
          v-if="showed",
          name="money",
          style="width:240px",
          @on-blur="onBlur",
          @on-focus="onFocus",
          ref="money",
          :class="{ 'error': showError && showed }"
        )
        span.unit 元
        Alert(type="error",show-icon, style="display:inline-block",v-show="showError && show",ref="msgError") {{errorText}}
      FormItem(label="再次输入增加预付款：")
        Input(
          type="text",
          v-if="showed",
          name="remoney",
          style="width:240px",
          @on-blur="onBlur",
          @on-focus="onFocus",
          ref="remoney",
          :class="{ 'error': showError && showed }"
        )
        span.unit 元
        Alert(type="error",show-icon, style="display:inline-block",v-show="showError && show",ref="msgError") {{errorText}}
      FormItem(label="")
        Button(@click="close()") 取消
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
      loadingBtn: false,
      showed: false,
      showError: false,
      errorText: '',
      client: '',
      clientId: '',
      balance: '',
      value: ''
    }
  },
  methods: {
    submit () {
      this.$emit('refreshData')
    },
    close () {
      this.onClose();
    },
    querySubmit () {
      this.loadingBtn = true
      let vm = this
      let params = {
        param: {
          name: this.$refs.queryInput.value
        },
        callback: function (response) {
          vm.loadingBtn = false
          if( response.data.code === '1000' ){
            vm.client = response.data.data.list[0].name
            vm.clientId = response.data.data.list[0].orgCode
            vm.balance = response.data.data.list[0].contactor
            vm.showed = true
          } else {
            vm.showed = false
            if (response.data.code === '200') {
              vm.$Message.error('用户不存在')
            } else if (response.data.code === '300') {
              vm.$Message.error('用户被锁定')
            } else if (response.data.code === '400') {
              vm.$Message.error('原始密码错误')
            } else if (response.data.code === '500') {
              vm.$Message.error('参数错误或参数为空')
            } else if (response.data.code === '900') {
              vm.$Message.error('操作失败')
            }
          }
        }
      }
      this.queryClient(params)
    },
    onBlur () {

    },
    onFocus () {

    },
    ...mapActions({
      queryClient: types.QUERY_CLIENT
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