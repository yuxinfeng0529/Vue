<template>
    <div class="eat-container">
        <h3 style="text-align: left;">订单管理</h3>
        <div class="eat-shop">
            <p>交易时间</p>
            <div>
                <!-- 日期范围选择器 -->
                <el-date-picker v-model="time" type="daterange" range-separator="至" unlink-panels start-placeholder="开始时间"
                    end-placeholder="结束时间" value-format="YYYY-MM-DD" />
            </div>
            <p>桌号</p>
            <div>
                <!-- 桌号下列框 -->
                <el-select v-model="sevalue" class="m-2" placeholder="请选择桌号">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div style="margin-left: 30px;">
                <el-button type="success" @click="searchFun(time, sevalue)">查询</el-button>
            </div>
        </div>

        <!-- 表格 -->
        <div>
            <el-table :data="table_data" style="width: 100%">
                <el-table-column prop="order_time" label="交易时间" min-width="100" />
                <el-table-column prop="table_number" label="桌号" min-width="100" />
                <el-table-column prop="number_of_diners" label="用餐人数" min-width="100" />
                <el-table-column label="菜品详情" min-width="100">
                    <!-- template里的组件下标，获取的值是scope.$index -->
                    <template #default="scope">
                        <!-- scope.$index==dataload?true:false这个判断表示，如果点击的按钮下标是正整数或者0，那么就处于加载状态，否则处于不加载状态 -->
                        <el-button type="default" @click="detail(scope.$index, scope.row._id)"
                            :loading="scope.$index == dataload ? true : false">详细菜单</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="sett_amount" label="交易金额" min-width="100" />
                <el-table-column label="交易状态" min-width="100">
                    <template #default="scope">
                        <el-button v-if="scope.row.transac_status == 'success'" disabled type="danger">已结账</el-button>
                        <el-button v-else type="danger">未结账</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentchange"
                :hide-on-single-page="true" />
            <!-- ref()这个方法里有一个value属性，我们可以通过value属性来改变值 -->
            <Dialog ref="dialog"></Dialog>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, onMounted, ref } from 'vue'
import qs from 'qs'
import Dialog from './components/dialog.vue'
export default {
    components: {
        Dialog
    },

    setup() {
        const { proxy } = getCurrentInstance()
        //ref 对象是可更改的，也就是说你可以为 .value 赋予新的值。它也是响应式的，即所有对 .value 的操作都将被追踪，并且写操作会触发与之相关的副作用。
        const dialog = ref()
        //定义数据
        const oper_data = reactive({
            time: [],//选中的时间
            sevalue: '',//选中的桌号
            options: [],//桌号的数据
            table_data: [],//表格数据
            page: 0,//当前页的数据
            total: 0,//数据总的条数
            dataload: -1,
        })
        //生命周期的钩子函数，页面挂载之后，执行get_order()方法
        onMounted(() => {
            get_order()
        })
        //调用接口数据的方法
        async function get_order() {
            //query是传递的参数，因为我们这里要传递三个参数，所以我们使用了qs模块，qs模块可以将几个参数打包来传递
            const query = qs.stringify({
                page: oper_data.page,
                table_number: oper_data.sevalue,
                order_time: JSON.stringify(oper_data.time)
            })
            try {
                //请求桌号数据
                const TAB = await new proxy.$request(proxy.$urls.m().gettable).modeget()
                //请求订单管理数据
                const ORDER = await new proxy.$request(proxy.$urls.m().obtainorder + '?' + query).modeget()
                //因为这里要请求两个数据接口，所以用到了Promise里的all()方法
                const res = await Promise.all([TAB, ORDER])
                console.log(res)
                //下面就是将接口里的数据和页面数据对应起来
                oper_data.options = res[0].data.data
                oper_data.table_data = res[1].data.data.result
                oper_data.total = res[1].data.data.total
            } catch (e) {
                //TODO handle the exception
                new proxy.$tips('服务器错误', 'error').mess_age()
            }
        }
        function searchFun(time, sevalue) {
            get_order()
        }

        //分页
        function currentchange(e) {
            oper_data.page = e - 1//第一页为0,所以我们的当前页的page就是e-1
            get_order()
        }

        async function detail(index, id) {
            oper_data.dataload = index
            try {
                const res = await new proxy.$request(proxy.$urls.m().vieworder + "?id=" + id).modeget()
                dialog.value.Son(res.data.data)
                console.log(res)
                oper_data.dataload = -1
            } catch (e) {
                oper_data.dataload = -1
            }
        }
        return { ...toRefs(oper_data), currentchange, detail, dialog, searchFun }
    }
}
</script>

<style></style>