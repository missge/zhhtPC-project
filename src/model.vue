<template>
	<div>
		<el-form :inline="true" :model="tableList" class="demo-form-inline query-form">
			<el-form-item label="角色名称:">
				<el-input v-model="rolename" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="状态">
			     <el-select v-model="oldStatus" placeholder="请选择"   >
				    <el-option
				      v-for="item in selectList"
				      :key="item.key"
				      :label="item.label"
				      :value="item.value" >
				    </el-option>
				</el-select>
		    </el-form-item>
	     	<div class="query_button">
	      		<el-form-item>
	                <el-button type="primary" @click="getSarch()" >查询</el-button>
	                 <el-button type="info" plain >添加</el-button>
	           </el-form-item>
	      	</div>
		</el-form>
     	<el-row class="container">
			<el-col :span='24' >
				<el-row class="all-classify" >
					<el-col :span='4' >
							<span class="">订单数: <span class="RedColor">1</span>条</span>
					</el-col>
					<el-col :span='4' >
							<span class="">销售总额: <span class="RedColor">2</span>元</span>
					</el-col>
						<el-col :span='4' >
							<span class="">退款: <span class="RedColor">3</span>元</span>
					</el-col>
						<el-col :span='4' >
							<span class="">有效销售: <span class="RedColor">5</span>元</span>
					</el-col>
						<el-col :span='4' >
							<span class="">应结总额: <span class="RedColor">2</span>元</span>
					</el-col>
						<el-col :span='4' >
							<span class="">收益率: <span >2</span>%</span>
					</el-col>
					
				</el-row>
			</el-col>
		</el-row>
		<div class="table"> 
            <el-table :data="tableDatas"  border style="width: 100%;"  v-loading="loading">
			    <el-table-column   prop="code"   label="角色编号">   </el-table-column>
			    <el-table-column   prop="name" label="角色名称">  </el-table-column>
			    <el-table-column   prop="organId" label="所属机构">  </el-table-column>
			    <el-table-column   prop="status" label="状态">  </el-table-column>
	            <el-table-column label="相关操作" width="100">
	          		<template slot-scope="scope">
           				<el-button size="small" @click="GetClickMessage(scope.row.orderId)">查看</el-button>
           				<!-- <el-button size="small" @click="GetClickMessage()">查看</el-button> -->
           			</template>
	       		</el-table-column>
			</el-table>
		</div>
		<el-pagination class="pagination"  @current-change="handleCurrentChange" background layout="prev, pager, next , jumper"  :current-page.sync="tableList.pageIndex" :total="totalCount" >
		</el-pagination>
	</div>
</template>
<script>
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	export default{
		data(){
			return{
				rolename:"",
				oldStatus:'',
				selectList:'',
				// tableDatas:{
				// 	code:'',
				// 	name:'',
				// 	organId:'',
				// 	status:''
				// },
				tableList:{
					pageIndex:1
				},
				totalCount:1,
				loading: true,
			}
		},
		methods:{
			getSarch(){

			},
			handleCurrentChange(){

			}
		}
	}
</script>