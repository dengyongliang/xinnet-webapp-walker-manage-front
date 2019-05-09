export default {
  components: {
  },
  props: {
    type: {
      type: String,
      default: 'rePassword'
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
    styles1: {
      type: String,
      default: 'width:240px'
    },
    styles2: {
      type: String,
      default: 'width:240px'
    },
    maxLength: Number,
    placeholder1: String,
    placeholder2: String,
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      errorTextPassword: '',
      errorTextRePassword: '',
      showPasswordError: false,
      showRePasswordError: false,
      value1: '',
      value2: '',
      ok1: false,
      ok2: false
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
    showValidateResult1 (v) {
      this.showPasswordError = true
      this.errorTextPassword = v.text
    },
    showValidateResult2 (v) {
      this.showRePasswordError = true
      this.errorTextRePassword = v.text
    },
    onFocus (e) {
      let name = e.target.name
      if (name === 'password') {
        this.errorTextPassword = ''
        this.showPasswordError = false
      } else if (name === 'rePassword') {
        this.errorTextRePassword = ''
        this.showRePasswordError = false
      }
    },
    onBlur (e) {
      let val = e.target.value
      let name = e.target.name
      console.log(val)
      if (val === '' && name === 'password') {
        this.ok1 = false
      }
      if (val === '' && name === 'rePassword') {
        this.ok2 = false
      }
      if (val !== '') {
        if (name === 'password') {
          if (!this.GLOBALS.regPw.test(val)) {
            this.ok1 = false
            this.showPasswordError = true
            this.errorTextPassword = '密码由8-16位字母、数字、符号组成，区分大小写，且至少包含有字母、数字、符号、大小写中的两种组合！'
          } else {
            this.ok1 = true
          }
        }
        if (name === 'rePassword') {
          if (!this.GLOBALS.regPw.test(val)) {
            this.ok2 = false
            this.showRePasswordError = true
            this.errorTextRePassword = '密码由8-16位字母、数字、符号组成，区分大小写，且至少包含有字母、数字、符号、大小写中的两种组合！'
          } else if (this.GLOBALS.regPw.test(val) && this.value1 !== val) {
            this.ok2 = false
            this.showRePasswordError = true
            this.errorTextRePassword = '重复输入密码与新密码不一致！'
          } else {
            this.ok2 = true
          }
        }
      }
    }
  }
}
