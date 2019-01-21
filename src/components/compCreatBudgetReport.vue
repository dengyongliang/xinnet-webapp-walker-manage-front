<template lang="pug">
  Form.compCreatBudgetReport(:label-width="150",)
    FormItem(label="客户：")
      comp-select(name='customerId',label="客户", :list="listClient",ref="customerId",defaultValue="", :on-parentmethod="customerChange")
    FormItem(label="预算周期：")
      comp-date-picker(label="预算周期", ref="time", :on-parentmethod="dataChange",)
    div.secT
      span.t 通用顶级域名注册
      comp-checkbox(:list="listCheckbox1", ref="budgetType1", :on-parentmethod="changeNormal",)
    table.table1
      tr(v-for="(item, index) in budgetData.budgetReportNormalInfo", :key="index")
        td.col1
          comp-input(name='domainSuffix',label="后缀：", :ref="'domainSuffixNormal' + index", :defaultValue="item.domainSuffix", styles="width: 80px;",)
            span(slot="left", style="display:inline-block;margin-right: 3px") .
        td.col2
          comp-input(name='price',label="1年价格：", :ref="'priceNormal' + index", :defaultValue="item.price", styles="width: 80px;", validate="money")
            span(slot="right") 元
        td.col3
          comp-input(name='budgetNumber',label="数量：", :ref="'budgetNumberNormal' + index", :defaultValue="item.budgetNumber", styles="width: 80px;", validate="number")
            span(slot="right") 个
        td.col4(valign="top")
          a(href="javascript:;", @click="delNormal(index)", v-show="showDelNormal") 删除
          a(href="javascript:;", @click="addNormal", v-show="showAddNormal && index===budgetData.budgetReportNormalInfo.length-1") 增加

    div.secT
      span.t 新顶级域名注册
      comp-checkbox(:list="listCheckbox2", ref="budgetType2", :on-parentmethod="changeNew")
    table.table1
      tr(v-for="(item, index) in budgetData.budgetReportNewInfo", :key="index")
        td.col1
          comp-input(name='domainSuffix',label="后缀：", :ref="'domainSuffix' + index", :defaultValue="item.domainSuffix", styles="width: 80px;")
            span(slot="left", style="display:inline-block;margin-right: 3px") .
        td.col2
          comp-input(name='price',label="1年价格：", :ref="'price' + index", :defaultValue="item.price", styles="width: 80px;", validate="money")
            span(slot="right") 元
        td.col3
          comp-input(name='budgetNumber',label="数量：", :ref="'budgetNumber' + index", :defaultValue="item.budgetNumber", styles="width: 80px;", validate="number")
            span(slot="right") 个
        td.col4(valign="top")
          a(href="javascript:;", @click="delNew(index)", v-show="showDelNew") 删除
          a(href="javascript:;", @click="addNew", v-show="showAddNew && index===budgetData.budgetReportNewInfo.length-1") 增加

    div.secT
      span.t 域名回购
      comp-checkbox(:list="listCheckbox3", ref="budgetType3", :on-parentmethod="changeRepurchase")
    table.table2
      tr(v-for="(item, index) in budgetData.budgetReportRepurchaseInfo", :key="index")
        td.col1
          comp-input(name='domainName',label="域名：", :ref="'domainName' + index", :defaultValue="item.domainName", styles="width: 171px;")
          comp-input(name='budgetPrice',label="预估价格：", :ref="'budgetPrice' + index", :defaultValue="item.budgetPrice", styles="width: 171px;", validate="money")
            span(slot="right") 元
          comp-input(name='reason',label="域回购原因：", :ref="'reason' + index", :defaultValue="item.reason", styles="width: 445px;", :maxLength="30")
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

  },
  data () {
    return {
      loadingBtn: false,
      budgetData: {
        customerId: 0,
        beginTime: '',
        endTime: '',
        budgetReportNormalInfo: [],
        budgetReportNewInfo: [],
        budgetReportRepurchaseInfo: []
      },
      listClient: [],
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
      showAddRepurchase: true
    }
  },
  methods: {
    customerChange (obj) {
      this.budgetData.customerId = obj.value
    },
    dataChange (val) {
      if (val.length === 2) {
        this.budgetData.beginTime = val[0] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(val[0]) + ' 00:00:00' : ''
        this.budgetData.endTime = val[1] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(val[1]) + ' 00:00:00' : ''
      } else {
        this.budgetData.beginTime = ''
        this.budgetData.endTime = ''
      }
    },
    addNormal () {
      let data = {
        'budgetType': '1',
        'domainSuffix': '1',
        'price': '1',
        'budgetNumber': '1'
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
      this.$set(this.budgetData.budgetReportNormalInfo, index, {
        'budgetType': '1',
        'domainSuffix': '3333',
        'price': '333',
        'budgetNumber': '4444'
      })
      console.log(this.budgetData.budgetReportNormalInfo)
      // this.budgetData.budgetReportNormalInfo.splice(index, 1)
    },
    delNew (index) {
      this.budgetData.budgetReportNewInfo.splice(index, 1)
    },
    delRepurchase (index) {
      this.budgetData.budgetReportRepurchaseInfo.splice(index, 1)
    },
    changeNormal (obj) {
      if (!obj.value.length) {
        this.addNormal()
        this.budgetReportNormalInfo = true
      } else {
        this.budgetData.budgetReportNormalInfo = []
        this.budgetReportNormalInfo = false
      }
    },
    changeNew (obj) {
      if (!obj.value.length) {
        this.addNew()
        this.budgetReportNewInfo = true
      } else {
        this.budgetData.budgetReportNewInfo = []
        this.budgetReportNewInfo = false
      }
    },
    changeRepurchase (obj) {
      if (!obj.value.length) {
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
              this.$Message.success('创建成功')
              this.$emit('refreshData')
            } else {
              this.$Message.error('创建失败')
            }
          }
        }
        params.param.budgetReportNormalInfo = params.param.budgetReportNormalInfo.concat(this.budgetData.budgetReportNewInfo)

        // 赋值
        if (params.param.budgetReportNormalInfo.length) {
          params.param.budgetReportNormalInfo.map((v, i) => {
            v.domainSuffix = this.$refs.domainSuffix[i].value
            v.price = this.$refs.price[i].value
            v.budgetNumber = this.$refs.budgetNumber[i].value
          })
        }
        if (params.param.budgetReportRepurchaseInfo.length) {
          params.param.budgetReportRepurchaseInfo.map((v, i) => {
            v.domainName = this.$refs.domainName[i].value
            v.budgetPrice = this.$refs.budgetPrice[i].value
            v.reason = this.$refs.reason[i].value
          })
        }

        console.log(params.param)
        this.addBudgetReport(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      creatNewAccount: types.CREAT_NEW_ACCOUNT,
      queryClientList: types.QUERY_CLIENT_LIST,
      addBudgetReport: types.ADD_BUDGET_REPORT
    })
  },
  computed: {
  },
  beforeMount () {
    let params = {
      param: {},
      callback: (response) => {
        if (response.data.code === '1000') {
          let data = response.data.data.list
          if (data.length > 0) {
            this.listClient = data.map(function (value, index, array) {
              return {value: value.id, label: value.name}
            })
          }
        } else {
          this.$Message.error('客户查询失败')
        }
      }
    }
    this.queryClientList(params)
  },
  mounted () {
    this.addNormal()
    this.addNew()
    this.addRepurchase()
  },
  watch: {
    budgetData: {
      handler (newV, oldV) {
        if (!this.budgetReportNormalInfo) {
          if (newV.budgetReportNormalInfo.length > 1) {
            this.showDelNormal = true
          } else {
            this.showDelNormal = false
          }
        }
        if (!this.budgetReportNewInfo) {
          if (newV.budgetReportNewInfo.length > 1) {
            this.showDelNew = true
          } else {
            this.showDelNew = false
          }
        }
        if (!this.budgetReportRepurchaseInfo) {
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
