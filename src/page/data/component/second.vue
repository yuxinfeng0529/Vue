<template>
    <div class="antv-con">
        <el-row>
            <el-col :span="24">
                <!-- 折线图 -->
                <div class="grid-content ep-bg-purple">
                    <p>菜品分类销量趋势</p>
                    <div id="antline"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<!--  -->
<script>
import { onMounted } from 'vue';
import { Line } from '@antv/g2plot';
export default {
    setup() {
        function lineChert() {
            const data = [
                {
                    year: '1991', value: 3
                },
                {
                    year: '1992', value: 4
                },
                {
                    year: '1993', value: 3.5
                },
                {
                    year: '1994', value: 5
                },
                {
                    year: '1995', value: 4.9
                },
                {
                    year: '1996', value: 6
                },
                {
                    year: '1997', value: 7
                },
                {
                    year: '1998', value: 9
                },
                {
                    year: '1999', value: 13
                },
            ];

            const line = new Line('antline', {
                data,
                xField: 'year',
                yField: 'value',
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
                interactions: [{ type: 'marker-active' }],
            });

            line.render();
        }
        onMounted(() => {
            lineChert()
        })
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