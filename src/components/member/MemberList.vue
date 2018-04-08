<template>
	<div>
		<div class="table"> 
				<el-row class="container">
					<el-col :span='24' >
						<el-row class="all-classify">
							<el-col :span='24'>
								 <el-button type="success" size="mini" @click="ImportFn()">批量导入会员</el-button>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
	            <el-table :data="tableDatas"  border style="width: 100%;"  v-loading="loading">
				    <el-table-column  prop="userName" label="用户名"></el-table-column>
				    <el-table-column  prop="availableAmt" label="积分"></el-table-column>
				    <el-table-column  prop="sex" label="性别"></el-table-column>
				    <el-table-column  prop="teleNo" label="电话"></el-table-column>
				    <el-table-column  prop="companyName" label="所属企业"></el-table-column>
				    <el-table-column  prop="status" label="状态"></el-table-column>
				    <el-table-column  prop="gzTime" label="关注时间"></el-table-column>
		            <el-table-column label="相关操作" >
		          		<template slot-scope="scope" >
	           				<el-button size="small" @click="memerInfo(scope.row.memId)">详情</el-button>
	           				<el-button size="small" type="danger" @click="settingFn(scope.row.memId)">设为餐厅</el-button>
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
	import {findMembersPost} from '../../api/api.js'
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
				findMembersPost(this.tableList).then((data) => {
					console.log(data.data)
					this.tableDatas=data.data
					this.totalCount=data.pageInfo.totalCount
					 this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					 this.loading=false
				})
			},
			ImportFn(){
				this.$router.push({path:'/ImportMember'})
			},
			memerInfo(){

			},
			settingFn(){

			}
		},
		mounted(){
			this.getTablelist();
		}
	}
</script>