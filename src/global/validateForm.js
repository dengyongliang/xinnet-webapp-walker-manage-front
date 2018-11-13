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
      if (value === '' && required) {
        v.showValidateResult({text:'请输入' + (label.substr(0,label.length-1) || '') + '！'})
        flag = false
        break
      } else {
        if (name === 'userEmail') {
          if (value !== '' && !GLOBAL.IS_EMAIL_AVAILABLE(value)) {
            v.showValidateResult({text:'请输入正确的邮件地址，如xinnet@xinnet.com！'})
            flag = false
            break
          }
        }
        if (name === 'userMobile') {
          if (value !== '' && !GLOBAL.IS_PHONE_AVAILABLE(value)) {
            v.showValidateResult({text:'请输入11位的手机号码！'})
            flag = false
            break
          }
        }
      }
    } else if (v.type === 'select') {
      let value = v.value
      if (value === '') {
        v.showValidateResult()
        flag = false
        break
      }
    } else if (v.type === 'upload') {
      let value = v.$refs.upload.fileList
      if (!value.length) {
        v.showValidateResult()
        flag = false
        break
      }
    } else if (v.type === 'radio') {
      let value = v.value
      if (!value.length) {
        v.showValidateResult()
        flag = false
        break
      }
    }
  }
  return flag
}
