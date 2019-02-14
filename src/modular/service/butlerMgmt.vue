<template lang="pug">
.contButlerMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 管家账户
    .tR
      span 搜索
      Input(style="width:200px",placeholder="姓名/用户名/邮箱/手机",name="searchUserId",ref="searchUserId",v-model.trim="searchUserId")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
      Button(@click="modalAddAccount=true") + 添加账号

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="adminList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 添加账户 弹窗 -->
  Modal.modalAddAccount(width="480", v-model="modalAddAccount",title="创建账户",:mask-closable="maskClosable",:footer-hide="true")
    comp-butler-add(ref="accountAdd",@refreshData="searchListData",@closeModal="closeModal",v-if="modalAddAccount")

  <!-- 详情 抽屉 -->
  Drawer(:closable="true",width="640",v-model="drawerDetail",title="管家账号",@on-close="closeDrawerDetail",@on-visible-change="drawerChange",:mask-closable="maskClosable")
    comp-butler-modify(
      :detailData="detailData",
      :userName="userName",
      :userMobile="userMobile",
      :userEmail="userEmail",
      :userCode="userCode",
      :userTel="userTel",
      :qq="qq",
      :wx="wx",
      :status="status",
      v-if="drawerDetail",
      ref="accountModify",
      @refreshData="searchListData",
    )
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
          key: 'userCode',
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
            if (this.adminList[params.index].status === 0) {
              return h('div', [
                h('span', {}, '未激活')
              ])
            }
            if (this.adminList[params.index].status === 1) {
              return h('div', [
                h('span', {}, '已启用')
              ])
            }
            if (this.adminList[params.index].status === 2) {
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
            return h('div', [
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.detailData = {
                      userName: this.adminList[params.index].userName,
                      userEmail: this.adminList[params.index].userEmail,
                      userMobile: this.adminList[params.index].userMobile,
                      userCode: this.adminList[params.index].userCode,
                      userTel: this.adminList[params.index].userTel,
                      qq: this.adminList[params.index].qq,
                      wx: this.adminList[params.index].wx,
                      status: this.adminList[params.index].status
                    }
                    // this.showAdminDetail(param)
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
      detailData: {}
    }
  },
  methods: {
    closeModal () {
      this.modalAddAccount = false
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
            let params = {
              param: {
                userCode: userCode
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
            this.delUser(params)
          },
          onCancel: () => {
          }
        })
      }
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.getAdminList(this.getAdminListParam({pageNum: curPage, userId: this.searchUserId}))
    },
    closeDrawerDetail () {
    },
    drawerChange () {
    },
    getAdminListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          userId: obj.userId
        },
        callback: (response) => {
          this.loadingBtn = false
          this.loadingTable = false
          if (!response) {
            return false
          }
          // console.log(response)
          if (response.data.code === '1000') {
            this.adminList = response.data.data.list
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
      // 关闭 账号详情层
      this.drawerDetail = false
      // 查询数据
      this.getAdminList(this.getAdminListParam({pageNum: 1, userId: this.searchUserId}))
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
    this.getAdminList(this.getAdminListParam({pageNum: 1, userId: this.searchUserId}))
  }
}
</script>

<style scoped>

</style>
