<template lang="pug">
.contClientMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 客户管理
    .tR
      span 搜索
      Input(style="width:200px",placeholder="企业名称/客户ID",v-model.trim="searchUserId")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 搜索
      Button(@click="showDrawerClient('creat')") + 新增客户

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="clientList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")

  <!-- 添加/修改 账户 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerClientMgmt",:title="drawerTitle",@on-visible-change="drawerChange",:mask-closable="maskClosable")
    comp-client-mgmt(
      @refreshData="searchListData",
      v-if="drawerClientMgmt",
      :status="status",
      :enterprise = "enterprise",
      :orgCode = "orgCode",
      :id = "id",
      :userId = "userId",
      :userName = "userName",
      :accountPeriod = "accountPeriod",
      :creditBalance = "creditBalance",
      :orgFile = "orgFile",
      :open = "open",
      :contactor = "contactor",
      :mobile = "mobile",
      :email = "email",
      :tel = "tel"
    )
</template>

<script>
import { mapState } from 'vuex'
import compClientMgmt from '@/components/compClientMgmt'
export default {
  components: {
    compClientMgmt
  },
  data () {
    return {
      drawerTitle: '',
      searchUserId: '',
      status: '',
      columns: [
        {
          title: '创建时间',
          key: 'createTime',
          className: 'tdDate'
        },
        {
          title: '企业名称',
          key: 'name',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.clientList[params.index].name)
            ])
          }
        },
        {
          title: '客户ID',
          key: 'code',
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
          className: 'col5',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.clientList[params.index].creditBalance + ' 元')
            ])
          }
        },
        {
          title: '状态',
          key: 'status',
          className: 'col6',
          render: (h, params) => {
            if (this.clientList[params.index].status === 1) {
              return h('div', [
                h('span', {}, '启用')
              ])
            }
            if (this.clientList[params.index].status === 0) {
              return h('div', [
                h('span', {}, '停用')
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
                    let param = {
                      enterprise: this.clientList[params.index].name,
                      orgCode: this.clientList[params.index].orgCode,
                      id: this.clientList[params.index].code,
                      accountPeriod: this.clientList[params.index].accountPeriod,
                      creditBalance: this.clientList[params.index].creditBalance,
                      orgFile: this.clientList[params.index].orgFile,
                      open: this.clientList[params.index].status,
                      userId: this.clientList[params.index].userId,
                      userName: this.clientList[params.index].userName,
                      contactor: this.clientList[params.index].contactor,
                      mobile: this.clientList[params.index].mobile,
                      email: this.clientList[params.index].email,
                      tel: this.clientList[params.index].tel
                    }
                    this.showDrawerClient('view', param)
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      clientList: [],
      drawerClientMgmt: false,
      loadingTable: true,
      loadingBtn: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      enterprise: '',
      orgCode: '',
      customerUserId: 0,
      accountPeriod: '',
      creditBalance: '',
      orgFile: '',
      open: 2,
      admin: '',
      contactor: '',
      mobile: '',
      email: '',
      tel: ''
    }
  },
  methods: {
    searchListData () {
      // 关闭 drawer弹出层
      this.drawerClientMgmt = false
      // 查询数据
      this.getClientList(1)
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.getClientList(curPage)
    },
    drawerChange () {
    },
    showDrawerClient (status, param) {
      if (status === 'creat') {
        this.status = 'creat'
        this.drawerTitle = '新增客户'
        this.enterprise = ''
        this.orgCode = ''
        this.id = 0
        this.userId = ''
        this.userName = ''
        this.accountPeriod = ''
        this.creditBalance = ''
        this.orgFile = ''
        this.open = 2
        this.contactor = ''
        this.mobile = ''
        this.email = ''
        this.tel = ''
      } else if (status === 'view') {
        this.status = 'view'
        this.drawerTitle = '客户详情'
        this.enterprise = param.enterprise
        this.orgCode = param.orgCode
        this.id = param.id
        this.userId = param.userId
        this.userName = param.userName
        this.accountPeriod = param.accountPeriod
        this.creditBalance = param.creditBalance
        this.orgFile = param.orgFile
        this.open = param.open
        this.contactor = param.contactor
        this.mobile = param.mobile
        this.email = param.email
        this.tel = param.tel
      } else {
        this.drawerTitle = ''
      }
      this.drawerClientMgmt = true
    },
    getClientListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true
      let param = {
        pageNum: obj.pageNum,
        pageSize: 20,
        customerCode: this.searchUserId
      }
      return param
    },
    getClientList (curPage) {
      this.$store.dispatch('CUSTOMER_LIST', this.getClientListParam({pageNum: curPage})).then((response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        // console.log(response)
        if (response.data.code === '1000') {
          this.clientList = response.data.data.list
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
    this.getClientList(1)
  }
}
</script>

<style scoped>
.secMain{
  padding-top:0px;
}
</style>
