<template lang="pug">
.contOrderEntry
  <!-- 标题区 -->
  h1.pageTitle.clear 订单录入
    .tR
      Input(style="width:200px",placeholder="企业名称/客户ID",v-model.trim="orderGoodsInfo")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 搜索
      Button(@click="drawerOrderEntry=true") + 录入订单
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="orderList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 录入订单 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerOrderEntry",title="录入订单",:mask-closable="maskClosable",@on-visible-change="drawerChange")
    comp-order-entry(
      @refreshData="searchListData",
      :refresh="refresh",
      v-if="refresh"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compOrderEntry from '@/components/compOrderEntry'
export default {
  components: {
    compOrderEntry
  },
  data () {
    return {
      refresh: false,
      orderGoodsInfo: '',
      columns: [
        {
          title: '录入时间',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '企业名称',
          key: 'customerName',
          className: 'col2'
        },
        {
          title: '客户ID',
          key: 'userCode',
          className: 'col3'
        },
        {
          title: '产品类型',
          key: 'orderGoodsType',
          className: 'col4',
          render: (h, params) => {
            if (this.orderList[params.index].orderGoodsType === 1) {
              return h('div', [
                h('span', {}, '域名注册')
              ])
            }
            if (this.orderList[params.index].orderGoodsType === 2) {
              return h('div', [
                h('span', {}, '域名续费')
              ])
            }
            if (this.orderList[params.index].orderGoodsType === 3) {
              return h('div', [
                h('span', {}, '域名回购')
              ])
            }
            if (this.orderList[params.index].orderGoodsType === 4) {
              return h('div', [
                h('span', {}, '域名安全服务')
              ])
            }
          }
        },
        {
          title: '订单类型',
          key: 'orderType',
          className: 'col5',
          render: (h, params) => {
            if (this.orderList[params.index].orderType === 1) {
              return h('div', [
                h('span', {}, '新开')
              ])
            }
            if (this.orderList[params.index].orderType === 2) {
              return h('div', [
                h('span', {}, '续费')
              ])
            }
            if (this.orderList[params.index].orderType === 3) {
              return h('div', [
                h('span', {}, '退费')
              ])
            }
          }
        },
        {
          title: '付款类型',
          key: 'orderPayType',
          className: 'col6',
          render: (h, params) => {
            if (this.orderList[params.index].orderPayType === 1) {
              return h('div', [
                h('span', {}, '信用消费')
              ])
            }
            if (this.orderList[params.index].orderPayType === 2) {
              return h('div', [
                h('span', {}, '预付款消费')
              ])
            }
          }
        },
        {
          title: '金额',
          key: 'orderMoney',
          className: 'col7',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.orderList[params.index].orderMoney + ' 元')
            ])
          }
        },
        {
          title: '操作人',
          key: 'userName',
          className: 'col8'
        }
      ],
      orderList: [],
      loadingTable: true,
      loadingBtn: false,
      drawerOrderEntry: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    searchListData () {
      this.drawerOrderEntry = false
      // 查询数据
      this.queryOrderList(this.queryOrderListParam({pageNum: 1}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryOrderList(this.queryOrderListParam({pageNum: curPage}))
    },
    drawerChange () {
      if (this.drawerOrderEntry) {
        this.refresh = true
      } else {
        this.refresh = false
      }
    },
    queryOrderListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let vm = this
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          orderGoodsInfo: this.orderGoodsInfo,
          orderMode: 3
        },
        callback: function(response){
          vm.loadingBtn = false
          vm.loadingTable = false
          // console.log(response)
          if (response.data.code === '1000'){
            vm.orderList = response.data.data.list
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
      queryOrderList: types.QUERY_ORDER_LIST
    })
  },
  computed: {
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {
    this.queryOrderList(this.queryOrderListParam({pageNum: 1}))
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

