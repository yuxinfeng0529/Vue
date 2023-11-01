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
        // 上架菜品
        const putdishes = `${url}/putdishes`
        // 上架菜品
        const obtaindishes = `${url}/obtaindishes`
        // 下架菜品
        const fromsale = `${url}/fromsale`
        // 添加员工
        const addem = `${url}/addem`
        // 获取员工详情
        const getemployees = `${url}/getemployees`
        // 修改离职状态
        const modifyresi = `${url}/modifyresi`
        // 删除员工接口
        const deleteemp = `${url}/deleteemp`
        // 数据分析
        const analysis = `${url}/analysis`
        // 数据分析(折线图菜品分类)
        const switchcate = `${url}/switchcate`
        // 编辑菜品
        const editdishes = `${url}/editdishes`

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
            putdishes,
            obtaindishes,
            fromsale,
            addem,
            getemployees,
            modifyresi,
            deleteemp,
            analysis,
            switchcate,
            editdishes,
        }
    }
}
export default urls