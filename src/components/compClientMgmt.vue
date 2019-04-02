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
    comp-input(name='creditBalance',label="额度：",:show="status==='creat'",ref="creditBalance",:defaultValue="creditBalance",:number="true")
      span.text(v-if="status==='view'",slot="left") {{creditBalance}}
      span.unit(slot="right") 元
    FormItem(label="状态：",v-if="status=='view'")
      span.text(v-if="customerStatus===1") 已开启
      span.text(v-if="customerStatus===2") 已关闭
    FormItem(label="管家：")
      span.text(v-show="status==='view' && !modify") {{userName}}
      comp-select(name="customerUserId",:list="butlerList",ref="customerUserId",v-show="status==='creat' || modify",:defaultValue="userId")

      a(class="stopStartClient",href="javascript:;", @click="closeButler(0)",v-show="status==='view' && customerStatus===1") 停用客户
      a(class="stopStartClient",href="javascript:;", @click="closeButler(1)",v-show="status==='view' && customerStatus===0") 启用客户

    FormItem(label="机构代码证：")
      comp-img-upload(:modify="modify",name="upfile",:file="orgFile",:status="status",ref="orgFile",errorText="请上传机构代码证！")

    Divider(:dashed='true')

    strong.t 联系人信息
    comp-input(name='contactor',label="联系人：",:show="status==='creat' || modify",ref="contactor",:defaultValue="contactor")
      span.text(v-if="status==='view' && !modify",slot="left") {{contactor}}
    comp-input(name='userMobile',label="手机：",:show="status==='creat' || modify",ref="mobile",:defaultValue="mobile", validate="mobile")
      span.text(v-if="status==='view' && !modify",slot="left") {{mobile}}
    comp-input(name='userEmail',label="邮箱：",:show="status==='creat' || modify",ref="email",:defaultValue="email",:maxLength="64", validate="email")
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
import { mapActions } from 'vuex'
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
    userId: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
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
      imgName: '',
      customerStatus: 1
    }
  },
  methods: {
    selectChange () {

    },
    closeButler (status) {
      let params = {
        code: this.id,
        status: status
      }

      this.$Modal.confirm({
        title: '确认',
        content: (status === 0 ? '确认是否要停用该客户？' : '确认是否要启用该客户？'),
        loading: true,
        onOk: () => {
          this.$store.dispatch('SET_CUSTOMER_STATUS', params).then((response) => {
            if (!response) {
              return false
            }
            this.$Modal.remove()
            if (response.data.code === '1000') {
              if (status === 0) {
                this.customerStatus = 0
                this.$Message.success('停用成功')
              } else {
                this.customerStatus = 1
                this.$Message.success('启用成功')
              }
            } else {
              if (status === 0) {
                this.$Message.error('停用失败')
              } else {
                this.$Message.error('启用失败')
              }
            }
          }).catch(() => {})
        },
        onCancel: () => {
        }
      })
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
        let params = {
          name: this.$refs.enterprise.value,
          orgCode: this.$refs.orgCode.value,
          accountPeriod: this.$refs.accountPeriod.value,
          creditBalance: this.$refs.creditBalance.value,
          customerUserId: this.$refs.customerUserId.value,
          orgFile: this.$refs.orgFile.$refs.upload.fileList[0].file,
          contactor: this.$refs.contactor.value,
          mobile: this.$refs.mobile.value,
          email: this.$refs.email.value,
          tel: this.$refs.tel.value
        }
        if (type !== 'new') {
          let id = this.$refs.id.value
          params.code = id
          this.$store.dispatch('UPDATE_CUSTOMER', params).then((response) => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('修改客户成功！')
              // 重置账号列表
              this.$emit('refreshData')
            } else {
              if (response.data.code === '100') {
                this.$refs.enterprise.showValidateResult({text: '企业名称重复，请重新输入！'})
                // vm.$Message.error('企业名称重复，请重新输入！')
              } else if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定')
              } else {
                this.$Message.error('修改客户失败！')
              }
            }
          }).catch(() => {})
        } else {
          this.$store.dispatch('CREATE_CUSTOMER', params).then((response) => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('新建客户成功！')
              // 重置账号列表
              this.$emit('refreshData')
            } else {
              if (response.data.code === '100') {
                this.$refs.enterprise.showValidateResult({text: '企业名称重复，请重新输入！'})
                // vm.$Message.error('企业名称重复，请重新输入！')
              } else if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定')
              } else {
                this.$Message.error('新建客户失败！')
              }
            }
          }).catch(() => {})
        }
      }
    },
    btnModify () {
      this.modify = true
    }
  },
  computed: {
  },
  beforeMount () {
    this.customerStatus = this.open
    this.$store.dispatch('QUERY_BUTLER').then((response) => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        let data = response.data.data
        if (data.length > 0) {
          this.butlerList = data.map(function (value, index, array) {
            return {value: value.id, label: value.userName}
          })
        }
      } else {
        this.$Message.error('客户查询失败')
      }
    }).catch(() => {})
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style scoped>
.stopStartClient{
  color:#2d8cf0;
  display:inline-block;
  margin-left:10px;
}
</style>
