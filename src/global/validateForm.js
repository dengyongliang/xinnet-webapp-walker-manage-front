export default function validateFormResult (validateArray) {
  let len = validateArray.length
  let flag = true
  for (var i = 0; i < len; i++) {
    let v = validateArray[i]
    let name = v.name
    let value = v.value
    let required = v.required
    let label = v.label
      console.log("name:"+name)
      console.log("required:"+required)
      console.log("value:"+value)
    if (value === '' && required) {
      v.showError = true
      v.errorText = '请输入' + (label.substr(0,label.length-1) || '') + '！'
      flag = false
      break
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
  return flag
}
