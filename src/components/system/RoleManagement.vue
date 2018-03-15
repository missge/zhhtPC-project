<template>
	<div>
		<el-form :inline="true" :model="tableList" class="demo-form-inline query-form">
			<el-form-item label="角色名称:">
				<el-input v-model="tableList.realName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="状态">
			     <el-select v-model="oldStatus" placeholder="请选择" >
				    <el-option
				      v-for="item in selectList"
				      :key="item.key"
				      :label="item.label"
				      :value="item.value" >
				    </el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="姓名:">
				<el-input v-model="tableList.userName" placeholder=""></el-input>
			</el-form-item>
	     	<div class="query_button">
	      		<el-form-item>
	                <el-button type="primary" @click="getSarch(tableList.realName,oldStatus,tableList.userName)" >查询</el-button>
	           </el-form-item>
	      	</div>
		</el-form>
		<div class="table"> 
	            <el-table :data="tableDatas"  border style="width: 100%;"  v-loading="loading">
				    <el-table-column   prop="code" label="角色编号">  </el-table-column>
				    <el-table-column   prop="name" label="角色名称">  </el-table-column>
				    <el-table-column   prop="organId" label="所属机构">  </el-table-column>
				    <el-table-column   prop="status" label="状态">  </el-table-column>
		            <el-table-column label="相关操作" >
		          		<template slot-scope="scope" >
	           				<el-button size="small" @click="changeFn(scope.row.id)">修改</el-button>
	           				<el-button  size="small"  type="danger" @click="deleteFn(scope.row.userName)">删除</el-button>
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
	import {getRoleUserPost,UserPostDelete,UserPostInit} from '../../api/api.js'
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
					realName:'',
					userName:'',
					status:'',
					pageIndex:1
				},
				tableDatas:[],//列表的值
			}
		},
		methods:{
			//搜索接口
			getSarch(realName,status,userName){
				let key='';
				this.selectList.forEach(function(items){
					if(items.value == status){
						key=items.key
					}
				})
				this.tableList.realName=realName
				this.tableList.userName=userName
				this.tableList.status=key
				this.getTablelist()
			},
			//点击哪页触发的时间
			handleCurrentChange(val) {
				this.tableList.pageIndex=val
				this.getTablelist()
				console.log(this.tableList.pageIndex);
	   			// console.log(`当前页: ${val}`);
	        },
			getTablelist(){
				getRoleUserPost(this.tableList).then((data) => {
					this.tableDatas=data.data
					this.totalCount=data.pageInfo.totalCount
					 this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					 this.loading=false
				})
			},
			changeFn(id){
				this.$router.push({path:'/RoleManaChange',query:{id:id}})
			},
			deleteFn(userName){
				 this.$confirm('确定删除该用户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
		        }).then(() => {
					UserPostDelete({userName:userName}).then(data =>{
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
			initFn(userName){
				this.$confirm('确定初始化密码?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
		        }).then(() => {
					UserPostInit({userName:userName}).then(data =>{
						console.log(data)
						this.getTablelist()
						 this.$message({
				            type: 'info',
				            message: data.data
				        });   
					}).catch(message => {
						this.$message.error("请求失败，请联系客服，失败码"+message);
					    this.loading=false
					})
		        }).catch(() => {
			        this.$message({
			            type: 'info',
			            message: '取消初始化'
			        });          
		        });
				
			}
		},
		mounted(){
			this.getTablelist();
		}
	}
</script>