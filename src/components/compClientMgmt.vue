<template lang="pug">
  Form(:label-width="150")
    strong.t 基本信息
    comp-input(name='enterprise',label="企业名称：",:show="status==='creat' || modify",ref="enterprise",:defaultValue="obj.enterprise.toString()",:maxLength="64")
      span.text(v-if="status==='view' && !modify",slot="left") {{obj.enterprise}}
    comp-input(name='orgCode',label="机构代码证号：",:show="status==='creat' || modify",ref="orgCode",:defaultValue="obj.orgCode.toString()",:maxLength="30")
      span.text(v-if="status==='view' && !modify",slot="left") {{obj.orgCode}}
    FormItem(label="客户ID：",v-if="status=='view'")
      input(type="hidden",:value="obj.id", ref="id")
      span.text() {{obj.id}}
    comp-input(name='accountPeriod',label="账期：",:show="status==='creat' || modify",ref="accountPeriod",:defaultValue="obj.accountPeriod.toString()",validate="positiveInt")
      span.text(v-if="status==='view' && !modify",slot="left") {{obj.accountPeriod}}
      span.unit(slot="right") 个月
    comp-input(name='creditBalance',label="额度：",:show="status==='creat'",ref="creditBalance",:defaultValue="obj.creditBalance.toString()",validate="money")
      span.text(v-if="status==='view'",slot="left") {{obj.creditBalance}}
      span.unit(slot="right") 元
    FormItem(label="状态：",v-if="status=='view'")
      span.text(v-if="obj.status===1") 已开启
      span.text(v-if="obj.status===0") 已关闭
    FormItem(label="管家：")
      span.text(v-show="status==='view' && !modify") {{obj.userName}}
      comp-select(name="customerUserId",:list="butlerList",ref="customerUserId",v-show="status==='creat' || modify",:defaultValue="obj.userId.toString()")
      a(class="stopStartClient",href="javascript:;", @click="closeButler(0)",v-show="status==='view' && obj.status===1") 停用客户
      a(class="stopStartClient",href="javascript:;", @click="closeButler(1)",v-show="status==='view' && obj.status===0") 启用客户

    FormItem(label="机构代码证：")
      comp-img-upload(:modify="modify",name="upfile",:file="obj.orgFile",:status="status",ref="orgFile",errorText="请上传机构代码证！")

    Divider(:dashed='true')

    strong.t 联系人信息
    comp-input(name='contactor',label="联系人：",:show="status==='creat' || modify",ref="contactor",:defaultValue="obj.contactor.toString()")
      span.text(v-if="status==='view' && !modify",slot="left") {{obj.contactor}}
    comp-input(name='userMobile',label="手机：",:show="status==='creat' || modify",ref="mobile",:defaultValue="obj.mobile.toString()", validate="mobile")
      span.text(v-if="status==='view' && !modify",slot="left") {{obj.mobile}}
    comp-input(name='userEmail',label="邮箱：",:show="status==='creat' || modify",ref="email",:defaultValue="obj.email.toString()",:maxLength="64", validate="email")
      span.text(v-if="status==='view' && !modify",slot="left") {{obj.email}}
    comp-input(name='tel',label="固话：",:show="status==='creat' || modify",ref="tel",:defaultValue="obj.tel.toString()",:required="false")
      span.text(v-if="status==='view' && !modify",slot="left") {{obj.tel}}
      span.unit(v-if="status==='creat' || modify",slot="right") 非必填

    div(v-if="status==='creat'")
      Divider(:dashed='true')
      strong.t(v-if="status==='creat'") 超级管理员信息
      comp-input(name='superName',label="姓名：",ref="superName")
        span.text(v-if="status==='view' && !modify",slot="left") {{obj.superName}}
      comp-input(name='superEmail',label="邮箱：",ref="superEmail",:maxLength="64", validate="email")
        span.text(v-if="status==='view' && !modify",slot="left") {{obj.superEmail}}
    FormItem(label="")
      Button(type="primary",@click="btnSubmit('new')",v-show='status==="creat"',:loading="loadingBtn") 确定
      Button(type="primary",@click="btnModify",v-show='status==="view" && !modify') 修改
      Button(type="primary",@click="btnSubmit('reset')",v-show='status==="view" && modify',:loading="loadingBtn") 保存
</template>

<script>
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
    obj: {
      type: Object,
      default: function () {
        return {}
      }
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
        code: this.obj.id,
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
                this.obj.status = 0
                this.$Message.success('停用成功')
              } else {
                this.obj.status = 1
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
      let result = false
      if (type !== 'new') {
        result = validateFormResult([
          this.$refs.enterprise,
          this.$refs.orgCode,
          this.$refs.accountPeriod,
          this.$refs.creditBalance,
          this.$refs.customerUserId,
          this.$refs.orgFile,
          this.$refs.contactor,
          this.$refs.mobile,
          this.$refs.email
        ])
      } else {
        result = validateFormResult([
          this.$refs.enterprise,
          this.$refs.orgCode,
          this.$refs.accountPeriod,
          this.$refs.creditBalance,
          this.$refs.customerUserId,
          this.$refs.orgFile,
          this.$refs.contactor,
          this.$refs.mobile,
          this.$refs.email,
          this.$refs.superName,
          this.$refs.superEmail
        ])
      }

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
          this.$store.dispatch('CUSTOMER_UPDATE', params).then((response) => {
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
          params.superName = this.$refs.superName.value
          params.superEmail = this.$refs.superEmail.value
          this.$store.dispatch('CUSTOMER_CREATE', params).then((response) => {
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
                this.$Message.error('邮箱已存在！')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定！')
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
    this.$store.dispatch('CUSTOMER_USERS').then((response) => {
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
