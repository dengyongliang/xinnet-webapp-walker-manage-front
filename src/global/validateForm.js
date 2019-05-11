import GLOBAL from './global'
export default function validateFormResult (validateArray, event = 'submit') {
  let len = validateArray.length
  let flag = true
  for (var i = 0; i < len; i++) {
    let v = validateArray[i]
    if (v.type === 'text') {
      let value = v.value
      let label = v.label
      let validate = v.validate
      if (value === '' && event === 'submit') {
        v.showValidateResult({text: `请输入${label.substr(0, label.length - 1) || ''}！`})
        flag = false
        // break
      } else if (value !== '') {
        if (validate === 'email') {
          if (!GLOBAL.IS_EMAIL_AVAILABLE(value)) {
            v.showValidateResult({text: '请输入正确的邮件地址，如xinnet@xinnet.com！'})
            flag = false
            // break
          }
        }
        if (validate === 'mobile') {
          if (!GLOBAL.IS_PHONE_AVAILABLE(value)) {
            v.showValidateResult({text: '请输入11位的手机号码！'})
            flag = false
            // break
          }
        }
        if (validate === 'money') {
          if (!GLOBAL.IS_MONEY_AVAILABLE(value)) {
            v.showValidateResult({text: '只允许输入数字！'})
            flag = false
            // break
          }
        }
        if (validate === 'positiveInt') {
          if (!GLOBAL.IS_MONEY_AVAILABLE(value)) {
            v.showValidateResult({text: '只允许输入正整数！'})
            flag = false
            // break
          }
        }
      }
    } else if (v.type === 'select') {
      let value = v.value
      if (value === '') {
        v.showValidateResult()
        flag = false
        // break
      }
    } else if (v.type === 'upload') {
      let value = v.$refs.upload.fileList
      if (!value.length) {
        v.showValidateResult()
        flag = false
        // break
      }
    } else if (v.type === 'radio') {
      let value = v.value
      if (value === '') {
        v.showValidateResult()
        flag = false
        // break
      }
    } else if (v.type === 'rePassword') {
      let password = v.$refs.password.value
      let rePassword = v.$refs.rePassword.value
      console.log(v.$refs.password)
      if (password === '') {
        v.showValidateResult1({text: '请输入密码！'})
        flag = false
      } else {
        if (!GLOBAL.regPw.test(password)) {
          flag = false
          v.showValidateResult1({text: '密码由8-16位字母、数字、符号组成，区分大小写，且至少包含有字母、数字、符号、大小写中的两种组合！'})
        }
      }
      if (rePassword === '') {
        flag = false
        v.showValidateResult2({text: '请输入密码！'})
      } else {
        if (!GLOBAL.regPw.test(rePassword)) {
          flag = false
          v.showValidateResult2({text: '密码由8-16位字母、数字、符号组成，区分大小写，且至少包含有字母、数字、符号、大小写中的两种组合！'})
        }
        if (GLOBAL.regPw.test(rePassword) && password !== rePassword) {
          flag = false
          v.showValidateResult2({text: '重复输入密码与新密码不一致！'})
        }
      }
    } else if (v.type === 'reMoney') {
      let money = v.value1
      let remoney = v.value2
      if (money === '' && remoney === '') {
        v.showValidateResult1({text: '请输入金额！'})
        v.showValidateResult2({text: '请再次输入金额！'})
        flag = false
      } else {
        if (money !== '' && !GLOBAL.IS_MONEY_AVAILABLE(money)) {
          v.showValidateResult1({text: '格式错误！'})
          flag = false
        }
        if (remoney !== '' && !GLOBAL.IS_MONEY_AVAILABLE(remoney)) {
          v.showValidateResult2({text: '格式错误！'})
          flag = false
        }
        if (GLOBAL.IS_MONEY_AVAILABLE(remoney) && money !== remoney) {
          v.showValidateResult2({text: '金额不一致！'})
          flag = false
        }
      }
    } else if (v.type === 'datePicker') {
      let value = v.value
      if (!value.length || (value.length === 2 && !value[0] && !value[1])) {
        v.showValidateResult()
        flag = false
      }
    }
  }
  return flag
}
