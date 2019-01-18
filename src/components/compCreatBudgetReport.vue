<template lang="pug">
  Form.compCreatBudgetReport(:label-width="150",)
    FormItem(label="客户：")
      comp-select(name='userName',label="客户：", :list="listClient",ref="userName",defaultValue="")
    FormItem(label="预算周期：")
      DatePicker(type="daterange",placeholder="",v-model="time",format="yyyy-MM-dd",@on-change="time=$event",)
    div.secT
      span.t 通用顶级域名注册
      comp-checkbox(:list="listCheckbox1")
    table.table1
      tr
        td.col1
          comp-input(name='userName',label="后缀：", ref="userName",defaultValue="", styles="width: 80px;")
        td.col2
          comp-input(name='userName',label="1年价格：", ref="userName",defaultValue="", styles="width: 80px;")
            span(slot="right") 元
        td.col3
          comp-input(name='userName',label="数量：", ref="userName",defaultValue="", styles="width: 80px;")
            span(slot="right") 个
        td.col4(valign="top")
          a 删除
          a 增加
      tr
        td.col1
          comp-input(name='userName',label="后缀：", ref="userName",defaultValue="", styles="width: 80px;")
        td.col2
          comp-input(name='userName',label="1年价格：", ref="userName",defaultValue="", styles="width: 80px;")
            span(slot="right") 元
        td.col3
          comp-input(name='userName',label="数量：", ref="userName",defaultValue="", styles="width: 80px;")
            span(slot="right") 个
        td.col4(valign="top")
          a 删除
          a 增加
    div.secT
      span.t 新顶级域名注册
      comp-checkbox(:list="listCheckbox2")
    table.table1
      tr
        td.col1
          comp-input(name='userName',label="后缀：", ref="userName",defaultValue="", styles="width: 80px;")
        td.col2
          comp-input(name='userName',label="1年价格：", ref="userName",defaultValue="", styles="width: 80px;")
            span(slot="right") 元
        td.col3
          comp-input(name='userName',label="数量：", ref="userName",defaultValue="", styles="width: 80px;")
            span(slot="right") 个
        td.col4(valign="top")
          a 删除
          a 增加
      tr
        td.col1
          comp-input(name='userName',label="后缀：", ref="userName",defaultValue="", styles="width: 80px;")
        td.col2
          comp-input(name='userName',label="1年价格：", ref="userName",defaultValue="", styles="width: 80px;")
            span(slot="right") 元
        td.col3
          comp-input(name='userName',label="数量：", ref="userName",defaultValue="", styles="width: 80px;")
            span(slot="right") 个
        td.col4(valign="top")
          a 删除
          a 增加
    div.secT
      span.t 域名回购
      comp-checkbox(:list="listCheckbox3")
    table.table2
      tr
        td.col1
          comp-input(name='userName',label="域名：", ref="userName",defaultValue="", styles="width: 171px;")
          comp-input(name='userName',label="预估价格：", ref="userName",defaultValue="", styles="width: 171px;")
            span(slot="right") 元
          comp-input(name='userName',label="域回购原因：", ref="userName",defaultValue="", styles="width: 445px;")
        td.col2
          a 删除
          a 增加

    FormItem(label="")
      Button(type="primary",@click="",:loading="loadingBtn") 确定
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import validateFormResult from '@/global/validateForm'
import compInput from './compInput'
import compSelect from './compSelect'
import compCheckbox from './compCheckbox'
export default {
  components: {
    compInput,
    compSelect,
    compCheckbox
  },
  props: {

  },
  data () {
    return {
      time: [],
      loadingBtn: false,
      listClient: [],
      listCheckbox1:[
        {
          label:"1",
          value: "无通用顶级域名注册计划"
        }
      ],
      listCheckbox2:[
        {
          label:"1",
          value: "无新顶级域名注册计划"
        }
      ],
      listCheckbox3:[
        {
          label:"1",
          value: "无域名回购计划"
        }
      ]
    }
  },
  methods: {
    onChange (e) {
      this.roleCode.error = 0
    },
    ...mapActions({
      creatNewAccount: types.CREAT_NEW_ACCOUNT
    })
  },
  computed: {
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>

<style>
.compCreatBudgetReport{
  padding: 30px 0;
}
.compCreatBudgetReport .ivu-date-picker{
  width: 240px;
}
.compCreatBudgetReport table td{
  width: 30%;
  padding-bottom: 10px;
}
.compCreatBudgetReport table td.col4{
  width: 10%;
}
.compCreatBudgetReport table td.col4 a{
  color: #2271f4;
  display:inline-block;
  margin-top: 7px;
}
.compCreatBudgetReport table.table2 .col1{
  width: 90%;
}
.compCreatBudgetReport table.table2 .col2{
  width: 10%;
}
.compCreatBudgetReport table.table2 .col2 a{
  color: #2271f4;
}
.compCreatBudgetReport table.table2 .ivu-form-item{
  width: 50%;
  display: inline-block;
}
.compCreatBudgetReport .ivu-form-item-label{
  width: 80px!important;
  padding-right: 0px;
}
.compCreatBudgetReport .ivu-form-item-content{
  margin-left: 80px!important;
  text-align: left!important;
}
.compCreatBudgetReport .secT{
  padding: 10px 0;
}
.compCreatBudgetReport .secT .t{
  width: 120px;
  display: inline-block;
  padding-left: 10px;
}
.compCreatBudgetReport table .ivu-alert{
  position: absolute;
  bottom: -23px;
  left: 0px;
  z-index: 1;
  background: none;
}
.compCreatBudgetReport table .ivu-alert-message{
  white-space:nowrap;
}
</style>