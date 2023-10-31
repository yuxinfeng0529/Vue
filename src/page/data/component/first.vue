<template>
    <div class="antv-con">
        <el-row :gutter="50">
            <el-col :span="12">
                <!-- 饼图 -->
                <div class="grid-content ep-bg-purple">
                    <p>菜品销量排行榜</p>
                    <div id="antvpie"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <!-- 柱状图 -->
                <div class="grid-content ep-bg-purple">
                    <p>客户年龄分布</p>
                    <div id="antcol"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<!--  -->
<script>
import { Pie, Column } from '@antv/g2plot'
import { watch } from 'vue';
export default {
    props: { pieData: Array, hisTogram: Array },
    setup(props) {
        // 饼图
        function pieChert(data) {
            const piePlot = new Pie('antvpie', {
                appendPadding: 10,
                data,
                angleField: 'value',
                colorField: 'name',
                radius: 0.8,
                label: {
                    type: 'outer',
                    content: '{name}{percentage}'
                },
                interactions: [{ type: 'element-active' }],
            });

            piePlot.render();
        }
        //柱状图
        function column(data) {
            const columnPlot = new Column('antcol', {
                data,
                xField: 'age',
                yField: 'sales-volume',
                label: {
                    position: 'middle',
                    style: {
                        fill: '#FFFFFF',
                        opacity: 0.6,
                    },
                },
                xAxis: {
                    label: {
                        autoHide: true,
                        autoRotate: false,
                    },
                },
                meta: {
                    'age': {
                        alias: '类别',//alias表示别名
                    },
                    'sales-volume': {
                        alias: '销售额',
                    },
                },
            });

            columnPlot.render();
        }

        // 数据监听，props是传进来的数据，newVal和oldVal是新旧值
        watch(props, (newVal, oldVal) => {
            pieChert(newVal.pieData)
            column(newVal.hisTogram)
        })

        return {}
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
</style>