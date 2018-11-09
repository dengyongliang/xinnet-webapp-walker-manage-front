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
const CRT_TIME_FORMAT = (val) => {
  if (val != null) {
    var date = new Date(val);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  } else {
    return ''
  }
}
export default
{
  TITLE,
  regPw,
  IS_PHONE_AVAILABLE,
  IS_EMAIL_AVAILABLE,
  CRT_TIME_FORMAT
}