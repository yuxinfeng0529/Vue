<template>
    <div class="eat-container">
        <h3 style="text-align: left;">数据分析</h3>
        <First :pieData="pieData" :hisTogram="hisTogram"></First>
        <Second :lineData="lineData"></Second>
    </div>
</template>
<!--  -->
<script>
import { onMounted, getCurrentInstance, reactive, toRefs } from 'vue';
import First from './component/first.vue'
import Second from './component/second.vue'
export default {
    components: {
        First,
        Second
    },
    setup() {
        const { proxy } = getCurrentInstance()
        const state = reactive({
            pieData: [],// 饼图数据
            hisTogram: [],// 柱状图数据
            lineData: [],// 折线图数据
        })
        async function get_andata() {
            try {
                const res = await new proxy.$request(proxy.$urls.m().analysis).modeget()
                state.pieData = res.data.data[0]
                state.hisTogram = res.data.data[1]
                state.lineData = res.data.data[2]
            } catch (e) {
                new proxy.$tips('服务器错误', 'error').mess_age()
            }
        }
        onMounted(() => {
            get_andata()
            
        })
        return { ...toRefs(state) }
    }
}
</script>
<!--  -->
<style></style>