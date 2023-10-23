<template>
    <div id="backcont">
        <div id="demo-cont">
            <div class="eat-login">
                <div class="eat-title">
                    餐饮管理后台系统
                </div>
                <div class="eat-user">
                    <p>账号:</p>
                    <el-input clearable v-model="account" type="text" placeholder="请输入账号" />
                </div>
                <div class="eat-user">
                    <p>密码:</p>
                    <el-input show-password clearable v-model="password" type="password" placeholder="请输入密码" />
                </div>
                <div class="reg-view" @click="regi = regi == '登录' ? '注册' : '登录'">{{ regi }}</div>
                <el-button class="reg-btn" type="primary" v-if="regi == '注册'" :loading="load" @click="signin">登录</el-button>
                <el-button class="reg-btn" type="primary" v-else :loading="load"  @click="register">注册</el-button>
            </div>
        </div>
    </div>
</template>
    
<script>
// 因为setup中无法听过this获取组件实例，getCurrentInstance()是一个对象，proxy是getCurrentInstance的一个属性
// 可以通过解构getCurrentInstance()得到proxy
import { reactive, toRefs, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const { proxy } = getCurrentInstance()
        const router = useRouter()
        const user = reactive({
            account: '',
            password: '',
            regi: '注册',
            load:false
        })
        const signin = async () => {
            // 登录
            user.load=true
            const obj = { account: user.account, password: user.password }

            try {
                // $request这个是请求方法的变量，proxy.$urls.m().register获取接口，obj是post方法里传的参数
                const res = await new proxy.$request(proxy.$urls.m().login, obj).modepost()
                console.log(res)
                if (res.status != 200) {
                    new proxy.$tips(res.data.msg,'warning').mess_age()
                } else {
                    localStorage.setItem('token', res.data.data.token)
                    router.push({ name: "index" })
                }
                user.load=false
            } catch (e) {
                user.load=false
                new proxy.$tips('服务器错误','error').mess_age()
            }
        }
        const register = async () => {
            // 注册
            user.load=true
            const obj = { account: user.account, password: user.password }

            try {
                // $request这个是请求方法的变量，proxy.$urls.m().register获取接口，obj是post方法里传的参数
                const res = await new proxy.$request(proxy.$urls.m().register, obj).modepost()
                console.log(res)
                if (res.status != 200) {
                    new proxy.$tips(res.data.msg,'warning').mess_age()
                } else {
                    user.regi = "注册"
                }
                user.load=false
            } catch (e) {
                user.load=false
                new proxy.$tips('服务器错误','error').mess_age()
            }


        }
        return { ...toRefs(user), signin, register }
    }
}

</script>
    
<style></style>