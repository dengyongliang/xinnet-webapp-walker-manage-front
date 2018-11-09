<template lang="pug">
.contBillClean
  <!-- 标题区 -->
  h1.pageTitle.clear 账单结算
    .tR
      Input(style="width:200px",placeholder="企业名称/客户ID",v-model.trim="searchUserId")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 搜索

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="billList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 确认结算 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerBillConfirm",title="账单结算确认",:mask-closable="maskClosable")
    comp-finance-bill-clean-confirm(
      @refreshData="searchListData",
      :customerName = "customerName",
      :totalMoney = "totalMoney",
      :thisCycle = "thisCycle",
      :payBalance = "payBalance",
      :id = "id"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compFinanceBillCleanConfirm from '@/components/compFinanceBillCleanConfirm'
export default {
  components: {
    compFinanceBillCleanConfirm
  },
  data () {
    return {
      searchUserId: '',
      columns: [
        {
          title: '企业名称',
          key: 'customerName',
          className: 'col1'
        },
        {
          title: '客户ID',
          key: 'customerCode',
          className: 'col2'
        },
        {
          title: '金额',
          key: 'totalMoney',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.billList[params.index].totalMoney + ' 元')
            ])
          }
        },
        {
          title: '结算周期',
          key: 'thisCycle',
          className: 'col4'
        },
        {
          title: '最晚付款时间',
          key: 'checkBillDate',
          className: 'col5'
        },
        {
          title: '结算时间',
          key: 'payBillDate',
          className: 'col6'
        },
        {
          title: '预付款余额',
          key: 'payBalance',
          className: 'col7',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.billList[params.index].payBalance + ' 元')
            ])
          }
        },
        {
          title: '状态',
          key: 'status',
          className: 'col8',
          render: (h, params) => {
            if (this.billList[params.index].status === 1) {
              return h('div', [
                h('span', {}, '待结款')
              ])
            }
            if (this.billList[params.index].status === 2) {
              return h('div', [
                h('span', {}, '已结款')
              ])
            }
            if (this.billList[params.index].status === 3) {
              return h('div', [
                h('span', {}, '已逾期')
              ])
            }
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            if (this.billList[params.index].status === 1) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      let param = {
                        customerName: this.billList[params.index].customerName,
                        totalMoney: this.billList[params.index].totalMoney,
                        thisCycle: this.billList[params.index].thisCycle,
                        payBalance: this.billList[params.index].payBalance,
                        id: this.billList[params.index].id
                      }
                      this.showDrawerBillConfirm(param)
                    }
                  }
                }, '结算')
              ])
            }
          }
        }
      ],
      billList: [],
      loadingTable: true,
      loadingBtn: false,
      drawerBillConfirm: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      customerName: '',
      totalMoney: '',
      thisCycle: '',
      payBalance: '',
      id: ''
    }
  },
  methods: {
    searchListData () {
      // 关闭 drawer弹出层
      this.drawerBillConfirm = false
      // 查询数据
      this.getBillList(this.getBillListParam({pageNum: 1,userId: this.searchUserId}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.getBillList(this.getBillListParam({pageNum: curPage,userId: this.searchUserId}))
    },
    showDrawerBillConfirm (param) {
      // 重置数据
      this.customerName = param.customerName
      this.totalMoney = param.totalMoney
      this.thisCycle = param.thisCycle
      this.payBalance = param.payBalance
      this.id = param.id
      // 显示结算界面
      this.drawerBillConfirm = true
    },
    getBillListParam (obj) {
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
            vm.billList = response.data.data.list
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
      getBillList: types.GET_BILL_LIST
    })
  },
  computed: {
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {
    this.getBillList(this.getBillListParam({pageNum: 1,userId: this.searchUserId}))
  }
}
</script>

<style scoped>
.pageTitle .tR{
  float:right;
  font-size:12px;
}
.pageTitle .tR input{
  height:32px;
  line-height:32px;
  min-height:32px;
  margin-left:10px;
}
.pageTitle .tR .xwBtn{
  height:32px;
  line-height:32px;
  min-height:32px;
  font-size:12px;
  margin-left:10px;
}
.secMain{
  padding-top:0px;
}
</style>
