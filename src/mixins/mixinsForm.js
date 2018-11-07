export default {
  props: {
  },
  data () {
    return {
      oldPassword: {
        value: '',
        error: 0
      },
      newPassword: {
        value: '',
        error: 0
      },
      reNewPassword: {
        value: '',
        error: 0
      },
      password: {
        value: '',
        error: 0
      },
      rePassword: {
        value: '',
        error: 0
      },
      userName: {
        value: '',
        error: 0
      },
      userMobile: {
        value: '',
        error: 0
      },
      userEmail: {
        value: '',
        error: 0
      },
      userCode: ''
    }
  },
  computed: {
  },
  beforeMount () {
  },
  methods: {
    onFocus (e) {
      this.oldPassword.error = 0
      this.newPassword.error = 0
      this.password.error = 0
      this.reNewPassword.error = 0
      this.rePassword.error = 0
      this.userName.error = 0
      this.userMobile.error = 0
      this.userEmail.error = 0
    },
    onBlur (e) {
      let val = e.target.value
      let name = e.target.name
      if (name === 'password') {
        if (val !== '' && !this.GLOBALS.regPw.test(val)) {
          this.password.error = 2
        }
      }
      if (name === 'newPassword') {
        if (val !== '' && !this.GLOBALS.regPw.test(val)) {
          this.newPassword.error = 2
        }
      }
      if (name === 'reNewPassword') {
        if (val !== '' && !this.GLOBALS.regPw.test(val)) {
          this.reNewPassword.error = 2
          return false
        }
        if (val !== '' && this.GLOBALS.regPw.test(val) && this.$refs.newPassword.value !== val) {
          this.reNewPassword.error = 3
          return false
        }
      }
      if (name === 'rePassword') {
        if (val !== '' && !this.GLOBALS.regPw.test(val)) {
          this.rePassword.error = 2
          return false
        }
        if (val !== '' && this.GLOBALS.regPw.test(val) && this.$refs.password.value !== val) {
          this.rePassword.error = 3
          return false
        }
      }
      if (name === 'userMobile') {
        if (val !== '' && !this.GLOBALS.IS_PHONE_AVAILABLE(val)) {
          this.userMobile.error = 2
        }
      }
      if (name === 'userEmail') {
        if (val !== '' && !this.GLOBALS.IS_EMAIL_AVAILABLE(val)) {
          this.userEmail.error = 2
        }
      }
    }
  }
}
