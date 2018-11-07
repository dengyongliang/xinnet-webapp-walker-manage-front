<template lang="pug">
.contButlerMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 管家账户
    .tR
      span 搜索
      Input(style="width:200px",placeholder="姓名/用户名/邮箱/手机",name="searchUserId",ref="searchUserId",v-model.trim="searchUserId")
      Button(type="primary", @click="searchUserIdData",:loading="loadingBtn") 查询
      Button(@click="showModalAddAccount") + 添加账号

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="adminList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 添加账户 弹窗 -->
  comp-butler-add(ref="accountAdd",:showModal="modalAddAccount",@refreshData="searchUserIdData")

  <!-- 详情 抽屉 -->
  Drawer(:closable="true",width="640",v-model="drawerDetail",title="管家账号",@on-close="closeDrawerDetail",@on-visible-change="drawerChange",:mask-closable="maskClosable")
    comp-butler-modify(:userName="userName",:userMobile="userMobile",:userEmail="userEmail",:userCode="userCode",:refresh="refresh",ref="accountModify",@refreshData="searchUserIdData",)
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compButlerModify from '@/components/compButlerModify'
import compButlerAdd from '@/components/compButlerAdd'
export default {
  components: {
    compButlerModify,
    compButlerAdd
  },
  data () {
    return {
      searchUserId: '',
      columns: [
        {
          title: '姓名',
          key: 'userName',
          className: 'col1'
        },
        {
          title: '管家ID',
          key: 'id',
          className: 'col2'
        },
        {
          title: '邮箱',
          key: 'userEmail',
          className: 'col3'
        },
        {
          title: '手机号码',
          key: 'userMobile',
          className: 'col4'
        },
        {
          title: '状态',
          key: 'status',
          className: 'col5',
          render: (h, params) => {
            if (this.adminList[params.index].status === 1) {
              return h('div', [
                h('span', {}, '已激活')
              ])
            }
            if (this.adminList[params.index].status === 2) {
              return h('div', [
                h('span', {}, '未激活')
              ])
            }
            if (this.adminList[params.index].status === 3) {
              return h('div', [
                h('span', {}, '已停用')
              ])
            }
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            if (this.adminList[params.index].status === 1) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      let param = {
                        userName: this.adminList[params.index].userName,
                        userEmail: this.adminList[params.index].userEmail,
                        userMobile: this.adminList[params.index].userMobile,
                        userCode: this.adminList[params.index].userCode
                      }
                      this.showAdminDetal(param)
                      this.drawerDetail = true
                    }
                  }
                }, '详情'),
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.delAdmin(this.adminList[params.index].customerCount, this.adminList[params.index].userCode)
                    }
                  }
                }, '删除账号')
              ])
            }
          }
        }
      ],
      adminList: [],
      modalAddAccount: false,
      loadingBtn: false,
      loadingTable: true,
      drawerDetail: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      refresh: true,
      userName: '',
      userMobile: '',
      userEmail: '',
      userCode: ''
    }
  },
  methods: {
    showModalAddAccount () {
      // 触发数据变动，驱使弹层显示
      this.modalAddAccount = false
      setTimeout(() => {
        this.modalAddAccount = true
      },100)
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
                  vm.searchUserIdData()
                } else {
                  if (response.data.code === '200') {
                    vm.$Message.error('用户不存在')
                  } else if (response.data.code === '300') {
                    vm.$Message.error('用户被锁定')
                  } else if (response.data.code === '500') {
                    vm.$Message.error('参数错误或参数为空')
                  } else if (response.data.code === '900') {
                    vm.$Message.error('操作失败')
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
      this.getAdminList(this.getAdminListParam({pageNum: curPage,userId: this.searchUserId}))
    },
    closeDrawerDetail () {
    },
    drawerChange () {
      if (this.drawerDetail) {
        this.refresh = false
      } else {
        this.refresh = true
      }
    },
    getAdminListParam (obj) {
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
            vm.adminList = response.data.data.list
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
    searchUserIdData () {
      // 关闭 账号详情层
      this.drawerDetail = false
      // 查询数据
      this.getAdminList(this.getAdminListParam({pageNum: 1,userId: this.searchUserId}))
    },
    showAdminDetal (param) {
      this.userName = param.userName
      this.userMobile = param.userMobile
      this.userEmail = param.userEmail
      this.userCode = param.userCode
    },
    ...mapActions({
      getAdminList: types.GET_ADMIN_LIST_DATA,
      delUser: types.DEL_USER
    })
  },
  computed: {
    ...mapState([
      'maskClosable'
    ])
  },
  beforeMount () {
    this.getAdminList(this.getAdminListParam({pageNum: 1,userId: this.searchUserId}))
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
</style>
