<template lang="pug">
  Form.compCreatBudgetReport(:label-width="150",)
    FormItem(label="客户：")
      comp-select(name='customerId',label="客户", :list="listClient",ref="customerId",:defaultValue="budgetData.customerId.toString()", :on-parentmethod="customerChange")
    FormItem(label="预算周期：")
      comp-date-picker(label="预算周期", ref="time", :on-parentmethod="dataChange", :defaultValue="[budgetData.beginTime, budgetData.endTime]")
    div.secT
      span.t 通用顶级域名注册
      comp-checkbox(:list="listCheckbox1", ref="budgetType1", :on-parentmethod="changeNormal", :defaultValue="defaultNormal")
    table.table1
      tr(v-for="(item, index) in budgetData.budgetReportNormalInfo", v-if="item.budgetType * 1 === 1")
        td.col1
          comp-input(:name="'domainSuffixNormal_' + index" ,label="后缀：", :ref="'domainSuffixNormal_' + index", :defaultValue="item.domainSuffix.toString()", styles="width: 80px;", :on-parentmethod="domainSuffixNormalChange")
            span(slot="left", style="display:inline-block;margin-right: 3px") .
        td.col2
          comp-input(:name="'priceNormal_' + index", label="1年价格：", :ref="'priceNormal_' + index", :defaultValue="item.price.toString()", styles="width: 80px;", validate="money", :on-parentmethod="priceNormalChange")
            span(slot="right") 元
        td.col3
          comp-input(:name="'budgetNumberNormal_' + index", label="数量：", :ref="'budgetNumberNormal_' + index", :defaultValue="item.budgetNumber.toString()", styles="width: 80px;", validate="number", :on-parentmethod="budgetNumberNormalChange")
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
          comp-input(:name="'domainSuffixNew_' + index", label="后缀：", :ref="'domainSuffixNew_' + index", :defaultValue="item.domainSuffix.toString()", styles="width: 80px;", :on-parentmethod="domainSuffixNewChange")
            span(slot="left", style="display:inline-block;margin-right: 3px") .
        td.col2
          comp-input(:name="'priceNew_' + index", label="1年价格：", :ref="'priceNew_' + index", :defaultValue="item.price.toString()", styles="width: 80px;", validate="money", :on-parentmethod="priceNewChange")
            span(slot="right") 元
        td.col3
          comp-input(:name="'budgetNumberNew_' + index" ,label="数量：", :ref="'budgetNumberNew_' + index", :defaultValue="item.budgetNumber.toString()", styles="width: 80px;", validate="number", :on-parentmethod="budgetNumberNewChange")
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
          comp-input(:name="'domainName_' + index", label="域名：", :ref="'domainName_' + index", :defaultValue="item.domainName.toString()", styles="width: 171px;", :on-parentmethod="domainNameChange")
          comp-input(:name="'budgetPrice_' + index", label="预估价格：", :ref="'budgetPrice_' + index", :defaultValue="item.budgetPrice.toString()", styles="width: 171px;", validate="money", :on-parentmethod="budgetPriceChange")
            span(slot="right") 元
          comp-input(:name="'reason_' + index", label="域回购原因：", :ref="'reason_' + index", :defaultValue="item.reason.toString()", styles="width: 445px;", :maxLength="30", :on-parentmethod="reasonChange")
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
    onClose: {
      type: Function
    },
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
    customerChange (obj) {
      this.budgetData.customerId = obj.value
    },
    domainSuffixNormalChange (vm) {
      let index = vm.name.split("_")[1]
      let ref = vm.name
      this.$set(this.budgetData.budgetReportNormalInfo[index], 'domainSuffix', this.$refs[ref][0].value)
    },
    priceNormalChange (vm) {
      let index = vm.name.split("_")[1]
      let ref = vm.name
      this.$set(this.budgetData.budgetReportNormalInfo[index], 'price', this.$refs[ref][0].value)
    },
    budgetNumberNormalChange (vm) {
      let index = vm.name.split("_")[1]
      let ref = vm.name
      this.$set(this.budgetData.budgetReportNormalInfo[index], 'budgetNumber', this.$refs[ref][0].value)
    },
    domainSuffixNewChange (vm) {
      let index = vm.name.split("_")[1]
      let ref = vm.name
      this.$set(this.budgetData.budgetReportNewInfo[index], 'domainSuffix', this.$refs[ref][0].value)
    },
    priceNewChange (vm) {
      let index = vm.name.split("_")[1]
      let ref = vm.name
      this.$set(this.budgetData.budgetReportNewInfo[index], 'price', this.$refs[ref][0].value)
    },
    budgetNumberNewChange (vm) {
      let index = vm.name.split("_")[1]
      let ref = vm.name
      this.$set(this.budgetData.budgetReportNewInfo[index], 'budgetNumber', this.$refs[ref][0].value)
    },
    domainNameChange (vm) {
      let index = vm.name.split("_")[1]
      let ref = vm.name
      this.$set(this.budgetData.budgetReportRepurchaseInfo[index], 'domainName', this.$refs[ref][0].value)
    },
    budgetPriceChange (vm) {
      let index = vm.name.split("_")[1]
      let ref = vm.name
      this.$set(this.budgetData.budgetReportRepurchaseInfo[index], 'budgetPrice', this.$refs[ref][0].value)
    },
    reasonChange (vm) {
      let index = vm.name.split("_")[1]
      let ref = vm.name
      this.$set(this.budgetData.budgetReportRepurchaseInfo[index], 'reason', this.$refs[ref][0].value)
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
        "id": 0,
        "budgetType": '1',
        "domainSuffix": '',
        "price": '',
        "budgetNumber": '',
        "domainName": '',
        "budgetPrice": '',
        "reason": '',
        "reportId": 0,
        "createTime": '',
        'operatorType': 'new'
      }
      this.budgetData.budgetReportNormalInfo.push(data)
    },
    addNew () {
      let data = {
        "id": 0,
        "budgetType": '2',
        "domainSuffix": '',
        "price": '',
        "budgetNumber": '',
        "domainName": '',
        "budgetPrice": '',
        "reason": '',
        "reportId": 0,
        "createTime": '',
        'operatorType': 'new'
      }
      this.budgetData.budgetReportNewInfo.push(data)
    },
    addRepurchase () {
      let data = {
        "id": 0,
        "budgetType": '3',
        "domainSuffix": '',
        "price": '',
        "budgetNumber": '',
        "domainName": '',
        "budgetPrice": '',
        "reason": '',
        "reportId": 0,
        "createTime": '',
        'operatorType': 'new'
      }
      this.budgetData.budgetReportRepurchaseInfo.push(data)
    },
    delNormal (index) {
      console.log(this.budgetData.budgetReportNormalInfo)
      if (this.budgetData.budgetReportNormalInfo[index].id === 0) {
        this.budgetData.budgetReportNormalInfo.splice(index, 1)
      } else {
        let params = {
          param: this.budgetData.budgetReportNormalInfo[index],
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.budgetData.budgetReportNormalInfo.splice(index, 1)
              // this.$delete(this.budgetData.budgetReportNormalInfo, index)
              this.$Message.success('删除成功')
            } else {
              this.$Message.error('删除失败')
            }
          }
        }
        params.param.operatorType = 'delete'
        this.updateBudgetReport(params)
      }
    },
    delNew (index) {
      if (this.budgetData.budgetReportNewInfo[index].id === 0) {
        this.budgetData.budgetReportNewInfo.splice(index, 1)
      } else {
        let params = {
          param: this.budgetData.budgetReportNewInfo[index],
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.budgetData.budgetReportNewInfo.splice(index, 1)
              this.$Message.success('删除成功')
            } else {
              this.$Message.error('删除失败')
            }
          }
        }
        params.param.operatorType = 'delete'
        this.updateBudgetReport(params)
      }
    },
    delRepurchase (index) {
      if (this.budgetData.budgetReportRepurchaseInfo[index].id === 0) {
        this.budgetData.budgetReportRepurchaseInfo.splice(index, 1)
      } else {
        let params = {
          param: this.budgetData.budgetReportRepurchaseInfo[index],
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.budgetData.budgetReportRepurchaseInfo.splice(index, 1)
              this.$Message.success('删除成功')
            } else {
              this.$Message.error('删除失败')
            }
          }
        }
        params.param.operatorType = 'delete'
        this.updateBudgetReport(params)
      }
    },
    changeNormal (obj) {
      if (!obj.value.length) {
        this.addNormal()
      } else {
        this.budgetData.budgetReportNormalInfo = []
      }
    },
    changeNew (obj) {
      if (!obj.value.length) {
        this.addNew()
      } else {
        this.budgetData.budgetReportNewInfo = []
      }
    },
    changeRepurchase (obj) {
      if (!obj.value.length) {
        this.addRepurchase()
      } else {
        this.budgetData.budgetReportRepurchaseInfo = []
      }
    },
    formSubmit () {
      this.loadingBtn = true
      let validataItem = [
        this.$refs.customerId,
        this.$refs.time
      ]
      if (this.budgetData.budgetReportNormalInfo.length) {
        this.budgetData.budgetReportNormalInfo.map((v, i) => {
          validataItem.push(this.$refs['domainSuffixNormal_' + i][0])
          validataItem.push(this.$refs['priceNormal_' + i][0])
          validataItem.push(this.$refs['budgetNumberNormal_' + i][0])
        })
      }
      if (this.budgetData.budgetReportNewInfo.length) {
        this.budgetData.budgetReportNewInfo.map((v, i) => {
          validataItem.push(this.$refs['domainSuffixNew_' + i][0])
          validataItem.push(this.$refs['priceNew_' + i][0])
          validataItem.push(this.$refs['budgetNumberNew_' + i][0])
        })
      }
      if (this.budgetData.budgetReportRepurchaseInfo.length) {
        this.budgetData.budgetReportRepurchaseInfo.map((v, i) => {
          validataItem.push(this.$refs['domainName_' + i][0])
          validataItem.push(this.$refs['budgetPrice_' + i][0])
          validataItem.push(this.$refs['reason_' + i][0])
        })
      }
      let result = validateFormResult(validataItem)
      if (result) {
        let params = {
          param: this.budgetData,
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.$Message.success('修改成功')
              this.onClose()
              // this.$emit('refreshData')
            } else {
              this.$Message.error('修改失败')
            }
          }
        }
        params.param.budgetReportNormalInfo = params.param.budgetReportNormalInfo.concat(params.param.budgetReportNewInfo)
        console.log(params.param)
        this.updateBudgetReport(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      queryBudgetReportDetail: types.QUERY_BUDGET_REPORT_DETAIL,
      queryClientList: types.QUERY_CLIENT_LIST,
      updateBudgetReport: types.UPDATE_BUDGET_REPORT
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
          this.$set(this.budgetData, 'beginTime', response.data.data.budgetReportInfo.budgetCycleStart)
          this.$set(this.budgetData, 'endTime', response.data.data.budgetReportInfo.budgetCycleEnd)
          if (response.data.data.budgetReportDetailList.length) {
            response.data.data.budgetReportDetailList.map((v) => {
              v.operatorType = 'update'
              if (v.budgetType === 1) {
                budgetReportNormalInfo.push(v)
              } else if (v.budgetType === 2) {
                budgetReportNewInfo.push(v)
              } else {
                budgetReportRepurchaseInfo.push(v)
              }
            })
            if (!budgetReportNormalInfo.length) {
              this.defaultNormal = ['1']
            }
            if (!budgetReportNewInfo.length) {
              this.defaultNew = ['1']
            }
            if (!budgetReportRepurchaseInfo.length) {
              this.defaultRepurchase = ['1']
            }

            this.$set(this.budgetData, 'budgetReportNormalInfo', budgetReportNormalInfo)
            this.$set(this.budgetData, 'budgetReportNewInfo', budgetReportNewInfo)
            this.$set(this.budgetData, 'budgetReportRepurchaseInfo', budgetReportRepurchaseInfo)
          } else {
            this.defaultNormal = ['1']
            this.defaultNew = ['1']
            this.defaultRepurchase = ['1']
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
        if (newV.budgetReportNormalInfo.length > 1) {
          this.showDelNormal = true
        } else {
          this.showDelNormal = false
        }

        if (newV.budgetReportNewInfo.length > 1) {
          this.showDelNew = true
        } else {
          this.showDelNew = false
        }

        if (newV.budgetReportRepurchaseInfo.length > 1) {
          this.showDelRepurchase = true
        } else {
          this.showDelRepurchase = false
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
