<template lang="pug">
.compFocusDomainUpdate
  Form(:label-width="100")
    comp-input(name='domain',label="域名：",ref="domain",placeholder="每行一个域名，最多一次添加500个",styles="width:250px")
    comp-input(name='domain',label="注册商：",ref="registrarName",placeholder="",styles="width:250px")
    comp-input(name='domain',label="域名所有人：",ref="whoisUserName",placeholder="",styles="width:250px")
    comp-input(name='domain',label="注册邮箱：",ref="whoisUserEmail",placeholder="",styles="width:250px")
    FormItem(label="注册时间：")
      comp-date-picker(label="注册时间", ref="whoisApplyTime",styles="width:250px")
    FormItem(label="到期时间：")
      comp-date-picker(label="到期时间", ref="whoisExpireTime",styles="width:250px")
    FormItem(label="更新日期：")
      comp-date-picker(label="更新日期", ref="whoisUpdateTime",styles="width:250px")
    FormItem(label="域名状态：")
      comp-checkbox(:list="listCheckbox", ref="whoisDomainStatus")
    comp-input(name='domain',label="DNS服务器1：",ref="whoisDomainDns1",placeholder="",styles="width:250px")
    comp-input(name='domain',label="DNS服务器2：",ref="whoisDomainDns2",placeholder="",styles="width:250px")
    comp-input(name='domain',label="IP地址：",ref="dnsIpContent",placeholder="",styles="width:250px")
    comp-input(name='domain',label="IP的物理位置：",ref="dnsIpAddress",placeholder="",styles="width:250px")
    comp-input(name='domain',label="备案号：",ref="beianNum",placeholder="",styles="width:250px")
    comp-input(name='domain',label="备案主体：",ref="beianCompany",placeholder="",styles="width:250px")
    comp-input(name='domain',label="网站标题：",ref="siteTitle",placeholder="",styles="width:250px")
    comp-input(name='domain',label="关键词：",ref="siteKey",placeholder="",styles="width:250px")
    comp-input(name='domain',label="网站描述：",ref="siteDesc",placeholder="",styles="width:250px")
    FormItem(label="")
      Button(type="primary",@click="submitForm",:loading="loadingBtn") 保存
</template>

<script>
import { mapState } from 'vuex'
import compInput from './compInput'
import compSelect from './compSelect'
import compDatePicker from './compDatePicker'
import compCheckbox from './compCheckbox'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compSelect,
    compDatePicker,
    compCheckbox
  },
  props: {
    userCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loadingBtn: false,
      templateList: [],
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
      ]
    }
  },
  methods: {
    close () {
      this.onClose()
    },
    submitForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.registrarName,
        this.$refs.whoisUserName,
        this.$refs.whoisUserEmail,
        this.$refs.whoisApplyTime,
        this.$refs.whoisExpireTime,
        this.$refs.whoisUpdateTime,
        this.$refs.whoisDomainStatus,
        this.$refs.whoisDomainDns1,
        this.$refs.whoisDomainDns2,
        this.$refs.dnsIpContent,
        this.$refs.dnsIpAddress,
        this.$refs.beianNum,
        this.$refs.beianCompany,
        this.$refs.siteTitle,
        this.$refs.siteKey,
        this.$refs.siteDesc
      ])

      if (result) {
        var params = {
          templateId: this.$refs.templateId.value,
          groupId: this.$refs.groupId.value,
          jsonObj: this.$refs.domain.value.replace(/[\n\r]/g, ',').split(',').map((v) => {
            return {
              domainName: v.split(' ')[0],
              domainPwd: v.split(' ')[1],
              orderGoodsType: 5,
              orderType: 4
            }
          })
        }
        this.$store.dispatch('ORDER_CONFIRM', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            response.data.jsonObj.map((v) => {
              v.price = v.goodsNumAndPrice[0].price + '_' + v.goodsNumAndPrice[0].unit
              v.num = v.goodsNumAndPrice[0].num
              v.unit = v.goodsNumAndPrice[0].unit
            })
            // this.$store.commit('SET_PAY_ORDERS', response.data)
            // this.$router.push({path: '/payConfirm'})
            localStorage.setItem('data_pay_confirm', JSON.stringify(response.data))
            newWin.location.href = '/payConfirm'
          } else {
            newWin.close()
            if (response.data.code === '100') {
              this.$Message.error('模板不存在')
            } else if (response.data.code === '200') {
              this.$Message.error('分组不存在')
            } else if (response.data.code === '300') {
              this.$Message.error('账户错误')
            } else if (response.data.code === '400') {
              this.$Message.error('json数据错误')
            } else {
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    }
  },
  computed: {
    ...mapState({
      userAuthGroups (state) {
        let arrGroups = []
        arrGroups = this.GLOBALS.CONVERT_SELECT_GROUP(state.user.userAuthGroups.companys, {
          value: 'id',
          label: 'name',
          children: 'groups'
        })
        return arrGroups
      }
    })
  },
  beforeMount () {
    this.$store.dispatch('TEMPLATES').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.templateList = this.GLOBALS.CONVERT_SELECT(response.data.data, {
          label: 'templateName',
          value: 'id'
        })
      } else {
      }
    }).catch(() => {})
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
