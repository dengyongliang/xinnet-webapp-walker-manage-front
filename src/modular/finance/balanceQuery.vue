<template lang="pug">
.contPaymentQuery
  <!-- 标题区 -->
  h1.pageTitle.clear 客户账户余额查询
    .tR
      Input(style="width:200px",placeholder="企业名称/客户ID",v-model.trim="searchUserId")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 搜索

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="balanceList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
export default {
  components: {
  },
  data () {
    return {
      drawerTitle: '',
      searchUserId: '',
      status: '',
      columns: [
        {
          title: '企业名称',
          key: 'name',
          className: 'col1'
        },
        {
          title: '客户ID',
          key: 'code',
          className: 'col2'
        },
        {
          title: '预付款余额',
          key: 'payBalance',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.balanceList[params.index].payBalance + ' 元')
            ])
          }
        },
        {
          title: '总信用额度',
          key: 'creditBalance',
          className: 'col4',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.balanceList[params.index].totalCreditBalance + ' 元')
            ])
          }
        },
        {
          title: '剩余信用额度',
          key: 'totalCreditBalance',
          className: 'col5',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.balanceList[params.index].creditBalance + ' 元')
            ])
          }
        }
      ],
      balanceList: [],
      loadingTable: true,
      loadingBtn: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    searchListData () {
      // 查询数据
      this.getClientBalanceList(this.getClientBalanceListParam({pageNum: 1, userId: this.searchUserId}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.getClientBalanceList(this.getClientBalanceListParam({pageNum: curPage, userId: this.searchUserId}))
    },
    getClientBalanceListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          customerCode: obj.userId
        },
        callback: (response) => {
          this.loadingBtn = false
          this.loadingTable = false
          if (!response) {
            return false
          }
          // console.log(response)
          if (response.data.code === '1000') {
            this.balanceList = response.data.data.list
            this.page.pageItems = response.data.data.totalNum
          } else {
            if (response.data.code === '900') {
              this.$Message.error('查询失败')
            }
          }
        }
      }
      return params
    },
    ...mapActions({
      getClientBalanceList: types.GET_CLIENT_BALANCE_LIST
    })
  },
  computed: {
  },
  beforeMount () {
    this.getClientBalanceList(this.getClientBalanceListParam({pageNum: 1, userId: this.searchUserId}))
  }
}
</script>

<style scoped>
.secMain{
  padding-top:0px;
}
</style>
