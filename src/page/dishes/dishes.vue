<template>
	<div class="eat-container">
		<h3  style="text-align: left;">菜品管理</h3>
		<div style="text-align: right;">
			<router-link :to="{name:'dishesupload'}"><el-button type="success">添加菜品</el-button></router-link>
		</div>
		<div>
			<el-table :data="table_data" style="width: 100%">
			    <el-table-column prop="order_time" label="创建时间" min-width="100" />
			    <el-table-column prop="table_number" label="类目" min-width="100"  />
			 <el-table-column  prop="number_of_diners" label="菜品名称" min-width="100" />
			  <el-table-column label="商品图片"  min-width="100">
				<!-- template里的组件下标，获取的值是scope.$index -->
				  <template #default="scope">
					  <el-image
					       style="width: 100px; height: 100px"
					       :src="url"
					       fit="cover"
					     />
				  </template>
			  </el-table-column>
			   <el-table-column prop="sett_amount" label="价格"  min-width="100" />
			   <el-table-column label="操作"  min-width="100">
				   <template #default="scope">
					      <el-button type="danger">编辑</el-button>
						  <el-button  type="danger">下架</el-button>
				   </template>
			   </el-table-column>
			  </el-table>
		</div>
	</div>
</template>

<script>
	import {reactive,toRefs} from 'vue'
	export default {
		setup() {
			const oper_data=reactive({
				table_data:[],
				url:'',
				
			})
			return{...toRefs(oper_data)}
		}
	}
</script>

<style>
</style>