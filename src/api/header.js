// 这个页面是对axios进行拦截，对token进行加密
import axios from 'axios'
// 安装js-base64的命令是npm install --save js-base64
import { Base64 } from 'js-base64'

import { ElMessageBox } from 'element-plus'


// 创建一个通用的axios配置
let instance = axios.create({
    // 浏览器响应返回的数据类型
    responseType: 'json',
    // 自定义请求头
    headers: {
        'Content-Type': "application/json"
    }
})
// 对token进行加密
function baseFun() {
    // 从本地浏览器获取token
    const token = localStorage.getItem('token')
    // 对token进行加密
    const base64 = Base64.encode(token + ":")
    // Basic传值是后端设定的
    return 'Basic ' + base64
}

// http拦截,在axios请求发送之前对token进行验证
// interceptors:拦截器
instance.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = baseFun()
    }
    return config
}, err => {
    // 请求失败，给一个错误信息
    return Promise.reject(err)
})

// http拦截,在axios请求发送之后，响应
instance.interceptors.response.use(response => {
    return response
}, err => {
    if (err.response){
        let ERRS = err.response.status// 返回的状态码
        let MSG = err.response.data.msg.msg// 返回的提示信息
        let errdata = ERRS == 401 ? MSG : "服务器错误"// 只要返回的状态码不是401，那么就提示服务器错误

        switch (ERRS) {
            case 401:
                ElMessageBox.alert(errdata, '信息提示', {
                    confirmButtonText: '确认',
                    type: 'error',
                })
                .then(res=>{
                    // 跳转到登录界面
                    window.location.href='/'
                })
                .catch(err=>{
                    window.location.href='/'
                })
                break;
        }
    }
    return Promise.reject(error.response.data)
})
export default instance