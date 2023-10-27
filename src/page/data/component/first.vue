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
import { onMounted } from 'vue'
import { Pie, Column } from '@antv/g2plot'
export default {
    setup() {
        // 饼图
        function pieChert() {
            const data = [
                {
                    type: '分类一', value: 27
                },
                {
                    type: '分类二', value: 25
                },
                {
                    type: '分类三', value: 18
                },
                {
                    type: '分类四', value: 15
                },
                {
                    type: '分类五', value: 10
                },
                {
                    type: '其他', value: 5
                },
            ]
            const piePlot = new Pie('antvpie', {
                appendPadding: 10,
                data,
                angleField: 'value',
                colorField: 'type',
                radius: 0.8,
                label: {
                    type: 'outer',
                },
                interactions: [{ type: 'element-active' }],
            });

            piePlot.render();
        }
        //柱状图
        function column() {
            const data = [
                {
                    type: '家具家电',
                    sales: 38,
                },
                {
                    type: '粮油副食',
                    sales: 52,
                },
                {
                    type: '生鲜水果',
                    sales: 61,
                },
                {
                    type: '美容洗护',
                    sales: 145,
                },
                {
                    type: '母婴用品',
                    sales: 48,
                },
                {
                    type: '进口食品',
                    sales: 38,
                },
                {
                    type: '食品饮料',
                    sales: 38,
                },
                {
                    type: '家庭清洁',
                    sales: 38,
                },
            ];

            const columnPlot = new Column('antcol', {
                data,
                xField: 'type',
                yField: 'sales',
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
                    type: {
                        alias: '类别',
                    },
                    sales: {
                        alias: '销售额',
                    },
                },
            });

            columnPlot.render();
        }
        onMounted(() => {
            pieChert()
            column()
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