<template lang="pug">
  Form(:label-width="150")
    strong.t 基本信息
    comp-input(name='enterprise',label="企业名称：",:show="isShow || modify",ref="enterprise",:defaultValue="enterprise")
      span.text(v-if="!isShow && !modify",slot="left") {{enterprise}}
    comp-input(name='orgCode',label="机构代码证号：",:show="isShow || modify",ref="orgCode",:defaultValue="orgCode")
      span.text(v-if="!isShow && !modify",slot="left") {{orgCode}}
    FormItem(label="客户ID：",v-if="status=='view'")
      input(type="hidden",:value="customerUserId", ref="customerUserId")
      span.text() {{customerUserId}}
    comp-input(name='accountPeriod',label="账期：",:show="isShow || modify",ref="accountPeriod",:defaultValue="accountPeriod")
      span.text(v-if="!isShow && !modify",slot="left") {{accountPeriod}}
      span.unit(slot="right") 个月
    comp-input(name='creditBalance',label="额度：",:show="isShow || modify",ref="creditBalance",:defaultValue="creditBalance")
      span.text(v-if="!isShow && !modify",slot="left") {{creditBalance}}
      span.unit(slot="right") 元
    FormItem(label="状态：",v-if="status=='view'")
      span.text(v-if="open") 已开启
      span.text(v-if="!open") 已关闭
    comp-input(name='admin',label="管家：",:show="isShow || modify",ref="admin",:defaultValue="admin")
      span.text(v-if="!isShow && !modify",slot="left") {{admin}}

    FormItem(label="机构代码证：")
      .demo-upload-list(v-for="item in uploadList")
        template(v-if="item.status === 'finished'")
          img(:src="item.url")
          .demo-upload-list-cover
            Icon(type="ios-eye-outline",@click.native="handleView(item.name)")
            Icon(type="ios-trash-outline",@click.native="handleRemove(item)")
        template(v-else)
          Progress(v-if="item.showProgress",:percent="item.percentage",hide-info)
      Upload(ref="upload", :show-upload-list="false", :default-file-list="defaultList", :on-success="handleSuccess", :format="['jpg','jpeg','png']", :max-size="2048", :on-format-error="handleFormatError", :on-exceeded-size="handleMaxSize", :before-upload="handleBeforeUpload", multiple, action="//jsonplaceholder.typicode.com/posts/", style="display: inline-block;width:58px;vertical-align: top;")
        div(style="width: 58px;height:58px;line-height: 58px;")
          Icon(type="ios-camera",size="20")
      span.unit 支持jpg、gif、png格式，2M以内。
      Modal(title="图片预览" v-model="visible",:footer-hide="true")
        img(:src="'https://o5wwk8baw.qnssl.com/' + imgName + '/avatar'",v-if="visible",style="width: 100%")
      Alert(type="error",show-icon, style="display:inline-block",v-show="file === ''",ref="msgErrorFile") 请上传机构代码证！
    Divider(:dashed='true')

    strong.t 联系人信息
    comp-input(name='contactor',label="联系人：",:show="isShow || modify",ref="contactor",:defaultValue="contactor")
      span.text(v-if="!isShow && !modify",slot="left") {{contactor}}
    comp-input(name='userMobile',label="手机：",:show="isShow || modify",ref="mobile",:defaultValue="mobile")
      span.text(v-if="!isShow && !modify",slot="left") {{mobile}}
    comp-input(name='userEmail',label="邮箱：",:show="isShow || modify",ref="email",:defaultValue="email")
      span.text(v-if="!isShow && !modify",slot="left") {{email}}
    comp-input(name='tel',label="固话：",:show="isShow || modify",ref="tel",:defaultValue="tel")
      span.text(v-if="!isShow && !modify",slot="left") {{tel}}

    FormItem(label="")
      Button(type="primary",@click="btnSubmit('new')",v-if='status=="creat"',:loading="loadingBtn") 确定
      Button(type="primary",@click="btnModify",v-if='status=="view" && !modify') 修改
      Button(type="primary",@click="btnSubmit('reset')",v-if='modify',:loading="loadingBtn") 保存
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'

export default {
  components: {
    compInput
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
      type: Boolean,
      default: false
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
      modify: false,
      loadingBtn: false,
      modify:false,
      file: '',
      defaultList: [
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          'name': 'bc7521e033abdd1e92222d733590f104',
          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      imgName: '',
      visible: false,
      uploadList: [
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'status': 'finished',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
          'showProgress': false,
          'percentage': 50
        },
        {
          'name': 'bc7521e033abdd1e92222d733590f104',
          'status': 'none',
          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',
          'showProgress': true,
          'percentage': 50
        }
      ]
    }
  },
  methods: {
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    },
    btnSubmit (type) {
      let enterprise = this.$refs.enterprise.$refs.input.$refs.input.value
      let orgCode = this.$refs.orgCode.$refs.input.$refs.input.value
      
      let accountPeriod = this.$refs.accountPeriod.$refs.input.$refs.input.value
      let creditBalance = this.$refs.creditBalance.$refs.input.$refs.input.value
      let admin = this.$refs.admin.$refs.input.$refs.input.value
      let orgFile = ''
      let contactor = this.$refs.contactor.$refs.input.$refs.input.value
      let mobile = this.$refs.mobile.$refs.input.$refs.input.value
      let email = this.$refs.email.$refs.input.$refs.input.value
      let tel = this.$refs.tel.$refs.input.$refs.input.value

      this.loadingBtn = true
      if (enterprise === '') {
        this.$refs.enterprise.$refs.input.focus()
        this.$refs.enterprise.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (orgCode === '') {
        this.$refs.orgCode.$refs.input.focus()
        this.$refs.orgCode.$refs.input.blur()
        this.loadingBtn = false
        return false
      }

      if (accountPeriod === '') {
        this.$refs.accountPeriod.$refs.input.focus()
        this.$refs.accountPeriod.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (creditBalance === '') {
        this.$refs.creditBalance.$refs.input.focus()
        this.$refs.creditBalance.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (admin === '') {
        this.$refs.admin.$refs.input.focus()
        this.$refs.admin.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (contactor === '') {
        this.$refs.contactor.$refs.input.focus()
        this.$refs.contactor.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (mobile === '') {
        this.$refs.mobile.$refs.input.focus()
        this.$refs.mobile.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (!this.GLOBALS.IS_PHONE_AVAILABLE(mobile)) {
        this.$refs.mobile.$refs.input.focus()
        this.$refs.mobile.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (email === '') {
        this.$refs.email.$refs.input.focus()
        this.$refs.email.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (!this.GLOBALS.IS_EMAIL_AVAILABLE(email)) {
        this.$refs.email.$refs.input.focus()
        this.$refs.email.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      if (tel === '') {
        this.$refs.tel.$refs.input.focus()
        this.$refs.tel.$refs.input.blur()
        this.loadingBtn = false
        return false
      }
      let vm = this
      let params = {
        param: {
          name: enterprise,
          orgCode: orgCode,
          accountPeriod: accountPeriod,
          creditBalance: creditBalance,
          admin: admin,
          orgFile: '',
          contactor: contactor,
          mobile: mobile,
          email: email,
          tel: tel
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
            } else if (response.data.code === '500') {
              vm.$Message.error('参数错误或参数为空')
            } else if (response.data.code === '900') {
              vm.$Message.error('操作失败')
            }
          }
        }
      }
      if (type !== 'new') {
        let customerUserId = this.$refs.customerUserId.value
        params.param.customerUserId = customerUserId
      }
      this.creatAndModifyClient(params)
    },
    btnModify () {
      this.modify = true
    },
    ...mapActions({
      creatAndModifyClient: types.CREAT_AND_MODIFY_CLIENT
    })
  },
  computed: {
    isShow () {
      if (this.status === 'creat') {
        this.modify = false
        return true
      } else if (this.status === 'view') {
        this.modify = false
        return false
      } else {
        this.modify = false
        return false
      }
    }
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>

<style scoped>
.demo-upload-list{
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
}
.demo-upload-list img{
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover{
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
  display: block;
}
.demo-upload-list-cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>