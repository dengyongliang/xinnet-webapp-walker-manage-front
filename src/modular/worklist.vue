<template lang="pug">
.contClientMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 工单管理
  .secFilter
    form.filterWrap()
      table
        tr.row1
          td.td1
            span.n 搜索：
            .inputWrap
              <Input v-model="domainName" placeholder="客户名称或编号/用户名称或编号" />
          td.td2
            span.n 创建时间：
            .inputWrap
              DatePicker(type="daterange",placeholder="全部",v-model="createTime",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%")
          td.td3
            span.n 状态：
            .inputWrap
              Select(v-model="status")
                Option(v-for="item in workOrderModeList",:value="item.value",:key="item.value") {{ item.label }}
          td.tdBtn
            Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询

       
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")
  <!-- 添加/修改 账户 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerClientMgmt",title="工单详情",@on-visible-change="drawerChange",:mask-closable="maskClosable")
    comp-client-work-order(
      @refreshData="searchListData",
      v-if="drawerClientMgmt",
      :obj="obj"
    )
</template>

<script>
import { mapState } from 'vuex' 
import moment from 'moment'
import compClientWorkOrder from '@/components/compClientWorkOrder.vue'
export default {
  components: {
      compClientWorkOrder
  },
  data () {
    return {
      domainName: '',
      createTime: ['',''],
      status: '',
      obj:[],
      drawerClientMgmt: false,
      workOrderModeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '待处理'
        },
        {
          value: '2',
          label: '处理中'
        },
        {
          value: '3',
          label: '已完成'
        }
      ],
      columns: [
        {
          title: '提交时间',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '所属管家',
          key: 'keeperName',
          className: 'col2'
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
          title: '姓名',
          key: 'userName',
          className: 'col4'
        },
        {
          title: '用户ID',
          key: 'userCode',
          className: 'col5'
        },
	{
          title: '问题类型',
          key: 'questionType',
          className: 'col5',
	  render: (h, params) => {
            if (this.list[params.index].questionType === 1) {
              return h('div', [
                h('span', {}, '委托注册')
              ])
            }
            if (this.list[params.index].questionType === 2) {
              return h('div', [
                h('span', {}, '域名回购')
              ])
            }
            if (this.list[params.index].questionType === 3) {
              return h('div', [
                h('span', {}, '安全问题')
              ])
            }
	    if (this.list[params.index].questionType === 4) {
              return h('div', [
                h('span', {}, '财务问题')
              ])
            }
            if (this.list[params.index].questionType === 5) {
              return h('div', [
                h('span', {}, '托管域名信息修改及续费')
              ])
            }
            if (this.list[params.index].questionType === 6) {
              return h('div', [
                h('span', {}, '域名赎回')
              ])
            }
	    if (this.list[params.index].questionType === 7) {
              return h('div', [
                h('span', {}, '注册局锁')
              ])
            }
            if (this.list[params.index].questionType === 8) {
              return h('div', [
                h('span', {}, '其它问题')
              ])
            }
            
          }
        },
        {
          title: '状态',
          key: 'status',
          className: 'col6',
	  render: (h, params) => {
            if (this.list[params.index].status === 1) {
              return h('div', [
                h('span', {}, '待处理')
              ])
            }
            if (this.list[params.index].status === 2) {
              return h('div', [
                h('span', {}, '处理中')
              ])
            }
            if (this.list[params.index].status === 3) {
              return h('div', [
                h('span', {}, '已完成')
              ])
            }
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.showDrawerClient(this.list[params.index])
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      list: [],
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
      this.queryList(1)
      this.drawerClientMgmt = false
    },
    showDrawerClient (param) {
      this.obj = param
      console.log(this.obj)
      this.drawerClientMgmt = true
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryList(curPage)
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true
      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        createTimeBegin: this.createTime[0] ? moment(this.createTime[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
        createTimeEnd: this.createTime[1] ? moment(this.createTime[1]).format('YYYY-MM-DD') + ' 23:59:59' : '',
	domainName:this.domainName,
	status:this.status
      }
      return params
    },
    queryList (curPage) {
      this.$store.dispatch('WORK_ORDER_LIST', this.queryListParam({pageNum: curPage})).then((response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        // console.log(response)
	
        if (response.data.code === '1000') {
          this.list = response.data.data.list
	 
          this.page.pageItems = response.data.data.totalNum
        } else {
          // if (response.data.code === '900') {
          //   this.$Message.error('查询失败')
          // }
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
