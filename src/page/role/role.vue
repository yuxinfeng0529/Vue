<template>
    <div class="eat-container">
        <h3 style="text-align: left;">员工详情</h3>
        <div class="about">
            <el-button type="success">添加员工</el-button>
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
                    <el-switch v-model="value" disabled />
                </el-table-column>
            </el-table>
            <Dialog></Dialog>
        </div>
    </div>
</template>
<!--  -->
<script>
import Dialog from './components/roledialog.vue'
import { reactive, toRefs } from 'vue'
export default {
    components: {
        Dialog
    },
    setup() {
        const oper_data = reactive({
            data_table: [],
            value: ""
        })

        return { ...toRefs(oper_data) }
    }
}
</script>
<!--  -->
<style scoped>
.about {
    width: 200px;

}
</style>