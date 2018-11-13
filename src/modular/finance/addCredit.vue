<template lang="pug">
.contCreditList
  <!-- 标题区 -->
  h1.pageTitle.clear 客户额度调整
    .tR
      Input(style="width:200px",placeholder="企业名称/客户ID",v-model.trim="searchUserId")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 搜索
      Button(@click="drawerCreditAdd=true") + 额度增加
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="creditList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 额度增加 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerCreditAdd",title="信用额度修改",:mask-closable="maskClosable",@on-visible-change="drawerChange",)
    comp-credit-add(
      @refreshData="searchListData",
      :on-close="closeDrawer",
      v-if = "refresh",
      :customerName="customerName",
      :customerId="customerId"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compCreditAdd from '@/components/compCreditAdd'
export default {
  components: {
    compCreditAdd
  },
  data () {
    let vm = this
    return {
      refresh: false,
      drawerCreditAdd: false,
      searchUserId: '',
      status: '',
      customerName: '',
      customerId: '',
      credit: [],
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
              }, this.creditList[params.index].flowMoney + ' 元')
            ])
          }
        },
        {
          title: '操作人',
          key: 'userName',
          className: 'col5'
        }
      ],
      creditList: [],
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
    closeDrawer (message) {
      this.drawerCreditAdd = false
    },
    searchListData () {
      this.drawerCreditAdd = false
      // 查询数据
      this.queryCreditMoneyList(this.queryCreditMoneyListParam({pageNum: 1,userId: this.searchUserId}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryCreditMoneyList(this.queryCreditMoneyListParam({pageNum: curPage,userId: this.searchUserId}))
    },
    queryCreditMoneyListParam (obj) {
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
            vm.creditList = response.data.data.list
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
    drawerChange () {
      if (this.drawerCreditAdd) {
        this.refresh = true
      } else {
        this.refresh = false
      }
    },
    ...mapActions({
      queryCreditMoneyList: types.QUERY_CREDIT_MONEY_LIST
    })
  },
  computed: {
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {
    this.queryCreditMoneyList(this.queryCreditMoneyListParam({pageNum: 1,userId: this.searchUserId}))
  }
}
</script>

<style scoped>
.secMain{
  padding-top:0px;
}
</style>
