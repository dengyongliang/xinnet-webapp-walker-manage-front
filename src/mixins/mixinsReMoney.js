export default {
  components: {
  },
  props: {
    type: {
      type: String,
      default: 'reMoney'
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
      default: 'money'
    },
    name2: {
      type: String,
      default: 'reMoney'
    },
    label1: {
      type: String,
      default: ''
    },
    label2: {
      type: String,
      default: ''
    },
    styles1: {
      type: String,
      default: 'width:240px'
    },
    styles2: {
      type: String,
      default: 'width:240px'
    },
    defaultValue1: String,
    defaultValue2: String,
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
      errorText: '',
      errorTextMoney: '',
      errorTextReMoney: '',
      showError: false,
      showMoneyError: false,
      showReMoneyError: false,
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
    showValidateResult1 (v) {
      this.showMoneyError = true
      this.errorTextMoney = v.text
    },
    showValidateResult2 (v) {
      this.showReMoneyError = true
      this.errorTextReMoney = v.text
    },
    onFocus (e) {
      let val = e.target.value
      let name = e.target.name
      if (name === 'money') {
        this.errorTextMoney = '',
        this.showMoneyError = false
      } else if (name === 'reMoney'){
        this.errorTextReMoney = '',
        this.showReMoneyError = false
      }
    },
    onBlur (e) {
      let val = e.target.value
      let name = e.target.name
      console.log(val)
      if (val === '') {
        if (name === 'money') {
          this.showMoneyError = true
          this.errorTextMoney = '请输入金额！'
        }
        if (name === 'reMoney') {
          this.showReMoneyError = true
          this.errorTextReMoney = '请再次输入金额！'
        }
      } else {
        if (name === 'money') {
          if (!this.GLOBALS.IS_MONEY_AVAILABLE(val)) {
            this.showMoneyError = true
            this.errorTextMoney = '格式错误！'
          }
        }
        if (name === 'reMoney') {
          if (!this.GLOBALS.IS_MONEY_AVAILABLE(val)) {
            this.showReMoneyError = true
            this.errorTextReMoney = '格式错误！'
          }
          if (this.GLOBALS.IS_MONEY_AVAILABLE(val) && this.value1 !== val) {
            this.showReMoneyError = true
            this.errorTextReMoney = '金额不一致！'
          }
        }
      }
    }
  }
}
