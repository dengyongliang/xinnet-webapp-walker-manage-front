<template lang="pug">
.contButlerMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 提交预算报告
    .tR
      span 搜索
      Input(style="width:200px",placeholder="企业名称/客户ID",name="searchValue",ref="searchValue",v-model.trim="value")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
      Button(@click="drawerCreatBudgetReport=true") + 创建报告

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 预算报告-创建 抽屉 -->
  Drawer(:closable="true",width="700",v-model="drawerCreatBudgetReport",title="预算报告",@on-visible-change="drawerChange",:mask-closable="maskClosable")
    comp-creat-budget-report(
      v-if="drawerCreatBudgetReport",
      @refreshData="searchListData",
      :on-close="closeDrawer"
    )

  <!-- 预算报告-修改 抽屉 -->
  Drawer(:closable="true",width="700",v-model="drawerModifyBudgetReport",title="预算报告",@on-visible-change="drawerChange",:mask-closable="maskClosable")
    comp-modify-budget-report(
      v-if="drawerModifyBudgetReport",
      :reportId="reportId",
      @refreshData="searchListData",
      :on-close="closeDrawer"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compCreatBudgetReport from '@/components/compCreatBudgetReport'
import compModifyBudgetReport from '@/components/compModifyBudgetReport'
import moment from 'moment'
export default {
  components: {
    compCreatBudgetReport,
    compModifyBudgetReport
  },
  data () {
    return {
      value: '',
      columns: [
        {
          title: '创建时间',
          key: 'createTime',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('span', {}, moment(this.list[params.index].createTime).format('YYYY-MM-DD HH:mm:ss'))
            ])
          }
        },
        {
          title: '企业名称',
          key: 'companyName',
          className: 'col2'
        },
        {
          title: '客户ID',
          key: 'code',
          className: 'col3'
        },
        {
          title: '预算周期',
          className: 'col5',
          render: (h, params) => {
            return h('div', [
              h('span', {}, `${moment(this.list[params.index].budgetCycleStart).format('YYYY-MM-DD HH:mm:ss')}至${moment(this.list[params.index].budgetCycleEnd).format('YYYY-MM-DD HH:mm:ss')}`)
            ])
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
                    this.showModifyReport(this.list[params.index].id)
                  }
                }
              }, '修改'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.delReport(this.list[params.index].id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      list: [],
      drawerCreatBudgetReport: false,
      drawerModifyBudgetReport: false,
      reportId: 0,
      loadingBtn: false,
      loadingTable: true,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    closeDrawer () {
      this.drawerCreatBudgetReport = false
      this.drawerModifyBudgetReport = false
    },
    showModifyReport (id) {
      this.reportId = id
      this.drawerModifyBudgetReport = true
    },
    delReport (id) {
      this.$Modal.confirm({
        title: '确认',
        content: '<p>请确认是否删除此预算报告</p>',
        loading: true,
        onOk: () => {
          let params = {
            param: {
              reportId: id
            },
            callback: (response) => {
              if (!response) {
                return false
              }
              this.$Modal.remove()
              if (response.data.code === '1000') {
                this.$Message.success('删除成功')
                // 删除成功，重新加载列表数据
                this.searchListData()
              } else {
                if (response.data.code === '200') {
                  this.$Message.error('用户不存在')
                } else if (response.data.code === '300') {
                  this.$Message.error('用户被锁定')
                } else {
                  this.$Message.error('删除失败')
                }
              }
            }
          }
          this.deleteBudgetReport(params)
        },
        onCancel: () => {
        }
      })
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.getList(this.getListParam({pageNum: curPage}))
    },
    drawerChange () {
      // 层关闭，刷新数据
      if (!this.drawerCreatBudgetReport && !this.drawerModifyBudgetReport) {
        this.searchListData()
      }
    },
    getListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          queryCondition: this.value
        },
        callback: (response) => {
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
            if (response.data.code === '900') {
              this.$Message.error('查询失败')
            }
          }
        }
      }
      return params
    },
    searchListData () {
      // 关闭 drawer
      this.drawerCreatBudgetReport = false
      this.drawerModifyBudgetReport = false
      // 查询数据
      this.getList(this.getListParam({pageNum: 1}))
    },
    ...mapActions({
      getList: types.QUERY_BUDGET_REPORT_MANAGE,
      deleteBudgetReport: types.DELETE_BUDGET_REPORT
    })
  },
  computed: {
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {
    this.getList(this.getListParam({pageNum: 1}))
  }
}
</script>

<style scoped>

</style>
