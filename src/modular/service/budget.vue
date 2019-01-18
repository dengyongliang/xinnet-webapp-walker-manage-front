<template lang="pug">
.contButlerMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 提交预算报告
    .tR
      span 搜索
      Input(style="width:200px",placeholder="企业名称/客户ID",name="searchValue",ref="searchValue",v-model.trim="value")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
      Button(@click="") + 创建报告

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 预算报告 抽屉 -->
  Drawer(:closable="true",width="640",v-model="drawerCreatBudgetReport",title="预算报告",@on-close="closeDrawer",@on-visible-change="drawerChange",:mask-closable="maskClosable")
    comp-creat-budget-report(
      v-if="drawerCreatBudgetReport",
      @refreshData="searchListData"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compCreatBudgetReport from '@/components/compCreatBudgetReport'
export default {
  components: {
    compCreatBudgetReport
  },
  data () {
    return {
      value: '',
      refresh: false,
      columns: [
        {
          title: '创建时间',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '企业名称',
          key: 'companyName',
          className: 'col2'
        },
        {
          title: '客户ID',
          key: 'customerId',
          className: 'col3'
        },
        {
          title: '预算周期',
          className: 'col5',
          render: (h, params) => {
            return h('div', [
              h('span', {}, `${this.list[params.index].budgetCycleStart}至${this.list[params.index].budgetCycleStart}`)
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

                  }
                }
              }, '修改'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.delAdmin(this.adminList[params.index].customerCount, this.adminList[params.index].userCode)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      list: [],
      drawerCreatBudgetReport: true,
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

    },
    delAdmin (customerNum, userCode) {
      if (customerNum) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>此管家账户下关联客户账户，<br />请先修改客户账户归属再提交删除！</p>',
          onOk: () => {
          },
          onCancel: () => {
          }
        })
      } else {
        this.$Modal.confirm({
          title: '确认',
          content: '<p>请确认是否删除此管家账户</p>',
          loading: true,
          onOk: () => {
            let vm = this
            let params = {
              param: {
                userCode:userCode,
              },
              callback: function (response) {
                vm.$Modal.remove()
                if( response.data.code === '1000' ){
                  vm.$Message.success('删除成功')
                  // 删除成功，重新加载列表数据
                  vm.searchListData()
                } else {
                  if (response.data.code === '200') {
                    vm.$Message.error('用户不存在')
                  } else if (response.data.code === '300') {
                    vm.$Message.error('用户被锁定')
                  } else {
                    vm.$Message.error('删除失败')
                  }
                }
              }
            }
            this.delUser(params)
          },
          onCancel: () => {
          }
        })
      }
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.getList(this.getListParam({pageNum: curPage,userId: this.searchUserId}))
    },
    closeDrawerDetail () {
    },
    drawerChange () {
      if (this.drawerDetail) {
        this.refresh = true
      } else {
        this.refresh = false
      }
    },
    getListParam (obj) {
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
            vm.list = response.data.data.list
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
    searchListData () {
      // 关闭 账号详情层
      this.drawerDetail = false
      // 查询数据
      this.getList(this.getListParam({pageNum: 1,userId: this.searchUserId}))
    },
    ...mapActions({
      getList: types.QUERY_BUDGET_REPORT_MANAGE,
      delUser: types.DEL_USER
    })
  },
  computed: {
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {
    this.getList(this.getListParam({pageNum: 1,userId: this.searchUserId}))
  }
}
</script>

<style scoped>

</style>
