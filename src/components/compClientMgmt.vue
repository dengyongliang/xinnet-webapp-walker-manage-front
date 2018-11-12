<template lang="pug">
  Form(:label-width="150")
    strong.t 基本信息
    comp-input(name='enterprise',label="企业名称：",:show="status==='creat' || modify",ref="enterprise",:defaultValue="enterprise",:maxLength="64")
      span.text(v-if="status==='view' && !modify",slot="left") {{enterprise}}
    comp-input(name='orgCode',label="机构代码证号：",:show="status==='creat' || modify",ref="orgCode",:defaultValue="orgCode",:maxLength="30")
      span.text(v-if="status==='view' && !modify",slot="left") {{orgCode}}
    FormItem(label="客户ID：",v-if="status=='view'")
      input(type="hidden",:value="id", ref="id")
      span.text() {{id}}
    comp-input(name='accountPeriod',label="账期：",:show="status==='creat' || modify",ref="accountPeriod",:defaultValue="accountPeriod",:number="true")
      span.text(v-if="status==='view' && !modify",slot="left") {{accountPeriod}}
      span.unit(slot="right") 个月
    comp-input(name='creditBalance',label="额度：",:show="status==='creat' || modify",ref="creditBalance",:defaultValue="creditBalance",:number="true")
      span.text(v-if="status==='view' && !modify",slot="left") {{creditBalance}}
      span.unit(slot="right") 元
    FormItem(label="状态：",v-if="status=='view'")
      span.text(v-if="open===1") 已开启
      span.text(v-if="open===2") 已关闭
    FormItem(label="管家：")
      span.text(v-show="status==='view' && !modify") {{customerUserId}}
      comp-select(name="customerUserId",:list="butlerList",ref="customerUserId",v-show="status==='creat' || modify")

      a(href="javascript:;", @click="closeButler",v-show="status==='view'") 停用管家账号

    FormItem(label="机构代码证：")
      comp-img-upload(:modify="modify",name="upfile",:file="orgFile",:status="status",ref="orgFile",errorText="请上传机构代码证！")

    Divider(:dashed='true')

    strong.t 联系人信息
    comp-input(name='contactor',label="联系人：",:show="status==='creat' || modify",ref="contactor",:defaultValue="contactor")
      span.text(v-if="status==='view' && !modify",slot="left") {{contactor}}
    comp-input(name='userMobile',label="手机：",:show="status==='creat' || modify",ref="mobile",:defaultValue="mobile")
      span.text(v-if="status==='view' && !modify",slot="left") {{mobile}}
    comp-input(name='userEmail',label="邮箱：",:show="status==='creat' || modify",ref="email",:defaultValue="email",:maxLength="64")
      span.text(v-if="status==='view' && !modify",slot="left") {{email}}
    comp-input(name='tel',label="固话：",:show="status==='creat' || modify",ref="tel",:defaultValue="tel",:required="false")
      span.text(v-if="status==='view' && !modify",slot="left") {{tel}}
      span.unit(v-if="status==='creat' || modify",slot="right") 非必填

    FormItem(label="")
      Button(type="primary",@click="btnSubmit('new')",v-show='status==="creat"',:loading="loadingBtn") 确定
      Button(type="primary",@click="btnModify",v-show='status==="view" && !modify') 修改
      Button(type="primary",@click="btnSubmit('reset')",v-show='status==="view" && modify',:loading="loadingBtn") 保存
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import compImgUpload from './compImgUpload'
import compSelect from './compSelect'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compImgUpload,
    compSelect
  },
  props: {
    refresh: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: ''
    },
    enterprise: {
      type: String,
      default: ''
    },
    orgCode: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: 0
    },
    customerUserId: {
      type: Number,
      default: 0
    },
    accountPeriod: {
      type: String,
      default: ''
    },
    creditBalance: {
      type: String,
      default: ''
    },
    orgFile: {
      type: String,
      default: ''
    },
    open: {
      type: Number,
      default: 2
    },
    admin: {
      type: String,
      default: ''
    },
    contactor: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    tel: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      butlerList: [],
      customerId: '',
      modify: false,
      loadingBtn: false,
      imgName: ''
    }
  },
  methods: {
    selectChange () {

    },
    closeButler () {

    },
    btnSubmit (type) {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.enterprise,
        this.$refs.orgCode,
        this.$refs.accountPeriod,
        this.$refs.creditBalance,
        this.$refs.customerUserId,
        this.$refs.orgFile,
        this.$refs.contactor,
        this.$refs.mobile,
        this.$refs.email,
        this.$refs.tel
      ])

      if (!result) {
        this.loadingBtn = false
      } else {
        let vm = this
        let params = {
          param: {
            name: this.$refs.enterprise.value,
            orgCode: this.$refs.orgCode.value,
            accountPeriod: this.$refs.accountPeriod.value,
            creditBalance: this.$refs.creditBalance.value,
            customerUserId: this.$refs.customerUserId.value,
            orgFile: this.$refs.orgFile.$refs.upload.fileList[0].url,
            contactor: this.$refs.contactor.value,
            mobile: this.$refs.mobile.value,
            email: this.$refs.email.value,
            tel: this.$refs.tel.value
          },
          callback: function (response) {
            vm.loadingBtn = false
            if( response.data.code === '1000' ){
              if (type === 'new') {
                vm.$Message.success('新建客户成功！')
              } else {
                vm.$Message.success('修改客户成功！')
              }
              // 重置账号列表
              vm.$emit('refreshData')
            } else {
              if (response.data.code === '200') {
                vm.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                vm.$Message.error('用户被锁定')
              } else {
                if (type === 'new') {
                  vm.$Message.error('新建客户失败！')
                } else {
                  vm.$Message.error('修改客户失败！')
                }
              }
            }
          }
        }
        if (type !== 'new') {
          let customerUserId = this.$refs.customerUserId.value
          params.param.customerUserId = customerUserId
        }
        console.log(params.param)
        this.creatAndModifyClient(params)
      }
    },
    btnModify () {
      this.modify = true
    },
    ...mapActions({
      creatAndModifyClient: types.CREAT_AND_MODIFY_CLIENT,
      queryButler: types.QUERY_BUTLER
    })
  },
  computed: {
  },
  beforeMount () {
    let vm = this
    let params = {
      param: {},
      callback: function (response) {
        if (response.data.code === '1000'){
          let data = response.data.data
          if (data.length > 0) {
            vm.butlerList = data.map(function (value, index, array) {
              return {value: value.userCode, label: value.userName}
            })
          }
        } else {
          vm.$Message.error('客户查询失败')
        }
      }
    }
    this.queryButler(params)
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style scoped>

</style>