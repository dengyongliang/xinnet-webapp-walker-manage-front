<template lang="pug">
.contOrderMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 订单管理
  .secFilter
    .filterWrap
      table
        tr.row1
          td.td1
            span.n 搜索：
            .inputWrap
              <Input v-model="searchUserId" placeholder="" />
          td.td2
            span.n 下单时间：
            .inputWrap
              DatePicker(type="date",placeholder="全部",v-model="time",format="yyyy-MM-dd",@on-change="time=$event")
          td.td3
            span.n 下单方式：
            .inputWrap
              Select(v-model="orderMethod")
                Option(v-for="item in orderMethodList",:value="item.value",:key="item.value") {{ item.label }}

          td.td4
            span.n 产品类型：
            .inputWrap
              Select(v-model="productType")
                Option(v-for="item in productTypeList",:value="item.value",:key="item.value") {{ item.label }}
        tr.row2
          td.td1
            span.n 订单类型：
            .inputWrap
              Select(v-model="orderType")
                Option(v-for="item in orderTypeList",:value="item.value",:key="item.value") {{ item.label }}
          td.td2
            span.n 付款方式：
            .inputWrap
              Select(v-model="payMethod")
                Option(v-for="item in payMethodList",:value="item.value",:key="item.value") {{ item.label }}
          td.td3
            span.n 状态：
            .inputWrap
              Select(v-model="status")
                Option(v-for="item in statusList",:value="item.value",:key="item.value") {{ item.label }}
          td.tdBtn
            Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
            a(href="javascript:;") 导出订单
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
      searchUserId: '',
      time: '',
      orderMethod: '',
      orderMethodList: [
        {
            value: '',
            label: '全部'
        },
        {
            value: '用户下单v',
            label: '用户下单'
        },
        {
            value: '系统下单v',
            label: '系统下单'
        },
        {
            value: '线下下单v',
            label: '线下下单'
        }
      ],
      productType: '',
      productTypeList: [
        {
            value: '',
            label: '全部'
        },
        {
            value: '域名注册v',
            label: '域名注册'
        },
        {
            value: '域名续费v',
            label: '域名续费'
        },
        {
            value: '域名回购v',
            label: '域名回购'
        },
        {
            value: '注册局锁v',
            label: '注册局锁'
        },
        {
            value: '高防DNSv',
            label: '高防DNS'
        }
      ],
      orderType: '',
      orderTypeList: [
        {
            value: '',
            label: '全部'
        },
        {
            value: '新开v',
            label: '新开'
        },
        {
            value: '续费v',
            label: '续费'
        },
        {
            value: '退费v',
            label: '退费'
        }
      ],
      payMethod: '',
      payMethodList: [
        {
            value: '',
            label: '全部'
        },
        {
            value: '信用消费v',
            label: '信用消费'
        },
        {
            value: '预付费消费v',
            label: '预付费消费'
        }
      ],
      status: '',
      statusList: [
        {
            value: '',
            label: '全部'
        },
        {
            value: '已完成v',
            label: '已完成'
        },
        {
            value: '已退款v',
            label: '已退款'
        }
      ],
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
    searchListData () {
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
