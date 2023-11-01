<template>
    <el-dialog v-model="dialogFormVisible" style="width: 30%;">
        <el-form :model="form">
            <el-form-item label="工号">
                <el-input v-model="form.jobnumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex" class="ml-4">
                    <el-radio label="001">男</el-radio>
                    <el-radio label="002">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="职位">
                <el-input v-model="form.position" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否离职">
                <el-radio-group v-model="form.quit">
                    <el-radio label="001">在职</el-radio>
                    <el-radio label="002">离职</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="Submit" :loading="sub_load">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<!--  -->
<script>
import { reactive, toRefs, getCurrentInstance } from 'vue';
export default {
    emits:['launch'],// 接受父组件传的方法
    setup(props,{emit}) {
        const { proxy } = getCurrentInstance()
        const form = {
            jobnumber: '',//工号
            name: '',//姓名
            sex: '',//性别
            position: '',//职位
            quit: '',//是否离职
        }
        const state = reactive({
            form,
            dialogFormVisible: false,
            sub_load:false
        })
        // 被父组件调用的方法
        function add() {
            state.dialogFormVisible = true
        }
        //添加员工
        async function Submit() {
            const { jobnumber, name, sex, position, quit } = state.form
            const obj = { jobnumber, name, sex, position, quit }
            state.sub_load=true
            try {
                const res = await new proxy.$request(proxy.$urls.m().addem, obj).modepost()
                emit('launch')// 使用从父组件里传过来的方法
                if (res.status != 200) {
                    new proxy.$tips(res.data.msg, 'warning').mess_age()
                } else {
                    state.dialogFormVisible = false
                    new proxy.$tips(res.data.msg, 'warning').mess_age()
                }
                state.sub_load=false
            } catch (e) {
                state.sub_load=false
            }
        }

        return { ...toRefs(state), add, Submit }
    }
}
</script>
<!--  -->
<style></style>