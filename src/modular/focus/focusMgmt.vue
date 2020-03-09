<template lang="pug">
.contFocusMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 订单管理
  .secFilter
    form.filterWrap(ref="exportForm",target="_blank" method="post" accept-charset="utf-8" :action="exportLink")
      table
        tr.row1
          td.td1
            span.n 搜索：
            .inputWrap
              <Input v-model="value" ref="domainName" placeholder="请输入域名" />
          td.td2
            Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
            Button(type="default", @click="drawerFocusDomainAdd=true",:loading="loadingBtn",class="btnAdd") 添加
          td.td3()
          td.td4
  .secMain
    <!-- 列表主体 -->
    .secTable()
      <Table :columns="columns" :data="orderList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")
  <!-- 添加关注域名 抽屉 -->
  Drawer(:closable="true", width="650", v-model="drawerFocusDomainAdd", title="添加关注域名", :mask-closable="maskClosable")
    comp-focus-domain-add(
      v-if="drawerFocusDomainAdd",
      @closeDrawer="closeDrawer",
      @refreshData="searchListData"
    )
  <!-- 修改关注域名信息 抽屉 -->
  Drawer(:closable="true", width="650", v-model="drawerFocusDomainUpdate", title="修改关注域名信息", :mask-closable="maskClosable")
    comp-focus-domain-update(
      v-if="drawerFocusDomainUpdate",
      :id = "id",
      @refreshData="searchListData",
      @closeDrawer="closeDrawer"
    )
</template>

<script>
import { mapState } from 'vuex'
import * as action from '@/global/action.js'
import moment from 'moment'
import compFocusDomainAdd from '@/components/compFocusDomainAdd'
import compFocusDomainUpdate from '@/components/compFocusDomainUpdate'
export default {
  components: {
    compFocusDomainAdd,
    compFocusDomainUpdate
  },
  data () {
    return {
      value: '',
      exportLink: action.EXPORT_ORDER,
      searchUserId: '',
      time: '',
      selectData: [],
      id: 0,
      param: {
        orderGoodsInfo: '',
        orderMode: '',
        createTime: [],
        orderGoodsType: '',
        orderType: '',
        orderPayType: ''
      },
      orderModeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '用户下单'
        },
        {
          value: '2',
          label: '系统下单'
        },
        {
          value: '3',
          label: '线下下单'
        }
      ],
      orderGoodsTypeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '域名注册'
        },
        {
          value: '2',
          label: '域名续费'
        },
        {
          value: '3',
          label: '域名回购'
        },
        {
          value: '4',
          label: '域名安全服务'
        }
      ],
      orderTypeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '新开'
        },
        {
          value: '2',
          label: '续费'
        },
        {
          value: '3',
          label: '退费'
        },
        {
          value: '4',
          label: '转入'
        }
      ],
      orderPayTypeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '信用消费'
        },
        {
          value: '2',
          label: '预付费消费'
        }
      ],
      columns: [
        {
          title: '域名',
          key: 'domainName',
          className: 'col1'
        },
        {
          title: '域名所有者',
          key: 'registrarName',
          className: 'col2'
        },
        {
          title: '网站类型',
          key: 'siteType',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.DATAS.SITE_TYPE[this.orderList[params.index].siteType])
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
                    this.handleUpate(this.orderList[params.index].id)
                  }
                }
              }, '修改'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.handleRefresh(this.orderList[params.index])
                  }
                }
              }, '刷新')
            ])
          }
        }
      ],
      orderList: [],
      loadingTable: true,
      loadingBtn: false,
      drawerFocusDomainAdd: false,
      drawerFocusDomainUpdate: false,
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
      this.queryOrderList(1)
    },
    closeDrawer () {
      this.drawerFocusDomainAdd = false
      this.drawerFocusDomainUpdate = false
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryOrderList(curPage)
    },
    handleDel () {
      let flag = true
      if (this.selectData.length) {
        let domainString = this.selectData.map((v) => {
          if (v.depositFlag !== 1) {
            flag = false
          }
          return v.id
        }).join(',')
        // flag===true 执行过户，否则提示 错误信息
        if (flag) {
          this.$Modal.confirm({
            title: '确认',
            content: '<p>请确认是否要此域名！</p>',
            loading: true,
            onOk: () => {
              this.$store.dispatch('DELETE_DEPOSIT_DOMAIN', {domainIds: domainString}).then(response => {
                this.$Modal.remove()
                if (!response) {
                  return false
                }
                if (response.data.code === '1000') {
                  this.$Message.success('删除成功')
                  // 删除成功，重新加载列表数据
                  this.queryList({pageNum: 1})
                } else {
                  if (response.data.code === '200') {
                    this.$Message.error('用户不存在')
                  } else if (response.data.code === '300') {
                    setTimeout(() => {
                      this.$Modal.warning({
                        title: '无法删除',
                        content: '该账号为域名分组负责人，请将域名分组负责人设为其他账号后再删除该账号'
                      })
                    }, 300)
                    // this.$Message.error('该客户下已有负责分组，请先将分组移至其它客户再删除当前客户！')
                  } else {
                    this.$Message.error('操作失败')
                  }
                }
              }).catch(() => {})
            },
            onCancel: () => {
            }
          })
        } else {
          this.$Message.error('存在非托管域名，禁止删除！')
        }
      } else {
        this.$Message.error('请选择要删除的域名！')
      }
    },
    handleUpate (id) {
      this.id = id
      this.drawerFocusDomainUpdate = true
    },
    handleRefresh (item) {
      this.$store.dispatch('FOLLOW_DOMAIN_REFRESE', {id: item.id}).then((response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        // console.log(response)
        if (response.data.code === '1000') {
          this.$Message.success(`刷新成功`)
          this.searchListData()
        } else {
          this.$Message.error('刷新失败')
        }
      }).catch(() => {})
    },
    queryOrderListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let param = {
        pageNum: obj.pageNum,
        pageSize: 20,
        domainName: this.value
      }
      return param
    },
    queryOrderList (curPage) {
      this.$store.dispatch('FOLLOW_DOMAIN_LIST', this.queryOrderListParam({pageNum: curPage})).then((response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        // console.log(response)
        if (response.data.code === '1000') {
          this.orderList = response.data.data.list
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
    this.queryOrderList(1)
  }
}
</script>

<style scoped>
.contFocusMgmt .td2{
  padding-left: 20px;
}
.contFocusMgmt .btnAdd{
  margin-left:20px;
}
</style>
