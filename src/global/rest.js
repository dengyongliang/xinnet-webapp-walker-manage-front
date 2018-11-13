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
    return false
  } else if (response.data.code === '900') {
    emitter.emit('requestError')
    return false
  } else {
    return response
  }
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 403:
        // err.message = '权限错误'
        emitter.emit('noPermission')
        break
      case 404:
        // 火狐浏览器不返回511，返回404
        // err.message = '登录失效'
        emitter.emit('noLogin')
        break
      case 511:
        // err.message = '登录失效'
        emitter.emit('noLogin')
        break
      default:
        emitter.emit('errorOther')
        // err.message = `连接错误${err.response.status}`
    }
  } else {
    emitter.emit('errorServer')
    //err.message = '连接到服务器失败'
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