<template lang="pug">
.compFocusDomainUpdate
  Form(:label-width="100")
    comp-input(name='domain',label="域名：",ref="domain",placeholder="",disabled="disabled",styles="width:250px",:defaultValue="domain")
    comp-input(name='domain',label="注册商：",ref="registrarName",placeholder="",styles="width:250px",:defaultValue="registrarName")
    comp-input(name='domain',label="域名所有人：",ref="whoisUserName",placeholder="",styles="width:250px",:defaultValue="whoisUserName")
    comp-input(name='domain',label="注册邮箱：",ref="whoisUserEmail",placeholder="",styles="width:250px",:defaultValue="whoisUserEmail")
    FormItem(label="注册时间：")
      comp-date-picker(label="注册时间", ref="whoisApplyTime",styles="width:250px",types="date",:defaultValue="whoisApplyTime")
    FormItem(label="到期时间：")
      comp-date-picker(label="到期时间", ref="whoisExpireTime",styles="width:250px",types="date",:defaultValue="whoisExpireTime")
    FormItem(label="更新日期：")
      comp-date-picker(label="更新日期", ref="whoisUpdateTime",styles="width:250px",types="date",:defaultValue="whoisUpdateTime")
    FormItem(label="域名状态：")
      comp-checkbox(:list="listCheckbox", ref="whoisDomainStatus",:defaultValue="whoisDomainStatus")
    comp-input(name='domain',label="DNS服务器1：",ref="whoisDomainDns1",placeholder="",styles="width:250px",:defaultValue="whoisDomainDns1")
    comp-input(name='domain',label="DNS服务器2：",ref="whoisDomainDns2",placeholder="",styles="width:250px",:defaultValue="whoisDomainDns2")
    comp-input(name='domain',label="IP地址：",ref="dnsIpContent",placeholder="",styles="width:250px",:defaultValue="dnsIpContent")
    comp-input(name='domain',label="IP的物理位置：",ref="dnsIpAddress",placeholder="",styles="width:250px",:defaultValue="dnsIpAddress")
    comp-input(name='domain',label="备案号：",ref="beianNum",placeholder="",styles="width:250px",:defaultValue="beianNum")
    comp-input(name='domain',label="备案主体：",ref="beianCompany",placeholder="",styles="width:250px",:defaultValue="beianCompany")
    FormItem(label="网站类型：")
      comp-select(name="siteType",:list="siteTypeList",ref="siteType",:defaultValue="siteType", styles="width:250px",)
    comp-input(name='domain',label="网站标题：",ref="siteTitle",placeholder="",styles="width:250px",:defaultValue="siteTitle")
    comp-input(name='domain',label="关键词：",ref="siteKey",placeholder="",styles="width:250px",:defaultValue="siteKey")
    comp-input(name='domain',label="网站描述：",ref="siteDesc",placeholder="",styles="width:250px",:defaultValue="siteDesc")
    FormItem(label="")
      Button(type="primary",@click="submitForm",:loading="loadingBtn") 保存
</template>

<script>
import compInput from './compInput'
import compSelect from './compSelect'
import compDatePicker from './compDatePicker'
import compCheckbox from './compCheckbox'
import validateFormResult from '@/global/validateForm'
import moment from 'moment'
export default {
  components: {
    compInput,
    compSelect,
    compDatePicker,
    compCheckbox
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loadingBtn: false,
      domain: '',
      registrarName: '',
      whoisUserName: '',
      whoisUserEmail: '',
      whoisApplyTime: [],
      whoisExpireTime: [],
      whoisUpdateTime: [],
      whoisDomainStatus: [],
      whoisDomainDns1: '',
      whoisDomainDns2: '',
      dnsIpContent: '',
      dnsSelfIpContent: '',
      dnsIpAddress: '',
      beianNum: '',
      siteType: '',
      beianCompany: '',
      beianCompanyType: '',
      beianAuditTime: '',
      siteTitle: '',
      siteKey: '',
      siteDesc: '',
      listCheckbox: [
        {
          label: 'ok',
          value: 'ok'
        },
        {
          label: 'Active',
          value: 'Active'
        },
        {
          label: 'inactive',
          value: 'inactive'
        },
        {
          label: 'clientDeleteProhibited',
          value: 'clientDeleteProhibited'
        },
        {
          label: 'clientUpdateProhibited',
          value: 'clientUpdateProhibited'
        },
        {
          label: 'clientTransferProhibited',
          value: 'clientTransferProhibited'
        },
        {
          label: 'clientRenewProhibited',
          value: 'clientRenewProhibited'
        },
        {
          label: 'serverUpdateProhibited',
          value: 'serverUpdateProhibited'
        },
        {
          label: 'serverDeleteProhibited',
          value: 'serverDeleteProhibited'
        },
        {
          label: 'serverRenewProhibited',
          value: 'serverRenewProhibited'
        },
        {
          label: 'pendingTransfer',
          value: 'pendingTransfer'
        },
        {
          label: 'redemptionPeriod',
          value: 'redemptionPeriod'
        },
        {
          label: 'pendingDelete',
          value: 'pendingDelete'
        },
        {
          label: 'pendingVerification',
          value: 'pendingVerification'
        },
        {
          label: 'clientHold',
          value: 'clientHold'
        },
        {
          label: 'serverHold',
          value: 'serverHold'
        }
      ],
      siteTypeList: [
        {
          value: '0',
          label: '未建站'
        },
        {
          value: '1',
          label: '正规网站'
        },
        {
          value: '2',
          label: '非法网站'
        },
        {
          value: '3',
          label: '出售网站'
        }
      ]
    }
  },
  methods: {
    submitForm () {
      this.loadingBtn = true
      // let result = validateFormResult([
      //   this.$refs.registrarName,
      //   this.$refs.whoisUserName,
      //   this.$refs.whoisUserEmail,
      //   this.$refs.whoisApplyTime,
      //   this.$refs.whoisExpireTime,
      //   this.$refs.whoisUpdateTime,
      //   this.$refs.whoisDomainStatus,
      //   this.$refs.whoisDomainDns1,
      //   this.$refs.whoisDomainDns2,
      //   this.$refs.dnsIpContent,
      //   this.$refs.dnsIpAddress,
      //   this.$refs.beianNum,
      //   this.$refs.beianCompany,
      //   this.$refs.siteTitle,
      //   this.$refs.siteKey,
      //   this.$refs.siteDesc
      // ])
      let result = true
      if (result) {
        console.log('============================')
        console.log(this.$refs.whoisDomainDns2.value)
        var params = {
          id: this.id,
          registrarName: this.$refs.registrarName.value,
          whoisUserName: this.$refs.whoisUserName.value,
          whoisUserEmail: this.$refs.whoisUserEmail.value,
          whoisApplyTime: this.$refs.whoisApplyTime.value ? moment(this.$refs.whoisApplyTime.value).format('YYYY-MM-DD') : '',
          whoisExpireTime: this.$refs.whoisExpireTime.value ? moment(this.$refs.whoisExpireTime.value).format('YYYY-MM-DD') : '',
          whoisUpdateTime: this.$refs.whoisUpdateTime.value ? moment(this.$refs.whoisUpdateTime.value).format('YYYY-MM-DD') : '',
          whoisDomainStatus: this.$refs.whoisDomainStatus.value.join(','),
          whoisDomainDns: (this.$refs.whoisDomainDns1.value.length && this.$refs.whoisDomainDns2.value.length) ? (this.$refs.whoisDomainDns1.value + ',' + this.$refs.whoisDomainDns2.value) : (this.$refs.whoisDomainDns1.value + this.$refs.whoisDomainDns2.value),
          dnsIpContent: this.$refs.dnsIpContent.value,
          dnsIpAddress: this.$refs.dnsIpAddress.value,
          beianNum: this.$refs.beianNum.value,
          beianCompany: this.$refs.beianCompany.value,
          siteType: this.$refs.siteType.value,
          siteTitle: this.$refs.siteTitle.value,
          siteKey: this.$refs.siteKey.value,
          siteDesc: this.$refs.siteDesc.value
        }
        console.log(params)
        this.$store.dispatch('FOLLOW_DOMAIN_UPDATE', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success(`修改成功`)
            // close
            this.$emit('closeDrawer')
            // 添加成功，重新加载列表数据
            this.$emit('refreshData')
          } else {
            // if (response.data.code === '100') {
            //   this.$Message.error('模板不存在')
            // } else if (response.data.code === '200') {
            //   this.$Message.error('分组不存在')
            // } else if (response.data.code === '300') {
            //   this.$Message.error('账户错误')
            // } else if (response.data.code === '400') {
            //   this.$Message.error('json数据错误')
            // } else {
            // }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    },
    getInfoHandle () {
      this.$store.dispatch('FOLLOW_DOMAIN_INFO', {id: this.id}).then(response => {
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.domain = response.data.data.domainName
          this.registrarName = response.data.data.registrarName
          this.whoisUserName = response.data.data.whoisUserName
          this.whoisUserEmail = response.data.data.whoisUserEmail
          this.$set(this.whoisApplyTime, 0, response.data.data.whoisApplyTime)
          this.$set(this.whoisExpireTime, 0, response.data.data.whoisExpireTime)
          this.$set(this.whoisUpdateTime, 0, response.data.data.whoisUpdateTime)
          // this.whoisApplyTime[0] = response.data.data.whoisApplyTime
          // this.whoisExpireTime[0] = response.data.data.whoisExpireTime
          // this.whoisUpdateTime[0] = response.data.data.whoisUpdateTime
          // this.$set(this.whoisDomainStatus, 0, response.data.data.whoisDomainStatus.split(',')[0])
          // this.$set(this.whoisDomainStatus, 1, response.data.data.whoisDomainStatus.split(',')[1])
          this.whoisDomainStatus = response.data.data.whoisDomainStatus.split(',')
          this.whoisDomainDns1 = response.data.data.whoisDomainDns.split(',').length > 0 ? response.data.data.whoisDomainDns.split(',')[0] : ''
          this.whoisDomainDns2 = response.data.data.whoisDomainDns.split(',').length > 1 ? response.data.data.whoisDomainDns.split(',')[1] : ''
          this.dnsIpContent = response.data.data.dnsIpContent
          this.dnsIpAddress = response.data.data.dnsIpAddress
          this.beianNum = response.data.data.beianNum
          this.beianCompany = response.data.data.beianCompany
          this.siteType = response.data.data.siteType + ''
          this.siteTitle = response.data.data.siteTitle
          this.siteKey = response.data.data.siteKey
          this.siteDesc = response.data.data.siteDesc
        } else {
          // if (response.data.code === '100') {
          //   this.$Message.error('模板不存在')
          // } else if (response.data.code === '200') {
          //   this.$Message.error('分组不存在')
          // } else if (response.data.code === '300') {
          //   this.$Message.error('账户错误')
          // } else if (response.data.code === '400') {
          //   this.$Message.error('json数据错误')
          // } else {
          // }
        }
      }).catch(() => {})
    }
  },
  computed: {
  },
  beforeMount () {

  },
  mounted () {
    if (this.id !== 0) {
      this.getInfoHandle()
    }
  },
  watch: {
  }
}
</script>
<style>
.compFocusDomainUpdate{
  padding: 0 30px 30px 30px;
}
.compFocusDomainUpdate .ivu-btn{
  margin-top: 30px;
}
.compFocusDomainUpdate .ivu-picker-panel-icon-btn i{
  width: 28px;
}
</style>
