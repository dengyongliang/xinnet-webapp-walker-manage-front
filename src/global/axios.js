/** axios封装
  * 请求拦截、相应拦截、错误统一处理
  */
import axios from 'axios'
// import router from './router'
import NProgress from 'nprogress'
import Event from './event'
export const emitter = new Event()

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = '/api'
  axios.defaults.baseURL = 'http://localhost:4400/static/data'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = '/admin-api'
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    case 403:
      // '权限错误'
      emitter.emit('noPermission')
      break
    case 404:
      // '登录失效'
      emitter.emit('noLogin')
      break
    case 511:
      // '登录失效'
      emitter.emit('noLogin')
      break
    default:
      emitter.emit('errorOther')
  }
}

/**
 * 请求成功后统一处理
 * @param {String} code 请求成功的状态码
 */
const successHandle = (code) => {
  // 状态码判断
  switch (code) {
    case '500':
      // 参数错误
      emitter.emit('paramError')
      break
    case '900':
      emitter.emit('requestError')
      break
    default:
  }
}

// 请求超时时间
axios.defaults.timeout = 1000 * 60

// 请求头
axios.defaults.headers = {'Content-Type': 'application/json; charset=utf-8'}

/**
   * 请求拦截器
   * 每次请求前，如果存在token则在请求头中携带token
   */
// axios.interceptors.request.use(
//   config => {
//     // 登录流程控制中，根据本地是否存在token判断用户的登录情况
//     // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
//     // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
//     // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
//     const token = store.state.token
//       token && (config.headers.Authorization = token)
//       return config
//   },
//   error => Promise.error(error)
// )
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.method === 'post') {
    config.data = JSON.stringify(config.data)
  }
  NProgress.start()
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(
  // 请求成功
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    NProgress.done()
    if (response.status === 200) {
      successHandle(response.data.code)
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 请求失败
  error => {
    NProgress.done()
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      emitter.emit('errorServer')
    }
  }
)
export default axios
