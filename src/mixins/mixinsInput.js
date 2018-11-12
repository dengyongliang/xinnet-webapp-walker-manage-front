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
      showError: false,
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
      this.showError = true
      this.errorText = v.text
    },
    onFocus (e) {
      this.errorText = '',
      this.showError = false
    },
    onBlur (e) {
      let vm = this
      let val = this.value
      let name = this.name
      if (val === '' && this.required) {
        this.showError = true
        this.errorText = '请输入' + (vm.label.substr(0,vm.label.length-1) || '') + '！'
      } else {
        if (this.number && isNaN(val)) {
          this.showError = true
          this.errorText = '只允许输入数字！'
        } else {
          if (name === 'userEmail') {
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
            if (val !== '' && !this.GLOBALS.IS_PHONE_AVAILABLE(val)) {
              this.showError = true
              this.errorText = '请输入11位的手机号码！'
            }
          }
        }
      }
    }
  }
}
