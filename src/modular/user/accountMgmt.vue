<template lang="pug">
.contAccountMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 账户管理
    .tR
      span 搜索
      Input(style="width:200px",placeholder="姓名/邮箱/手机",name="searchUserCode",ref="searchUserCode",v-model.trim="searchUserCode")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 搜索
      Button(@click="drawerCreatAccount=true") + 新建账号
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="userList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")

  <!-- 新建账号 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerCreatAccount",@on-close="closeDrawerCreatAccount",title="新建账号",:mask-closable="maskClosable",@on-visible-change="drawerChange")
    comp-account-creat(v-if="drawerCreatAccount", @refreshData="searchListData")

  <!-- 修改密码 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerModifyPw",@on-close="closeDrawerModifyPw",title="修改密码",:mask-closable="maskClosable",@on-visible-change="drawerChange")
    comp-account-password-modify(v-if="drawerModifyPw",:userCode="userCode", @refreshData="searchListData")

  <!-- 修改信息 抽屉 -->
  Drawer(:closable="true" width="640" v-model="drawerModifyInfo",@on-close="closeDrawerModifyInfo",title="修改信息",:mask-closable="maskClosable",@on-visible-change="drawerChange")
    comp-account-info-modify(
      v-if="drawerModifyInfo",
      :detailData="detailData",
      @refreshData="searchListData",
      from="accountMgmt"
    )

</template>

<script>
import { mapState } from 'vuex'
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
      searchUserCode: '',
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
            if (!this.userList[params.index].roles) {
              return h('div', [
                h('span', {}, '-')
              ])
            } else {
              return h('div', [
                h('span', {}, this.userList[params.index].roles[0].roleName)
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
                      this.detailData = {
                        userName: this.userList[params.index].userName,
                        userEmail: this.userList[params.index].userEmail,
                        userMobile: this.userList[params.index].userMobile,
                        userCode: this.userList[params.index].userCode,
                        roleId: this.userList[params.index].roles[0].id
                      }
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
    searchListData () {
      this.drawerModifyPw = false
      this.drawerModifyInfo = false
      this.drawerCreatAccount = false
      this.queryList(1)
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryList(curPage)
    },
    drawerChange () {
    },
    showModifyPw (param) {
      this.userCode = param.userCode
    },
    showDelAccount (userCode) {
      // console.log(userCode)
      this.$Modal.confirm({
        title: '确认',
        content: '<p>请确认是否要删除此账号！</p>',
        loading: true,
        onOk: () => {
          this.$store.dispatch('DELETE_USER_INFO', {userCode: userCode}).then((response) => {
            if (!response) {
              return false
            }
            this.$Modal.remove()
            if (response.data.code === '1000') {
              this.$Message.success('删除成功')
              // 删除成功，重新加载用户列表数据
              this.page.pageNo = 1
              this.loadingTable = true
              this.queryList(1)
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定')
              } else {
                this.$Message.error('删除失败')
              }
            }
          }).catch(() => {})
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
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true
      let param = {
        pageNum: obj.pageNum,
        pageSize: 20,
        userCode: this.searchUserCode
      }
      return param
    },
    queryList (curPage) {
      this.$store.dispatch('USER_LIST', this.queryListParam({pageNum: curPage})).then((response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        // console.log(response)
        if (response.data.code === '1000') {
          this.userList = response.data.data.list
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
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
    this.queryList(1)
  },
  watch: {
  }
}
</script>

<style scoped>
.secMain{
  padding-top:0px;
}
.accountCreat{
  padding-left:60px;
}
</style>
