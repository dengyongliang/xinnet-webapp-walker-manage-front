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
import { mapState } from 'vuex'
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
      this.queryList(1)
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryList(curPage)
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
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true
      let param = {
        pageNum: obj.pageNum,
        pageSize: 20,
        userId: this.searchUserId
      }
      return param
    },
    queryList (curPage) {
      this.$store.dispatch('CUSTOMER_BILL_LIST', this.queryListParam({pageNum: curPage})).then((response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        // console.log(response)
        if (response.data.code === '1000') {
          this.billList = response.data.data.list
          this.page.pageItems = response.data.data.totalNum
        } else {
          if (response.data.code === '900') {
            this.$Message.error('查询失败')
          }
        }
      }).catch(() => {})
    }
  },
  computed: {
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {
    this.queryList(1)
  }
}
</script>

<style scoped>
.secMain{
  padding-top:0px;
}
</style>
