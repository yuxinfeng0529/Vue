// 将所有接口写再这里
const url = 'https://meituan.thexxdd.cn/apit'
// 可以写函数也可以写类
const urls = class {
    // 静态方法
    static m() {
        // 注册接口，模板字符串插入变量
        const register = `${url}/register ` // 等同于https://meituan.thexxd.cn/apit/register
        // 登录接口
        const login = `${url}/login `
        // 用户列表
        const pulluserlist = `${url}/pulluserlist`
        // 获取桌号
        const gettable = `${url}/gettable`
        // 订单管理
        const obtainorder = `${url}/obtainorder`
        // 详细订单
        const vieworder = `${url}/vieworder`
        // 图片上传接口
        const uploadres = `${url}/uploadres`
        // 菜品类目
        const obtaincate = `${url}/obtaincate`
        // 菜品单位
        const obtainunit = `${url}/obtainunit`
        //  自定义单位
        const dishunit = `${url}/dishunit`
        // 获取菜品
        const putdishes = `${url}/putdishes`
        
        return {
            register,
            login,
            pulluserlist,
            gettable,
            obtainorder,
            vieworder,
            uploadres,
            obtaincate,
            obtainunit,
            dishunit,
            putdishes
        }
    }
}
export default urls