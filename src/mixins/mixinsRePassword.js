export default {
  components: {
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    name1: {
      type: String,
      default: 'password'
    },
    name2: {
      type: String,
      default: 'rePassword'
    },
    label1: {
      type: String,
      default: ''
    },
    label2: {
      type: String,
      default: ''
    },
    defaultValue1: String,
    defaultValue2: String,
    maxLength: Number,
    placeholder: String,
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      errorText: '',
      errorTextPassword: '',
      errorTextRePassword: '',
      showError: false,
      showPasswordError: false,
      showRePasswordError: false,
      value1: '',
      value2: ''
    }
  },
  beforeMount () {
    if (this.defaultValue1) {
      this.value1 = this.defaultValue1
    }
    if (this.defaultValue2) {
      this.value2 = this.defaultValue2
    }
  },
  computed: {
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
      }
    },
    onBlur (e) {
      let val = e.target.value
      let name = e.target.name
      console.log(val)
      if (val === '') {
        if (name === 'password') {
          this.showPasswordError = true
          this.errorTextPassword = '请输入密码！'
        }
        if (name === 'rePassword') {
          this.showRePasswordError = true
          this.errorTextRePassword = '请再次输入密码！'
        }
      } else {
        if (name === 'password') {
          if (!this.GLOBALS.regPw.test(val)) {
            this.showPasswordError = true
            this.errorTextPassword = '密码由8-16位字母、数字、符号组成，区分大小写，且至少包含有字母、数字、符号、大小写中的两种组合！'
          }
        }
        if (name === 'rePassword') {
          if (!this.GLOBALS.regPw.test(val)) {
            this.showRePasswordError = true
            this.errorTextRePassword = '密码由8-16位字母、数字、符号组成，区分大小写，且至少包含有字母、数字、符号、大小写中的两种组合！'
          }
          if (this.GLOBALS.regPw.test(val) && this.value1 !== val) {
            this.showRePasswordError = true
            this.errorTextRePassword = '重复输入密码与新密码不一致！'
          }
        }
      }
    }
  }
}
