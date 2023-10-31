<template>
    <div class="antv-con">
        <el-row>
            <el-col :span="24">
                <!-- 折线图 -->
                <div class="grid-content ep-bg-purple">
                    <p>菜品分类销量趋势</p>
                    <div id="antline"></div>
                    <div style="margin-top: 20px;" class="line">
                        <el-radio-group v-model="sort_radio">
                            <el-radio-button v-for="(item, index) in radio_arr" :key="index" :label="item" />
                        </el-radio-group>
                        
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<!--  -->
<script>
import { Line } from '@antv/g2plot';
import { reactive, watch, toRefs, getCurrentInstance } from 'vue';
export default {
    props: { lineData: Array },
    setup(props) {
        const { proxy } = getCurrentInstance()
        const res_data = reactive({
            sort_radio: "素菜类",
            line_chert: [],
            radio_arr: ['素菜类', '荤菜类', '酒水类', '龙虾'],
            line_updata: null
        })

        function lineChert() {
            const line = new Line('antline', {
                data: res_data.line_chert,
                xField: 'month',
                yField: 'sales-volume',
                label: {},
                point: {
                    size: 5,
                    shape: 'diamond',
                    style: {
                        fill: 'white',
                        stroke: '#5B8FF9',
                        lineWidth: 2,
                    },
                },
                tooltip: { showMarkers: false },
                state: {
                    active: {
                        style: {
                            shadowBlur: 4,
                            stroke: '#000',
                            fill: 'red',
                        },
                    },
                },
                meta: {
                    'sales-volume': {
                        alias: "销售额"
                    }
                },
                interactions: [{ type: 'marker-active' }],
            });

            line.render();
            res_data.line_updata = line
        }

        async function Switch(val) {
            try {
                const res = await new proxy.$request(proxy.$urls.m().switchcate + "?cateid=" + val).modeget()
                res_data.line_updata.changeData(res.data.data)
            } catch (e) {

            }
        }

        // 数据监听，props是传进来的数据，newVal和oldVal是新旧值
        watch(props, (newVal, oldVal) => {
            res_data.line_chert = newVal.lineData
            lineChert(res_data.line_chert)
        })

        // 监听点击的菜品类目
        watch(() => res_data.sort_radio, (newVal, oldVal) => {
            Switch(newVal)
        })

        return { ...toRefs(res_data) }
    }
}
</script>
<!--  -->
<style>
.antv-con {
    text-align: left;
}

.grid-content p {
    font-size: 18px;
    font-weight: 600;
}

.line {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>