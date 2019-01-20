<template lang="pug">
  Form.compCreatBudgetReport(:label-width="150",)
    FormItem(label="客户：")
      comp-select(name='customerId',label="客户", :list="listClient",ref="customerId",defaultValue="", :on-parentmethod="customerChange")
    FormItem(label="公司：")
      comp-select(name='companyId',label="公司", :list="listClient",ref="companyId",defaultValue="", :on-parentmethod="companyChange")
    FormItem(label="预算周期：")
      comp-date-picker(label="预算周期", ref="time", :on-parentmethod="dataChange", :defaultValue="[budgetData.beginTime, budgetData.endTime]")
    div.secT
      span.t 通用顶级域名注册
      comp-checkbox(:list="listCheckbox1", ref="budgetType1", :on-parentmethod="changeNormal", :defaultValue="defaultNormal")
    table.table1
      tr(v-for="(item, index) in budgetData.budgetReportNormalInfo", v-if="item.budgetType * 1 === 1")
        td.col1
          comp-input(name='domainSuffix',label="后缀：", ref="domainSuffix", :defaultValue="item.domainSuffix.toString()", styles="width: 80px;")
            span(slot="left", style="display:inline-block;margin-right: 3px") .
        td.col2
          comp-input(name='price',label="1年价格：", ref="price", :defaultValue="item.price.toString()", styles="width: 80px;", validate="money")
            span(slot="right") 元
        td.col3
          comp-input(name='budgetNumber',label="数量：", ref="budgetNumber", :defaultValue="item.budgetNumber.toString()", styles="width: 80px;", validate="number")
            span(slot="right") 个
        td.col4(valign="top")
          a(href="javascript:;", @click="delNormal(index)", v-show="showDelNormal") 删除
          a(href="javascript:;", @click="addNormal", v-show="showAddNormal && index===budgetData.budgetReportNormalInfo.length-1") 增加

    div.secT
      span.t 新顶级域名注册
      comp-checkbox(:list="listCheckbox2", ref="budgetType2", :on-parentmethod="changeNew", :defaultValue="defaultNew")
    table.table1
      tr(v-for="(item, index) in budgetData.budgetReportNewInfo", v-if="item.budgetType * 1 === 2")
        td.col1
          comp-input(name='domainSuffix',label="后缀：", ref="domainSuffix", :defaultValue="item.domainSuffix.toString()", styles="width: 80px;")
            span(slot="left", style="display:inline-block;margin-right: 3px") .
        td.col2
          comp-input(name='price',label="1年价格：", ref="price", :defaultValue="item.price.toString()", styles="width: 80px;", validate="money")
            span(slot="right") 元
        td.col3
          comp-input(name='budgetNumber',label="数量：", ref="budgetNumber", :defaultValue="item.budgetNumber.toString()", styles="width: 80px;", validate="number")
            span(slot="right") 个
        td.col4(valign="top")
          a(href="javascript:;", @click="delNew(index)", v-show="showDelNew") 删除
          a(href="javascript:;", @click="addNew", v-show="showAddNew && index===budgetData.budgetReportNewInfo.length-1") 增加

    div.secT
      span.t 域名回购
      comp-checkbox(:list="listCheckbox3", ref="budgetType3", :on-parentmethod="changeRepurchase", :defaultValue="defaultRepurchase")
    table.table2
      tr(v-for="(item, index) in budgetData.budgetReportRepurchaseInfo")
        td.col1
          comp-input(name='domainName',label="域名：", ref="domainName", :defaultValue="item.domainName.toString()", styles="width: 171px;")
          comp-input(name='budgetPrice',label="预估价格：", ref="budgetPrice", :defaultValue="item.budgetPrice.toString()", styles="width: 171px;", validate="money")
            span(slot="right") 元
          comp-input(name='reason',label="域回购原因：", ref="reason", :defaultValue="item.reason.toString()", styles="width: 445px;")
        td.col2
          a(href="javascript:;", @click="delRepurchase(index)", v-show="showDelRepurchase") 删除
          a(href="javascript:;", @click="addRepurchase", v-show="showAddRepurchase && index===budgetData.budgetReportRepurchaseInfo.length-1") 增加

    FormItem(label="")
      Button(type="primary",@click="formSubmit",:loading="loadingBtn") 确定
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
import validateFormResult from '@/global/validateForm'
import compInput from './compInput'
import compSelect from './compSelect'
import compCheckbox from './compCheckbox'
import compDatePicker from './compDatePicker'
export default {
  components: {
    compInput,
    compSelect,
    compCheckbox,
    compDatePicker
  },
  props: {
    reportId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loadingBtn: false,
      budgetData: {
        customerId: 0,
        companyId: 0,
        beginTime: '',
        endTime: '',
        budgetReportNormalInfo: [],
        budgetReportNewInfo: [],
        budgetReportRepurchaseInfo: []
      },
      listClient: [
        {
          label: '1',
          value: '无通用顶级域名注册计划'
        }
      ],
      listCheckbox1: [
        {
          label: '1',
          value: '无通用顶级域名注册计划'
        }
      ],
      listCheckbox2: [
        {
          label: '1',
          value: '无新顶级域名注册计划'
        }
      ],
      listCheckbox3: [
        {
          label: '1',
          value: '无域名回购计划'
        }
      ],
      budgetReportNormalInfo: false,
      budgetReportNewInfo: false,
      budgetReportRepurchaseInfo: false,
      showDelNormal: false,
      showAddNormal: true,
      showDelNew: false,
      showAddNew: true,
      showDelRepurchase: false,
      showAddRepurchase: true,
      defaultNormal: [],
      defaultNew: [],
      defaultRepurchase: []
    }
  },
  methods: {
    customerChange (val) {
      this.budgetData.customerId = val
    },
    companyChange (val) {
      this.budgetData.companyId = val
    },
    dataChange (val) {
      if (val.length === 2) {
        this.budgetData.beginTime = val[0] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(val[0]) : ''
        this.budgetData.endTime = val[1] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(val[1]) : ''
      } else {
        this.budgetData.beginTime = ''
        this.budgetData.endTime = ''
      }
    },
    addNormal () {
      let data = {
        'budgetType': '1',
        'domainSuffix': '',
        'price': '',
        'budgetNumber': ''
      }
      this.budgetData.budgetReportNormalInfo.push(data)
    },
    addNew () {
      let data = {
        'budgetType': '2',
        'domainSuffix': '',
        'price': '',
        'budgetNumber': ''
      }
      this.budgetData.budgetReportNewInfo.push(data)
    },
    addRepurchase () {
      let data = {
        'budgetType': '3',
        'domainName': '',
        'budgetPrice': '',
        'reason': ''
      }
      this.budgetData.budgetReportRepurchaseInfo.push(data)
    },
    delNormal (index) {
      this.budgetData.budgetReportNormalInfo.splice(index, 1)
    },
    delNew (index) {
      this.budgetData.budgetReportNewInfo.splice(index, 1)
    },
    delRepurchase (index) {
      this.budgetData.budgetReportRepurchaseInfo.splice(index, 1)
    },
    changeNormal (obj) {
      console.log(obj)
      if (obj.value.length) {
        this.addNormal()
        this.budgetReportNormalInfo = true
      } else {
        this.budgetData.budgetReportNormalInfo = []
        this.budgetReportNormalInfo = false
      }
    },
    changeNew (obj) {
      if (obj.value.length) {
        this.addNew()
        this.budgetReportNewInfo = true
      } else {
        this.budgetData.budgetReportNewInfo = []
        this.budgetReportNewInfo = false
      }
    },
    changeRepurchase (obj) {
      if (obj.value.length) {
        this.addRepurchase()
        this.budgetReportRepurchaseInfo = true
      } else {
        this.budgetData.budgetReportRepurchaseInfo = []
        this.budgetReportRepurchaseInfo = false
      }
    },
    formSubmit () {
      this.loadingBtn = true
      let validataItem = [].concat(
        this.$refs.customerId,
        this.$refs.companyId,
        this.$refs.time,
        this.$refs.domainSuffix ? this.$refs.domainSuffix : [],
        this.$refs.price ? this.$refs.price : [],
        this.$refs.budgetNumber ? this.$refs.budgetNumber : [],
        this.$refs.domainName ? this.$refs.domainName : [],
        this.$refs.budgetPrice ? this.$refs.budgetPrice : [],
        this.$refs.reason ? this.$refs.reason : []
      )
      let result = validateFormResult(validataItem)
      if (result) {
        let params = {
          param: this.budgetData,
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.$Message.success('停用成功')
            } else {
              this.$Message.error('停用失败')
            }
          }
        }
        console.log(params.param)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      queryBudgetReportDetail: types.QUERY_BUDGET_REPORT_DETAIL
    })
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    let params = {
      param: {
        reportId: this.reportId
      },
      callback: (response) => {
        this.loadingBtn = false
        if (response.data.code === '1000') {
          let budgetReportNormalInfo = []
          let budgetReportNewInfo = []
          let budgetReportRepurchaseInfo = []
          this.$set(this.budgetData, 'customerId', response.data.data.budgetReportInfo.customerId)
          this.$set(this.budgetData, 'companyId', response.data.data.budgetReportInfo.companyId)
          this.$set(this.budgetData, 'beginTime', response.data.data.budgetReportInfo.budgetCycleStart)
          this.$set(this.budgetData, 'endTime', response.data.data.budgetReportInfo.budgetCycleEnd)
          if (response.data.data.budgetReportDetailList.length) {
            response.data.data.budgetReportDetailList.map((v) => {
              if (v.budgetType === 1) {
                budgetReportNormalInfo.push(v)
              } else if (v.budgetType === 2) {
                budgetReportNewInfo.push(v)
              } else {
                budgetReportRepurchaseInfo.push(v)
              }
            })
            if (budgetReportNormalInfo.length) {
              this.budgetReportNormalInfo = true
              this.defaultNormal = ['1']
            }
            if (budgetReportNewInfo.length) {
              this.budgetReportNewInfo = true
              this.defaultNew = ['1']
            }
            if (budgetReportRepurchaseInfo.length) {
              this.budgetReportRepurchaseInfo = true
              this.defaultRepurchase = ['1']
            }

            this.$set(this.budgetData, 'budgetReportNormalInfo', budgetReportNormalInfo)
            this.$set(this.budgetData, 'budgetReportNewInfo', budgetReportNewInfo)
            this.$set(this.budgetData, 'budgetReportRepurchaseInfo', budgetReportRepurchaseInfo)
          }
        } else {
        }
      }
    }
    this.queryBudgetReportDetail(params)
  },
  watch: {
    budgetData: {
      handler (newV, oldV) {
        if (this.budgetReportNormalInfo) {
          if (newV.budgetReportNormalInfo.length > 1) {
            this.showDelNormal = true
          } else {
            this.showDelNormal = false
          }
        }
        if (this.budgetReportNewInfo) {
          if (newV.budgetReportNewInfo.length > 1) {
            this.showDelNew = true
          } else {
            this.showDelNew = false
          }
        }
        if (this.budgetReportRepurchaseInfo) {
          if (newV.budgetReportRepurchaseInfo.length > 1) {
            this.showDelRepurchase = true
          } else {
            this.showDelRepurchase = false
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style>
.compCreatBudgetReport{
  padding: 30px;
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
  margin: 7px 5px 0 0;
}
.compCreatBudgetReport table.table2 .col1{
  width: 90%;
}
.compCreatBudgetReport table.table2 .col2{
  width: 10%;
}
.compCreatBudgetReport table.table2 .col2 a{
  color: #2271f4;
  display:inline-block;
  margin: 7px 5px 0 0;
}
.compCreatBudgetReport table.table2 .ivu-form-item{
  width: 50%;
  display: inline-block;
  padding-bottom: 10px;
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
