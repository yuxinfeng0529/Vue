<template>
	<div class="eat-container">
		<h3 style="text-align: left;">菜品管理</h3>
		<div style="text-align: right;">
			<router-link :to="{ name: 'dishesupload' }"><el-button type="success">添加菜品</el-button></router-link>
		</div>
		<div>
			<el-table :data="table_data" style="width: 100%">
				<el-table-column prop="time" label="创建时间" min-width="100" />
				<el-table-column prop="category" label="类目" min-width="100" />
				<el-table-column prop="name" label="菜品名称" min-width="100" />
				<el-table-column label="商品图片" min-width="100">
					<!-- template里的组件下标，获取的值是scope.$index -->
					<template #default="scope">
						<el-image style="width: 100px; height: 100px" :preview-teleported="true" fit="cover"
							:src="scope.row.image[0].url" />
					</template>
				</el-table-column>
				<el-table-column prop="unitprice" label="价格" min-width="100" />
				<el-table-column label="操作" min-width="100">
					<template #default="scope">
						<el-button type="danger">编辑</el-button>
						<el-button type="danger" v-if="scope.row.onsale"
							@click="getOut(scope.row.name, scope.row._id, scope.$index)">下架</el-button>
						<el-button type="danger" disabled v-else>已下架</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--  分页 -->
			<el-pagination background layout="prev,pager,next" :total="total" @current-change="currentchange"
				:hide-on-single-page="true" />
		</div>
	</div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
	setup() {
		const { proxy } = getCurrentInstance()
		const oper_data = reactive({
			table_data: [],// 表格数据
			page: 0,// 当前的页数
			total: 0,// 总共的页数

		})
		onMounted(() => {
			get_dishes()
		})
		//分页
		const currentchange=(e)=>{
			oper_data.page=e-1
			get_dishes()
		}
		// 获取菜品
		async function get_dishes() {
			try {
				const res = await new proxy.$request(proxy.$urls.m().obtaindishes + "?page=" + oper_data.page).modeget()
				console.log(res)
				oper_data.table_data = res.data.data.result
				oper_data.total = res.data.data.total

			} catch (e) {
				new proxy.$tips('服务器错误', 'error').mess_age()
			}
		}
		// 下架询问
		function ansOut(name, id, index) {
			ElMessageBox.confirm(
				`请问您是要下架${name}吗？`,
				'提示',
				{
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
				.then(() => {
					getOut(id,index)
				})
				.catch(() => {
					ElMessage({
						type: 'info',
						message: '下架不成功',
					})
				})
		}
		// 下架
		async function getOut(id, index) {
			try {
				const res = await new proxy.$request(proxy.$urls.m().fromsale + "?id" + id).modeget()
				// oper_data.table_data[index]是数据表里的第(index+1)条数据
				res.data.data.result[index].onsale = false
			} catch (e) {
				new proxy.$tips('服务器错误', 'error').mess_age()
			}
		}

		return {
			...toRefs(oper_data),
			get_dishes,
			getOut,
			ansOut,
			currentchange,
		}
	}
}
</script>

<style></style>