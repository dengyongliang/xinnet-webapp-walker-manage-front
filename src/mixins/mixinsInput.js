export default {
  components: {
  },
  props: {
    name: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    defaultValue: String,
    maxLength: Number,
    placeholder: String,
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      value: '',
      errorText: '',
      errorTextPassword: '',
      errorTextRePassword: '',
      showError: false,
      showPasswordError: false,
      showRePasswordError: false
    }
  },
  computed: {

  },
  beforeMount () {
  },
  methods: {
    onFocus (e) {
      let val = e.target.value
      let name = e.target.name
      if (name === 'password') {
        this.errorTextPassword = '',
        this.showPasswordError = false
      } else if (name === 'rePassword'){
        this.errorTextRePassword = '',
        this.showRePasswordError = false
      } else {
        this.errorText = '',
        this.showError = false
      }
    },
    onBlur (e) {
      let val = e.target.value
      let name = e.target.name
      if (name === 'userName') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入姓名！'
        }
      }
      if (name === 'userEmail') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入邮箱地址！'
        }
        if (val !== '' && !this.GLOBALS.IS_EMAIL_AVAILABLE(val)) {
          this.showError = true
          this.errorText = '请输入正确的邮件地址，如xinnet@xinnet.com！'
        }
        if (val !== '' && !this.GLOBALS.IS_EMAIL_AVAILABLE(val) && val > 64) {
          this.showError = true
          this.errorText = '最多允许输入64个字符！！'
        }
      }
      if (name === 'userMobile') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入手机号！'
        }
        if (val !== '' && !this.GLOBALS.IS_PHONE_AVAILABLE(val)) {
          this.showError = true
          this.errorText = '请输入11位的手机号码！'
        }
      }

      if (name === 'enterprise') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入企业名称！'
        }
      }
      if (name === 'orgCode') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入机构代码证号！'
        }
      }
      if (name === 'accountPeriod') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入账期！'
        }
      }
      if (name === 'creditBalance') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入额度！'
        }
      }
      if (name === 'admin') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入管家！'
        }
      }
      if (name === 'contactor') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入联系人！'
        }
      }
      if (name === 'tel') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入固话！'
        }
      }
      if (name === 'oldPassword') {
        if (val === '') {
          this.showError = true
          this.errorText = '请输入原密码！'
        }
      }
      if (name === 'password') {
        if (val === '') {
          this.showPasswordError = true
          this.errorTextPassword = '请输入密码！'
        }
        if (val !== '' && !this.GLOBALS.regPw.test(val)) {
          this.showPasswordError = true
          this.errorTextPassword = '密码由8-16位字母、数字、符号组成，区分大小写，且至少包含有字母、数字、符号、大小写中的两种组合！'
        }
      }
      if (name === 'rePassword') {
        if (val === '') {
          this.showRePasswordError = true
          this.errorTextRePassword = '请再次输入密码！'
        }
        if (val !== '' && !this.GLOBALS.regPw.test(val)) {
          this.showRePasswordError = true
          this.errorTextRePassword = '密码由8-16位字母、数字、符号组成，区分大小写，且至少包含有字母、数字、符号、大小写中的两种组合！'
        }
        if (val !== '' && this.GLOBALS.regPw.test(val) && this.$refs.password.$refs.input._value !== val) {
          this.showRePasswordError = true
          this.errorTextRePassword = '重复输入密码与新密码不一致！'
        }
      }
    }
  }
}
