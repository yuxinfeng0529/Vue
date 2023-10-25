<template>
    <div class="eat-container">
        <h3 style="text-align: left;">员工详情</h3>
        <div class="about">
            <el-button type="success" @click="addFn">添加员工</el-button>
            <el-button type="primary">批量删除</el-button>
        </div>
        <div>
            <el-table :data="data_table" style="width: 100%">
                <el-table-column prop="time" label="创建时间" min-width="100" />
                <el-table-column prop="jobnumber" label="工号" min-width="100" />
                <el-table-column prop="name" label="姓名" min-width="100" />
                <el-table-column prop="sex" label="性别" min-width="100" />
                <el-table-column prop="position" label="职位" min-width="100" />
                <el-table-column label="是否离职" min-width="100">
                    <template #default="scope">
                        <el-switch v-model="scope.row.quit" />
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentchange"
                :hide-on-single-page="true" />
            <Dialog ref="dialog"></Dialog>
        </div>
    </div>
</template>
<!--  -->
<script>
import Dialog from './components/roledialog.vue'
import { reactive, toRefs, ref, onMounted, getCurrentInstance } from 'vue'
export default {
    components: {
        Dialog
    },
    setup() {
        const dialog = ref()
        const { proxy } = getCurrentInstance()
        const oper_data = reactive({
            data_table: [],// 表格数据
            page: 0,// 分页数
            total: 0,// 总的数据条数
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
                // console.log(res)
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
        return { ...toRefs(oper_data), dialog, addFn, getCom, currentchange }
    }
}
</script>
<!--  -->
<style scoped>
.about {
    width: 200px;

}
</style>