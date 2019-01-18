"use strict"
const TITLE = `行者`
const regPw = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/
const IS_PHONE_AVAILABLE = (str) => {
  var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}
const IS_EMAIL_AVAILABLE = (val) => {　　
  var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")  　　
  if (!reg.test(val)) {
    return false
  } else {
    return true
  }
}
const IS_MONEY_AVAILABLE = (val) => {　　
  var reg = /(^([+-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([+-]?)(0){1}$)|(^([+-]?)[0-9]\.[0-9]([0-9])?$)/  　　
  if (!reg.test(val)) {
    return false
  } else {
    return true
  }
}
const CRT_TIME_FORMAT = (val) => {
  if (val != null) {
    var date = new Date(val);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  } else {
    return ''
  }
}
const BUSINESS_LIST = [
  {register: '域名注册'},
  {renew: '域名续费'},
  {repurchase: '域名回购'},
  {protection: '域名保护'},
  {transferIn: '域名转入'}
]
const ORDER_GOODS_TYPE = [
  {1: '域名注册'},
  {2: '域名续费'},
  {3: '域名回购'},
  {4: '域名保护'},
  {5: '域名转入'}
]
export default
{
  TITLE,
  regPw,
  IS_PHONE_AVAILABLE,
  IS_EMAIL_AVAILABLE,
  IS_MONEY_AVAILABLE,
  CRT_TIME_FORMAT,
  BUSINESS_LIST,
  ORDER_GOODS_TYPE
}