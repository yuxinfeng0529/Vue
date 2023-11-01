<template>
    <div class="eat-container">
        <h3 style="text-align: left;">员工详情</h3>
        <div class="about">
            <el-button type="success" @click="addFn">添加员工</el-button>
            <el-button type="primary" @click="delFn" :disabled="arr_id.length > 0 ? false : true">批量删除</el-button>
        </div>
        <div>
            <el-table :data="data_table" style="width: 100%" @select="Select" @select-all="Selectall">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="time" label="创建时间" min-width="100" />
                <el-table-column prop="jobnumber" label="工号" min-width="100" />
                <el-table-column prop="name" label="姓名" min-width="100" />
                <el-table-column prop="sex" label="性别" min-width="100" />
                <el-table-column prop="position" label="职位" min-width="100" />
                <el-table-column label="是否离职" min-width="100">
                    <template #default="scope">
                        <el-switch v-model="scope.row.quit" @change="Switch($event, scope.row._id, $index)" />
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentchange"
                :hide-on-single-page="true" />
            <Dialog ref="dialog" @launch="launch"></Dialog>
        </div>
    </div>
</template>
<!--  -->
<script>
import Dialog from './components/roledialog.vue'
import { reactive, toRefs, ref, onMounted, getCurrentInstance } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import qs from 'qs'
export default {
    components: {
        Dialog
    },
    setup() {
        //ref 对象是可更改的，也就是说你可以为 .value 赋予新的值。它也是响应式的，即所有对 .value 的操作都将被追踪，并且写操作会触发与之相关的副作用。
        const dialog = ref()
        const { proxy } = getCurrentInstance()
        const oper_data = reactive({
            data_table: [],// 表格数据
            page: 0,// 分页数
            total: 0,// 总的数据条数
            arr_id: []// 每一条数据的唯一标识_id
        })
        //点击添加员工按钮，让弹窗显示
        const addFn = () => {
            //通过ref()对象里的value来使用add(),add是自定义方法名称
            dialog.value.add()
        }
        //挂载的生命周期函数
        onMounted(() => {
            getCom()
        })
        //获取员工数据
        async function getCom() {
            try {
                const res = await new proxy.$request(proxy.$urls.m().getemployees + "?page=" + oper_data.page).modeget()
                oper_data.data_table = res.data.data.result
                oper_data.total = res.data.data.total
            } catch (e) {
                new proxy.$tips('服务器错误', 'error').mess_age()
            }
        }
        // 分页
        const currentchange = (e) => {
            oper_data.page = e - 1//第一页为0,所以我们的当前页的page就是e-1
            getCom()
        }
        // 开关触发器的触发
        const Switch = async (val, id, index) => {
            const query = qs.stringify({ id, quit: val })
            try {
                const res = await new proxy.$request(proxy.$urls.m().modifyresi + "?" + query).modeget()
                if (res.status != 200) {
                    new proxy.$tips(res.data.msg, "warning").mess_age()
                } else {
                    new proxy.$tips(res.data.msg, "warning").mess_age()
                }
            } catch (e) {
                new proxy.$tips('服务器错误', "warning").mess_age()
            }
        }
        // 复选按钮或者取消选中
        // select:当用户手动勾选数据行的 Checkbox 时触发的事件
        function Select(e) {
            const ID = e.map(item => {
                return item._id
            })
            oper_data.arr_id = ID
        }
        // 全选按钮或者取消全选
        // select-all:当用户手动勾选全选 Checkbox 时触发的事件
        function Selectall(e) {
            const ID = e.map(item => {
                return item._id
            })
            oper_data.arr_id = ID
        }
        // 被子组件调用的方法，重新获取页面数据
        function launch() {
            getCom()
        }
        // 删除员工数据
        async function delFn() {
            ElMessageBox.confirm(
                `请问您是要删除${oper_data.arr_id.length}个员工吗?`,
                '提示',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                //点击确认按钮后，执行then里方法
                .then(() => {
                    delApi()//执行删除员工信息的接口方法
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '删除不成功',
                    })
                })
        }
        // 调用删除员工数据的接口的方法
        async function delApi() {
            const obj = { arrayid: oper_data.arr_id }
            try {
                const res = await new proxy.$request(proxy.$urls.m().deleteemp, obj).modepost()
                if (res.status != 200) {
                    new proxy.$tips(res.data.msg, 'warning').mess_age()
                } else {
                    new proxy.$tips(res.data.msg, 'warning').mess_age()
                    getCom()
                }
            } catch (e) {
                console.log(e)
                new proxy.$tips('服务器错误', 'error').mess_age()
            }
        }
        return { 
            ...toRefs(oper_data), 
            dialog, 
            addFn, 
            getCom, 
            currentchange,
            Switch, Select, 
            Selectall, 
            delFn, 
            delApi, 
            launch 
        }
    }
}
</script>
<!--  -->
<style scoped>
.about {
    width: 200px;

}
</style>