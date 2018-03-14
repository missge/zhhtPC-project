<template>
	<div>
		<el-form :inline="true" :model="tableList" class="demo-form-inline query-form">
			<el-form-item label="操作人:">
				<el-input v-model="tableList.userName" placeholder=""></el-input>
			</el-form-item>
	     	<div class="query_button">
	      		<el-form-item>
	                <el-button type="primary" @click="getSarch(tableList.userName)" >查询</el-button>
	           </el-form-item>
	            <el-button @click="setReset" >重置</el-button>
	      	</div>
		</el-form>
		<div class="table"> 
	            <el-table :data="tableDatas"  border style="width: 100%;"  v-loading="loading">
				    <el-table-column   prop="operId" label="操作人">  </el-table-column>
				    <el-table-column   prop="moduleName" label="操作模块">  </el-table-column>
				    <el-table-column   prop="operTime" label="操作时间">  </el-table-column>
				    <el-table-column   prop="loginIP" label="IP">  </el-table-column>
		            <el-table-column label="相关操作" >
		          		<template slot-scope="scope" >
	           				<el-button  size="small"  type="danger" @click="deleteFn(scope.row.id)">删除</el-button>
	           			</template>
		       		</el-table-column>
				</el-table>
				<el-pagination class="pagination"  @current-change="handleCurrentChange" background layout="prev, pager, next , jumper"  :current-page.sync="tableList.pageIndex" :total="totalCount" >
			</el-pagination>
		</div>
		
	</div>
</template>
<script>
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	import {OperationLog,OperationLogDelete} from '../../api/api.js'
	export default{
		data(){
			return{
				oldStatus:'',
				selectList:[
					{value: "全部", key: 0}, 
					{value: "启用", key: 1}, 
					{value: "禁用", key: 2},
					{value: "删除", key: 3}
		        ],
				totalCount:1,
				loading: true,
				tableList:{
					userName:'',
					pageIndex:1
				},
				tableDatas:[],//列表的值
			}
		},
		methods:{
			//搜索接口
			getSarch(userName){
				this.tableList.userName=userName
				this.getTablelist()
			},
			//点击哪页触发的时间
			handleCurrentChange(val) {
				this.tableList.pageIndex=val
				this.getTablelist()
				console.log("操作日志"+this.tableList);
	   			// console.log(`当前页: ${val}`);
	        },
			getTablelist(){
				OperationLog(this.tableList).then((data) => {
					this.tableDatas=data.data
					this.totalCount=data.pageInfo.totalCount
					 this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					 this.loading=false
				})
			},
			deleteFn(id){
				this.$confirm('确定删除该用户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
		        }).then(() => {
					OperationLogDelete({id:id}).then(data =>{
						this.getTablelist()
						 this.$message({
				            type: 'info',
				            message: '删除成功'
				        });   
					}).catch(message => {
						this.$message.error("请求失败，请联系客服，失败码"+message);
					    this.loading=false
					})
		        }).catch(() => {
			        this.$message({
			            type: 'info',
			            message: '取消删除'
			        });          
		        });
			},
			setReset(){
				this.tableList.userName=''
			}
		},
		mounted(){
			this.getTablelist();
		}
	}
</script>