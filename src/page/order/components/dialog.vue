<template>
    <!-- dialog对话框 -->
    <!-- dialogVisible为true显示对话框 -->
    <el-dialog v-model="res.dialogVisible" title="详细菜单" width="400px" center>
        <div class="eat_cont">
            <div class="eat-dia" v-for="(item, index) in res.datamenu" :key="index">
                <div class="eat-til">
                    <!-- 我们根据res.datamenu的长度-索引，来判断是第几次下单 -->
                    <h3>第{{ res.datamenu.length - index }}次下单</h3>
                </div>
                <!-- 下面这个v-for是遍历某次下单的数据 -->
                <div class="eat-dan" v-for="(v, i) in item.goods_list">
                    <span>{{ v.name }}</span>
                    <!-- 用v-if指令来显示或隐藏，如果有规格，就显示规格，如果没有，就不显示 -->
                    <span v-if="v.good_specs != ''">{{ v.good_specs }}</span>
                    <span>{{ v.quantity }}{{ v.unit }}</span>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>

import { reactive } from 'vue'
export default {
    setup() {
        const res = reactive({
            dialogVisible: false,//弹窗是否显示隐藏，如果是false，就不显示，如果是true，就显示
            datamenu: []
        })
        //被父组件调用的方法，要携带值val
        function Son(val) {
            res.dialogVisible = true
            //接口数据与页面数据对应
            res.datamenu = val
            console.log(val)
        }
        return { res, Son }
    }
}

</script>

<style></style>