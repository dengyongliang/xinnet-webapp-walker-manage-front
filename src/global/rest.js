// 引入axios
import axios from 'axios'
import NProgress from 'nprogress'
import Event from './event'

export const emitter = new Event()
let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;
// 请求拦截器
axios.interceptors.request.use(config => {
  // 发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  // 参数错误
  if (response.data.code === '500') {
    emitter.emit('paramError')
  // 登录失效
  } else if (response.data.code === '800') {
    emitter.emit('noLogin')
  // 请求失效
  } else if (response.data.code === '900') {
    emitter.emit('requestError')
  }
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '连接到服务器失败'
  }
  // message.err(err.message)
  return Promise.resolve(err.response)
})

axios.defaults.baseURL = '/'
  // 设置默认请求头
axios.defaults.headers = {
  'Content-Type': 'application/json; charset=utf-8'
}
axios.defaults.timeout = 5000

export default {
  // get请求
  get(url, param, callback) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
        NProgress.done()
        if (callback && typeof callback === 'function') {
          callback(res)
        }
      })
    })
  },
  // post请求
  post(url, param, callback) {
    NProgress.start()
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
        NProgress.done()
        if (callback && typeof callback === 'function') {
          callback(res)
        }
      })
    })
  }
}