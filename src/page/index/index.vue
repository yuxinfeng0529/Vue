<template>
	<div>
		<div class="sider-top">
			<h3>餐饮后台管理系统</h3>
			<p style="cursor: pointer;" @click="signOut">退出</p>
		</div>
		<div class="sider-left">
			<!-- @select是菜单激活回调的事件 -->
			<el-menu :default-active="ac_index" @select="Select">
				<div v-for="(item,index) in menu" :key="index">
					
				<el-menu-item v-if="item.SubClass.length==0" :index="item.id">
						<el-icon>
							<!-- component动态组件，可以根据名称来渲染组件 -->
							<component :is="item.icon"></component>
						</el-icon>
						<span>{{item.title}}</span>
				</el-menu-item>
				
				<el-sub-menu v-if="item.SubClass.length>0" :index="item.id">
					<template #title>
					<el-icon>
						<component :is="item.icon"></component>
					</el-icon>
					<span>{{item.title}}</span>
					</template>
					<div v-for="(two,two_index) in item.SubClass" :key="two_index">
					
					<el-menu-item index="5-1">{{two.title}}</el-menu-item>
					
					</div>
				</el-sub-menu>
				</div>
			</el-menu>
		</div>
		<router-view />
	</div>
</template>

<script>
	import {
		Histogram,
		UserFilled,
		CreditCard,
		Bowl
	} from '@element-plus/icons-vue'
	//reactive深度劫持(深监视)，shallowReactive:浅度劫持(浅监视),ref：深度劫持（深监视),做了reactive处理，shallowRef:不做监视
	import {shallowRef,ref,onMounted} from 'vue'
	import {useRouter} from 'vue-router'
	export default {
		components: {
			Histogram,
			UserFilled,
			CreditCard,
			Bowl
		},
		setup() {
			const router=useRouter()
        const Array=[
			{
				id:'1',
				icon:Histogram,//图标组件名称
				title:"数据分析",//导航栏的项的名称
				router:'data',//组件页面的名称
				SubClass:[]//是否有二级菜单
			},
			{
				id:'2',
				icon:UserFilled,
				title:"用户列表",
				router:'userpage',
				SubClass:[]
			},
			{
				id:'3',
				icon:CreditCard,
				title:"订单管理",
				router:'order',
				SubClass:[]
			},
			{
				id:'4',
				icon:Bowl,
				title:"菜品管理",
				router:'dishes',
				SubClass:[]
			},
			{
				id:'5',
				icon:UserFilled,
				title:"员工管理",
				SubClass:[
					{
						id:"5-1",
						title:"员工详情",
						router:'role'
					},
					{
						id:"5-2",
						title:"其他页面",
						router:''
					}
				]
				
		
			}
		]
		
		const menu=shallowRef(Array)
		//实现菜单激活回调
		const ac_index=ref('1')
		//原理：将选中的项的索引存在浏览器里，当页面刷新的时候，再从浏览器里取出来，setItem存入，getItem：取出
		function Select(index){
			localStorage.setItem('menuid',JSON.stringify(index))
		}
		//生命周期钩子函数，onMounted：挂载完成
		onMounted(()=>{
			ac_index.value=JSON.parse(localStorage.getItem('menuid'))
		})
		function signOut(){
			localStorage.clear()
			router.push({name:"login"})
		}
		return {menu,Select,ac_index,signOut}
		}
	}
</script>

<style>
</style>