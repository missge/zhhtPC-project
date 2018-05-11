<template>
	<div>
		<div class="table"> 
			<div class="area_table">
				<div class="container">
					<el-button type="success" size="mini" @click="changeFn(tableList.id,'add')">添加</el-button>	
				</div>
	            <el-table :data="tableDatas"  border style="width: 100%;"  v-loading="loading">
				    <el-table-column width="180"  prop="tempName" label="模板名称">  </el-table-column>
				    <el-table-column  prop="operations" label="地	区">
				    	<template slot-scope="scope">
					        <span size="medium" v-html="scope.row.operations">{{scope.row.operations}}</span>  
				      	</template>
        			</el-table-column>
		            <el-table-column width="180" label="相关操作" >
		          		<template slot-scope="scope" >
	           				<el-button size="small" @click="changeFn(scope.row.id,'change')">修改</el-button>
	           				<el-button  size="small"  type="danger" @click="deleteFn(scope.row.id)">删除</el-button>
	           			</template>
		       		</el-table-column>
				</el-table>
				<el-pagination class="pagination"  @current-change="handleCurrentChange" background layout="prev, pager, next , jumper"  :current-page.sync="tableList.pageIndex" :total="totalCount" >
			</el-pagination>
			</div>
		</div>
		
	</div>
</template>
<script>
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	import {delAreaTempList,getAreaTempList} from '../../api/api.js'
	export default{
		data(){
			return{
				totalCount:1,
				loading: true,
				tableList:{
					pageIndex:1
				},
				tableDatas:[],//列表的值
			}
		},
		methods:{
			//点击哪页触发的时间
			handleCurrentChange(val) {
				this.tableList.pageIndex=val
				this.getTablelist()
				console.log(this.tableList.pageIndex);
	        },
			getTablelist(){
				getAreaTempList(this.tableList).then((data) => {
					console.log(data.data)
					this.tableDatas=data.data
					this.totalCount=data.pageInfo.totalCount
					 this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					 this.loading=false
				})
			},
			changeFn(id,AddOrChange){
				if(AddOrChange=='change'){
					this.$router.push({path:'/AreaManage',query:{id:id,AddOrChange:'change'}})
				}else{
					this.$router.push({path:'/AreaManage',query:{AddOrChange:'add'}})

				}

			},
			deleteFn(id){
				 this.$confirm('确定删除该模板?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
		        }).then(() => {
					delAreaTempList({id:id}).then(data =>{
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
				
			}
		},
		mounted(){
			this.getTablelist();
		}
	}
</script>
<style>
	.container{
		padding-bottom: 15px;
		text-align: right;
	}

	.area_table{
		padding: 20px;
		padding-bottom: 0;
	}
</style>