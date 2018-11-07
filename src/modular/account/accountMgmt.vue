<template lang="pug">
.contAccountMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 账户管理
    .tR
      span 搜索
      Input(style="width:200px",placeholder="姓名/邮箱/手机",name="searchUserCode",ref="searchUserCode",v-model.trim="searchUserCode")
      Button(type="primary", @click="searchUserData",:loading="loadingBtn") 搜索
      Button(@click="drawerCreatAccount=true") + 新建账号
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="userList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 新建账号 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerCreatAccount",@on-close="closeDrawerCreatAccount",title="新建账号",:mask-closable="maskClosable",@on-visible-change="drawerChange")
    comp-account-creat(:refresh="refresh", @refreshData="searchUserData")

  <!-- 修改密码 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerModifyPw",@on-close="closeDrawerModifyPw",title="修改密码",:mask-closable="maskClosable",@on-visible-change="drawerChange")
    comp-account-password-modify(:refresh="refresh",:userCode="userCode", @refreshData="searchUserData")

  <!-- 修改信息 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerModifyInfo",@on-close="closeDrawerModifyInfo",title="修改信息",:mask-closable="maskClosable",@on-visible-change="drawerChange")
    comp-account-info-modify(:refresh="refresh",:userName="userName",:userMobile="userMobile",:userEmail="userEmail",:userCode="userCode", @refreshData="searchUserData", from="accountMgmt")

</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compAccountInfoModify from '@/components/compAccountInfoModify'
import compAccountPasswordModify from '@/components/compAccountPasswordModify'
import compAccountCreat from '@/components/compAccountCreat'
export default {
  components: {
    compAccountInfoModify,
    compAccountPasswordModify,
    compAccountCreat
  },
  data () {
    return {
      refresh: false,
      searchUserCode:'',
      loadingTable: true,
      loadingBtn: false,
      drawerCreatAccount: false,
      drawerModifyPw: false,
      drawerModifyInfo: false,
      columns: [
        {
          title: '员工姓名',
          key: 'userName',
          className: 'col1'
        },
        {
          title: '角色',
          key: 'userRoles',
          className: 'col2',
          render: (h, params) => {
            if (this.userList[params.index].userRoles === null) {
              return h('div', [
                h('span', {}, '-')
              ])
            } else {
              return h('div', [
                h('span', {}, this.userList[params.index].userRoles)
              ])
            }
          }
        },
        {
          title: '手机',
          key: 'userMobile',
          className: 'col3'
        },
        {
          title: '邮箱',
          key: 'userEmail',
          className: 'col4'
        },
        {
          title: '操作',
          key: '',
          className: 'operate',
          render: (h, params) => {
            if (this.userList[params.index].userRoles !== 'super') {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      let param = {
                        userName: this.userList[params.index].userName,
                        userEmail: this.userList[params.index].userEmail,
                        userMobile: this.userList[params.index].userMobile,
                        userCode: this.userList[params.index].userCode
                      }
                      this.showModifyAccount(param)
                      this.drawerModifyInfo = true
                    }
                  }
                }, '修改信息'),
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      let param = {
                        userCode: this.userList[params.index].userCode
                      }
                      this.showModifyPw(param)
                      this.drawerModifyPw = true
                    }
                  }
                }, '修改密码'),
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.showDelAccount(this.userList[params.index].userCode)
                    }
                  }
                }, '删除账号')
              ])
            } else {
            }
          }
        }
      ],
      userList: [],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      userName: '',
      userMobile: '',
      userEmail: '',
      userCode: ''
    }
  },
  methods: {
    searchUserData () {
      this.drawerModifyPw = false
      this.drawerModifyInfo = false
      this.drawerCreatAccount = false
      this.getUserListData(this.getUserListParam({pageNum: 1, userCode: this.searchUserCode}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.getUserListData(this.getUserListParam({pageNum: curPage, userCode: this.searchUserCode}))
    },
    drawerChange () {
      if (this.drawerModifyPw || this.drawerModifyInfo || this.drawerCreatAccount) {
        this.refresh = true
      } else {
        this.refresh = false
      }
    },
    showModifyPw (param) {
      this.userCode = param.userCode
    },
    showModifyAccount (param) {
      // 重置表单数据
      this.userName = param.userName
      this.userMobile = param.userMobile
      this.userEmail = param.userEmail
      this.userCode = param.userCode
    },
    showDelAccount (userCode) {
      // console.log(userCode)
      this.$Modal.confirm({
        title: '确认',
        content: '<p>请确认是否要删除此账号！</p>',
        loading: true,
        onOk: () => {
          let vm = this
          let params = {
            param: {
              userCode: userCode
            },
            callback: function (response) {
              vm.$Modal.remove()
              if( response.data.code === '1000' ){
                vm.$Message.success('删除成功')
                // 删除成功，重新加载用户列表数据
                vm.page.pageNo = 1
                vm.loadingTable = true
                vm.$store.dispatch(types.GET_USER_LIST_DATA, vm.getUserListParam({pageNum: 1,userCode: vm.searchUserCode}))
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
    },
    closeDrawerModifyPw () {
    },
    closeDrawerModifyInfo () {
    },
    closeDrawerCreatAccount () {
    },
    getUserListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true
      let vm = this
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          userCode: obj.userCode
        },
        callback: function(response){
          vm.loadingBtn = false
          vm.loadingTable = false
          // console.log(response)
          if (response.data.code === '1000'){
            vm.userList = response.data.data.list
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
      getUserListData: types.GET_USER_LIST_DATA,
      delUser: types.DEL_USER
    })
  },
  computed: {
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
    this.getUserListData(this.getUserListParam({pageNum: 1, userCode: ''}))
  },
  watch: {
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
.accountCreat{
  padding-left:60px;
}
</style>
