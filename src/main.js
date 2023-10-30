import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './router'
import 'element-plus/dist/index.css'
import App from './App.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './style/main.css'

import urls from './api/api.js'
import request from './api/request.js'
import tips from './config/tips.js'

// 全局配置pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(router)

// $urls自定义变量名称
app.config.globalProperties.$urls=urls

// 请求方法
app.config.globalProperties.$request=request

// 弹出信息框
app.config.globalProperties.$tips=tips

app.use(pinia)
app.mount('#app')