<template lang="pug">
.contPaymentAdd
  <!-- 标题区 -->
  h1.pageTitle.clear 预付款增加管理
    .tR
      Input(style="width:200px",placeholder="企业名称/客户ID",v-model.trim="searchUserId")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 搜索
      Button(@click="drawerPaymentAdd=true") + 预付款增加

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="paymentList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 预付款增加 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerPaymentAdd",title="预付款增加",:mask-closable="maskClosable",@on-visible-change="drawerChange",)
    comp-payment-add(
      @refreshData="searchListData",
      :on-close="closeDrawer",
      v-if = "refresh"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compPaymentAdd from '@/components/compPaymentAdd'
export default {
  components: {
    compPaymentAdd
  },
  data () {
    return {
      refresh: false,
      searchUserId: '',
      columns: [
        {
          title: '录款时间',
          key: 'flowTime',
          className: 'tdDate'
        },
        {
          title: '企业名称',
          key: 'customerName',
          className: 'col2'
        },
        {
          title: '客户ID',
          key: 'customerCode',
          className: 'col3'
        },
        {
          title: '增加金额',
          key: 'flowMoney',
          className: 'col4',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.paymentList[params.index].flowMoney + ' 元')
            ])
          }
        },
        {
          title: '操作人',
          key: 'userName',
          className: 'col5'
        }
      ],
      paymentList: [],
      loadingTable: true,
      loadingBtn: false,
      drawerPaymentAdd: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    closeDrawer (message) {
      this.drawerPaymentAdd = false
    },
    searchListData () {
      // 关闭 drawer弹出层
      this.drawerPaymentAdd = false
      // 查询数据
      this.getPaymentList(this.getPaymentListParam({pageNum: 1,userId: this.searchUserId}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.getPaymentList(this.getPaymentListParam({pageNum: curPage,userId: this.searchUserId}))
    },
    drawerChange () {
      if (this.drawerPaymentAdd) {
        this.refresh = true
      } else {
        this.refresh = false
      }
    },
    showDrawerBillConfirm (param) {
      // 重置数据
      this.client = param.client
      this.money = param.money
      this.cycle = param.cycle
      this.balance = param.balance
      // 显示结算界面
      this.drawerBillConfirm = true
    },
    getPaymentListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true
      let vm = this
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          userId:obj.userId
        },
        callback: function(response){
          vm.loadingBtn = false
          vm.loadingTable = false
          // console.log(response)
          if (response.data.code === '1000'){
            vm.paymentList = response.data.data.list
            vm.page.pageItems = response.data.data.totalNum
          } else {
            if (response.data.code === '900') {
              vm.$Message.error('查询失败')
            }
          }
        }
      }
      return params
    },
    ...mapActions({
      getPaymentList: types.GET_PAYMENT_LIST
    })
  },
  computed: {
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {
    this.getPaymentList(this.getPaymentListParam({pageNum: 1,userId: this.searchUserId}))
  }
}
</script>

<style scoped>
.secMain{
  padding-top:0px;
}
</style>
