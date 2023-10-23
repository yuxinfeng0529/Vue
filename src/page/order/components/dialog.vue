<!-- 详细菜单 -->

<template>
    <el-dialog v-model="dialogVisible" title="详细菜单" width="400px" center>
        <div>
            <h3 style="text-align: left;">第一次下单</h3>
        </div>
        <div class="eat-dia">
            <div class="eat-dan">
                <span>家常鲫鱼</span>
                <span>1000g</span>、
                <span>5份</span>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
    setup() {
        const res = reactive({
            dialogVisible: false
        })

        return { ...toRefs(res) }
    }
}
</script>

<style>
</style>