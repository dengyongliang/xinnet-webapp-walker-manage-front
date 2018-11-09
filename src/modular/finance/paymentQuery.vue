<template lang="pug">
.contPaymentQuery
  <!-- 标题区 -->
  h1.pageTitle.clear 预付款查询
    .tR
      Input(style="width:200px",placeholder="企业名称/客户ID",v-model.trim="searchUserId")
      Button(type="primary", @click="searchClientData",:loading="loadingBtn") 搜索

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="clientList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
export default {
  components: {
  },
  data () {
    return {
      drawerTitle:'',
      searchUserId: '',
      status: '',
      columns: [
        {
          title: '创建时间',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '企业名称',
          key: 'name',
          className: 'col2'
        },
        {
          title: '客户ID',
          key: 'customerUserId',
          className: 'col3'
        },
        {
          title: '账期',
          key: 'accountPeriod',
          className: 'col4'
        },
        {
          title: '额度',
          key: 'creditBalance',
          className: 'col5'
        },
        {
          title: '状态',
          key: 'status',
          className: 'col6'
        }
      ],
      clientList: [],
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
    searchClientData () {
      // 查询数据
      this.getClientBalanceList(this.getClientBalanceListParam({pageNum: 1,userId: this.searchUserId}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.getClientBalanceList(this.getClientBalanceListParam({pageNum: curPage,userId: this.searchUserId}))
    },
    getClientBalanceListParam (obj) {
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
            vm.clientList = response.data.data.list
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
      getClientBalanceList: types.GET_CLIENT_BALANCE_LIST
    })
  },
  computed: {
  },
  beforeMount () {
    this.getClientBalanceList(this.getClientBalanceListParam({pageNum: 1,userId: this.searchUserId}))
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
