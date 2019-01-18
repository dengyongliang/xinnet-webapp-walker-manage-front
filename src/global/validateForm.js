import GLOBAL from './global'
export default function validateFormResult (validateArray) {
  let len = validateArray.length
  let flag = true
  for (var i = 0; i < len; i++) {
    let v = validateArray[i]
    if (v.type === 'text') {
      let name = v.name
      let value = v.value
      let required = v.required
      let label = v.label
      let validate = v.validate

      if (value === '' && required) {
        v.showValidateResult({text:'请输入' + (label.substr(0,label.length-1) || '') + '！'})
        flag = false
        // break
      } else {
        if (name === 'userEmail') {
          if (value !== '' && !GLOBAL.IS_EMAIL_AVAILABLE(value)) {
            v.showValidateResult({text:'请输入正确的邮件地址，如xinnet@xinnet.com！'})
            flag = false
            // break
          }
        }
        if (name === 'userMobile') {
          if (value !== '' && !GLOBAL.IS_PHONE_AVAILABLE(value)) {
            v.showValidateResult({text:'请输入11位的手机号码！'})
            flag = false
            // break
          }
        }
        if (validate==='money') {
          if (value !== '' && !GLOBAL.IS_MONEY_AVAILABLE(value)) {
            v.showValidateResult({text:'格式错误！'})
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
      if (!value.length) {
        v.showValidateResult()
        flag = false
        // break
      }
    } else if (v.type === 'reMoney') {
      let money = v.value1
      let remoney = v.value2
      if (money === '' && remoney === '') {
        v.showValidateResult1({text:'请输入金额！'})
        v.showValidateResult2({text:'请再次输入金额！'})
        flag = false
      } else {
        if (money !== '' && !GLOBAL.IS_MONEY_AVAILABLE(money)) {
          v.showValidateResult1({text:'格式错误！'})
          flag = false
        }
        if (remoney !== '' && !GLOBAL.IS_MONEY_AVAILABLE(remoney)) {
          v.showValidateResult2({text:'格式错误！'})
          flag = false
        }
        if (GLOBAL.IS_MONEY_AVAILABLE(remoney) && money !== remoney) {
          v.showValidateResult2({text:'金额不一致！'})
          flag = false
        }

      }
    }
  }
  return flag
}
