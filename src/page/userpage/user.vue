<template>
	<div class="eat-container">
		<h3 style="text-align: left;">用户列表</h3>
		<div>
			<el-table :data="user_array" style="width: 100%">
				<el-table-column prop="time" label="注册时间" min-width="100" />
				<el-table-column prop="name" label="姓名" min-width="100" />
				<el-table-column prop="head" label="头像" min-width="100">
					<!-- #default="scope"是一种用于处理列表渲染的语法，他允许我们在父组件里定义一个插槽，并通过子组件将数据传递给插槽
				 并通过子组件将数据传递给插槽 -->
					<template #default="scope">
						<el-image style="width: 50px; height: 50px;" :src="scope.row.head"
							:preview-src-list="[scope.row.head]" fit="cover" :preview-teleported="true"
							:hide-on-click-modal="true" />
					</template>
				</el-table-column>
				<el-table-column prop="sex" label="性别" min-width="100" />
				<el-table-column prop="position" label="职业" min-width="100" />
			</el-table>

			<!-- 分页 -->
			<el-pagination background layout="prev, pager, next" :total="total" @current-change="currentchange"
				:hide-on-single-page="true" />
		</div>
	</div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance } from 'vue'
export default {
	setup() {
		const { proxy } = getCurrentInstance()
		const oper_data = reactive({
			user_array: [],//表格数据
			total: 0,//总的数据条数
			page: 0
		})
		const currentchange = (e) => {
			oper_data.page = e - 1//第一页为0,所以我们的当前页的page就是e-1
			userlist()
		}

		onMounted(() => {
			userlist()//挂载后调用数据
		})
		async function userlist() {
			try {
				const res = await new proxy.$request(proxy.$urls.m().pulluserlist + "?page=" + oper_data.page).modeget()
				//将表格数据oper_data.userarray和接口数据res.data.data.result对应起来
				oper_data.user_array = res.data.data.result
				oper_data.total = res.data.data.total
			} catch (e) {
				//TODO handle the exception
				new proxy.$tips('服务器错误', 'error').mess_age()
			}
		}

		return { ...toRefs(oper_data), currentchange }
	}
}
</script>

<style></style>