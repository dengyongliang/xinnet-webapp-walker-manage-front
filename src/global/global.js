'use strict'

const TITLE = `行者`
const regPw = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/
const IS_PHONE_AVAILABLE = (str) => {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(str)) {
    return false
  } else {
    return true
  }
}
// 有效邮箱
const IS_EMAIL_AVAILABLE = (val) => {
  var reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
  if (!reg.test(val)) {
    return false
  } else {
    return true
  }
}
// 有效金额
const IS_MONEY_AVAILABLE = (val) => {
  var reg = /(^([+-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([+-]?)(0){1}$)|(^([+-]?)[0-9]\.[0-9]([0-9])?$)/
  if (!reg.test(val)) {
    return false
  } else {
    return true
  }
}
// 正整数
const IS_POSITIVE_INT = (val) => {
  var reg = /(^[1-9]\d*$)/
  if (reg.test(val)) {
    return true
  } else {
    return false
  }
}
function CONVERT_RADIO (roles, map) {
  const result = []
  // 遍历 roles
  roles.forEach((item) => {
    // 读取 map 的键值映射
    const label = item[ map.label ]
    const code = item[ map.code ]
    const value = item[ map.value ]
    let disabled = false
    if (typeof map.disabled !== 'undefined') {
      // 1 可以选，0 不可以选
      disabled = !item[map.disabled]
    }
    result.push({
      label,
      code,
      value,
      disabled
    })
  })
  return result
}
const TRIM_ALL = (val) => {
  return val.replace(/\s+/g, '')
}
const IS_DOMAIN_AVAILABLE = (val) => {
  var reg = /^[0-9a-zA-Z\u4e00-\u9faf]+[0-9a-zA-Z\u4e00-\u9faf-]*\.[a-zA-Z\u4e00-\u9faf]{2,4}(?:\.[a-zA-Z\u4e00-\u9faf]{2,4})?$/
  if (!reg.test(val)) {
    return false
  } else {
    return true
  }
}
export default
{
  TRIM_ALL,
  TITLE,
  regPw,
  IS_PHONE_AVAILABLE,
  IS_EMAIL_AVAILABLE,
  IS_MONEY_AVAILABLE,
  IS_POSITIVE_INT,
  CONVERT_RADIO,
  IS_DOMAIN_AVAILABLE
}
