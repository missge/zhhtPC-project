<template>
	<div>
		<el-form :inline="true" :model="tableList" class="demo-form-inline query-form">
			<el-form-item label="操作人:">
				<el-input v-model="tableList.operId" placeholder=""></el-input>
			</el-form-item>
		    <el-form-item label="关联内容:">
				<el-input v-model="tableList.relecontents" placeholder=""></el-input>
			</el-form-item>
	     	<div class="query_button">
	      		<el-form-item>
	                <el-button type="primary" @click="getSarch(tableList.operId,tableList.relecontents)" >查询</el-button>
	           </el-form-item>
                 <el-button @click="setReset" >重置</el-button>

	      	</div>
		</el-form>
		<div class="table"> 
	            <el-table :data="tableDatas"  border style="width: 100%;"  v-loading="loading">
				    <el-table-column   prop="moduleName" label="操作模块">  </el-table-column>
				    <el-table-column   prop="operType" label="操作类型">  </el-table-column>
				    <el-table-column   prop="relecontents" label="关联内容">  </el-table-column>
				    <el-table-column   prop="operId" label="操作人">  </el-table-column>
				    <el-table-column   prop="operTime" label="操作时间">  </el-table-column>

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
	import {FunctionLog} from '../../api/api.js'
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
					operId:'',
					relecontents:'',
					pageIndex:1
				},
				tableDatas:[],//列表的值
			}
		},
		methods:{
			//搜索接口
			getSarch(operId,relecontents){
				this.tableList.operId=operId
				this.tableList.relecontents=relecontents
				this.getTablelist()
			},
			//点击哪页触发的时间
			handleCurrentChange(val) {
				this.tableList.pageIndex=val
				this.getTablelist()
				console.log("功能日志"+this.tableList);
	   			// console.log(`当前页: ${val}`);
	        },
			getTablelist(){
				FunctionLog(this.tableList).then((data) => {
					this.tableDatas=data.data
					this.totalCount=data.pageInfo.totalCount
					 this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					 this.loading=false
				})
			},
			setReset(){
				this.tableList.operId=''
				this.tableList.relecontents=''
			}
		},
		mounted(){
			this.getTablelist();
		}
	}
</script>