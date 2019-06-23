// 引入axios
import axios from 'axios'

// 创建插件对象
var myaxios = {}

myaxios.install = function (Vue) {
    // 统一设置请求地址
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
    // 统一设置请求头(只会执行一次，一次设置完成后，之后的值都是一样的，所以造成login登录后重复token，要刷新获取数据)
    // axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')
    // 添加拦截器
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        // console.log(config);
        // 这里每次都设置的token
        // 在登录是不添加Authorization
        if (!config.url.includes('login')) {
            config.headers.Authorization = window.localStorage.getItem('token')
        }
        // console.log(config.headers.Authorization);
        return config;
    })
    Vue.prototype.$http = axios
}
export default myaxios