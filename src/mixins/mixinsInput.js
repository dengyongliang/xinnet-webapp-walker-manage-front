export default {
  components: {
  },
  props: {
    onParentmethod: {
      type: Function
    },
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
    number: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
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
      showError: false
    }
  },
  computed: {

  },
  beforeMount () {
    if (this.defaultValue) {
      this.value = this.defaultValue
    }
  },
  methods: {
    showValidateResult (v) {
      this.errorText = v.text
      this.showError = true
    },
    onFocus (e) {
      this.errorText = ''
      this.showError = false
    },
    onBlur (e) {
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod(this.value)
      }
      let val = this.value
      let validate = this.validate
      if (val === '' && this.required) {
        this.showError = true
        this.errorText = `请输入${this.label.substr(0, this.label.length - 1) || ''}！`
      } else {
        if (validate === 'email') {
          if (!this.GLOBALS.IS_EMAIL_AVAILABLE(val)) {
            this.showError = true
            this.errorText = '请输入正确的邮件地址，如xinnet@xinnet.com！'
          }
          if (!this.GLOBALS.IS_EMAIL_AVAILABLE(val) && val > 64) {
            this.showError = true
            this.errorText = '最多允许输入64个字符！！'
          }
        } else if (validate === 'mobile') {
          if (!this.GLOBALS.IS_PHONE_AVAILABLE(val)) {
            this.showError = true
            this.errorText = '请输入11位的手机号码！'
          }
        } else if (validate === 'number') {
          if (isNaN(val)) {
            this.showError = true
            this.errorText = '只允许输入数字！'
          }
        } else if (validate === 'money') {
          if (!this.GLOBALS.IS_MONEY_AVAILABLE(val)) {
            this.showError = true
            this.errorText = '只允许输入数字！'
          }
        }
      }
    }
  },
  watch: {
    defaultValue (val) {
      if (val !== '') {
        this.value = val
      }
    }
  }
}
