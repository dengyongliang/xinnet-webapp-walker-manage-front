<template lang="pug">
.contClientMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 客户管理
    .tR
      span 搜索
      Input(style="width:200px",placeholder="姓名/用户名/邮箱/手机",v-model.trim="searchUserId")
      Button(type="primary", @click="searchClientData",:loading="loadingBtn") 搜索
      Button(@click="showDrawerClient('creat')") + 新建账号

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="clientList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 添加/修改 账户 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerClientMgmt",:title="drawerTitle",@on-visible-change="drawerChange",:mask-closable="maskClosable")
    comp-client-mgmt(
      :status="status",
      @refreshData="searchClientData",
      :enterprise = "enterprise",
      :orgCode = "orgCode",
      :customerUserId = "customerUserId",
      :accountPeriod = "accountPeriod",
      :creditBalance = "creditBalance",
      :orgFile = "orgFile",
      :open = "open",
      :admin = "admin",
      :contactor = "contactor",
      :mobile = "mobile",
      :email = "email",
      :tel = "tel"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compClientMgmt from '@/components/compClientMgmt'
export default {
  components: {
    compClientMgmt
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
                      customerUserId: this.clientList[params.index].customerUserId,
                      accountPeriod: this.clientList[params.index].accountPeriod,
                      creditBalance: this.clientList[params.index].creditBalance,
                      orgFile: this.clientList[params.index].orgFile,
                      open: this.clientList[params.index].open,
                      admin: this.clientList[params.index].admin,
                      contactor: this.clientList[params.index].contactor,
                      mobile: this.clientList[params.index].mobile,
                      email: this.clientList[params.index].email,
                      tel: this.clientList[params.index].tel
                    }
                    this.showDrawerClient('view',param)
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
      open: false,
      admin: '',
      contactor: '',
      mobile: '',
      email: '',
      tel: ''
    }
  },
  methods: {
    searchClientData () {
      // 关闭 drawer弹出层
      this.drawerClientMgmt = false
      // 查询数据
      this.getClientList(this.getClientListParam({pageNum: 1,userId: this.searchUserId}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.getClientList(this.getClientListParam({pageNum: curPage,userId: this.searchUserId}))
    },
    drawerChange () {
      if (this.drawerClientMgmt) {
      } else {
        this.status = ''
      }
    },
    showDrawerClient (status, param) {
      if (status === 'creat') {
        this.status = "creat"
        this.drawerTitle = '新增客户'
        this.enterprise = ''
        this.orgCode = ''
        this.customerUserId = 0
        this.accountPeriod = ''
        this.creditBalance = ''
        this.orgFile = ''
        this.open = ''
        this.admin = ''
        this.contactor = ''
        this.mobile = ''
        this.email = ''
        this.tel = ''
      } else if (status === 'view') {
        this.status = "view"
        this.drawerTitle = '客户详情'
        this.enterprise = param.enterprise
        this.orgCode = param.orgCode
        this.customerUserId = param.customerUserId
        this.accountPeriod = param.accountPeriod
        this.creditBalance = param.creditBalance
        this.orgFile = param.orgFile
        this.open = param.open
        this.admin = param.admin
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
      getClientList: types.GET_CLIENT_LIST_DATA
    })
  },
  computed: {
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {
    this.getClientList(this.getClientListParam({pageNum: 1,userId: this.searchUserId}))
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
