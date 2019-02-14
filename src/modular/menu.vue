<template lang="pug">
.menuBody
  .menuBox(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_user")>=0')
    h3.menuT.lv1
      i.font.fontL.font-lock
      span 账号权限
    ul.menuList
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_user_myUserInfo")>=0')
        router-link(to="/account/my") 我的账号
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_user_userList")>=0')
        router-link(to="/account/mgmt") 账号管理

  .menuBox(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_customer")>=0')
    h3.menuT.lv1
      i.font.fontL.font-admin
      span 客户管理
    ul.menuList
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_customer_list")>=0')
        router-link(to="/client/mgmt") 客户管理
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0')
        router-link(to="/client/account") 客户账号管理

  .menuBox(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_order")>=0')
    h3.menuT.lv1
      i.font.fontL.font-file
      span 订单管理
    ul.menuList
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_order_orderList")>=0')
        router-link(to="/order/mgmt") 订单管理
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_order_entryOrder")>=0')
        router-link(to="/order/entry") 订单录入

  .menuBox(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_finance")>=0')
    h3.menuT.lv1
      i.font.fontL.font-bill
      span 财务管理
    ul.menuList
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_finance_payMoneyList")>=0')
        router-link(to="/finance/payment") 预付款增加管理
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_finance_customerBalanceList")>=0')
        router-link(to="/finance/balance") 客户账户余额查询
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_finance_customerBillList")>=0')
        router-link(to="/finance/bill") 账单结算
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_finance_creditMoneyList")>=0')
        router-link(to="/finance/credit") 客户额度调整

  .menuBox(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_customer_user")>=0')
    h3.menuT.lv1
      i.font.fontL.font-people
      span 管家与客户服务
    ul.menuList
      li.menuItem.lv2(v-if='myUserInfo.menus.indexOf("super")>=0 || myUserInfo.menus.indexOf("manage_customer_houseKeepers")>=0')
        router-link(to="/service/butler") 管家管理
      li.menuItem.lv2
        router-link(to="/service/budget") 提交预算报告
      li.menuItem.lv2
        router-link(to="/service/worklist") 工单管理
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      }
    })
  },
  methods: {

  },
  beforeMount () {
  }
}
</script>
<style scoped>
.menuBody{
  padding:50px 20px 20px 20px;
}
.menuBody .menuBox{
    line-height: 46px;
    vertical-align: middle;
}
.menuBody .menuT:hover{
    text-decoration: none;
}
.menuBody .menuT{
    display: block;
    height: 46px;
    line-height: 46px;
    position: relative;
    cursor: pointer;
}
.menuBody .menuT.lv1.on{
    border-left: solid 3px #e50112;
    background: #f7f7f7;
}
.menuBody .menuT:hover span,
.menuBody .menuT:hover .font{
    color: #e50012;
}
.menuBody .menuT span{
    font-size: 14px;
    font-weight: normal;
    color: #333333;
}
.menuBody .menuT .font{
    color: #666;
    font-size: 14px;
    padding-right: 15px;
}
.menuBody .menuItem{
    line-height: 40px;
    vertical-align: middle;
    font-size: 12px;
    cursor: pointer;
}
.menuBody .lv2{
    padding-left: 30px;
}
.menuBody .menuItem a{
    color: #666;
    display:block;
}
.menuBody .menuItem:hover a{
    color: #e50012;
}
.menuBody .menuItem .router-link-active{
  color:#2271f4;
}
</style>
