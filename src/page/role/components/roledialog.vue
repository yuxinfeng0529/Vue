<template>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
        <el-form :model="form">
            <el-form-item label="Promotion name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Zones" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="Please select a zone">
                    <el-option label="Zone No.1" value="shanghai" />
                    <el-option label="Zone No.2" value="beijing" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<!--  -->
<script>
import { reactive, toRefs } from 'vue'
export default {
    setup() {
        const oper_data = reactive({
            dialogFormVisible: true,
            form: []
        })

        return { ...toRefs(oper_data) }
    }
}
</script>
<!--  -->
<style></style>