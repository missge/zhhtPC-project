<template>
	<div class="">
		<div class="table"> 
		<div class="customer_table">
			<div class="customer-container">
				<el-row style="margin-bottom:15px">
					<el-button type="success" size="mini" @click="changeFn('','add')">添加客户</el-button>
				</el-row>
				<el-row>
					<el-form :inline="true" :model="form" class="demo-form-inline" >
					  <el-form-item label="登录名/客户名称/店铺名称" >
					    <el-input size="mini" style="width:240px" v-model="form.username" placeholder="请输入登录名/客户名称/店铺名称"></el-input>
					  </el-form-item>
					  <el-form-item label="客户类型" >
					    <el-select  size="mini" style="width:120px" v-model="form.type" placeholder="请选择状态">
						    <el-option
						      v-for="item in khtype"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
					  </el-form-item>

					   <el-form-item label="客户状态" >
					    <el-select  size="mini" style="width:120px" v-model="form.status" placeholder="请选择状态">
						    <el-option
						      v-for="item in khstatus"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
					  </el-form-item>
					 
					  <el-form-item>
					    <el-button size="mini" type="primary" @click="">查询</el-button>
					    <el-button size="mini" @click="">重置</el-button>
					  </el-form-item>
					</el-form>
				</el-row>
			</div>
	        <el-table  :data="tableDatas"  border style="width: 100%;"  v-loading="loading">
				<el-table-column type="index" width="50" label="序号"></el-table-column>
				<el-table-column width="250px" prop="code" label="客户名称"></el-table-column>
				<el-table-column  prop="name" label="店铺名称"></el-table-column>
				<el-table-column  prop="organId" label="登录名"></el-table-column>
				<el-table-column  prop="genre" label="类型"></el-table-column>
				<el-table-column  prop="status" label="状态"></el-table-column>
				<el-table-column width="180px" prop="memo" label="创建时间"></el-table-column>
		        <el-table-column width="180px" label="相关操作" >
			        <template slot-scope="scope" >
		           	<el-button size="small" @click="changeFn(scope.row.id,'change')">编辑</el-button>
		           	<el-button size="small" type="danger" @click="removeFn(scope.row.id)">解约</el-button>
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
	import {findMerchPost} from '../../api/api.js'
	export default{
		data(){
			return{
				totalCount:1,
				loading: true,
				tableList:{
					pageIndex:1
				},
				tableDatas:[],//列表的值
			
				form:{
					username:'',
					type:'',
					status:''
				},
				khstatus: [{
		          value: 'all',
		          label: '--全部--'
		        }, {
		          value: 'option01',
		          label: '合作中'
		        }, {
		          value: 'option02',
		          label: '已到期'
		        }, {
		          value: 'option03',
		          label: '已解约'
		        }],
		        khtype: [{
		          value: 'all',
		          label: '--全部--'
		        }, {
		          value: 'option01',
		          label: '供应商'
		        }, {
		          value: 'option02',
		          label: '餐厅'
		        },{
		          value: 'option03',
		          label: '商城'
		        }],
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
				findMerchPost(this.tableList).then((data) => {
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
					this.$router.push({path:'/CustomerManage',query:{id:id,AddOrChange:'change'}})
				}else{
					this.$router.push({path:'/CustomerManage',query:{AddOrChange:'add'}})
				}
			},
		    removeFn(id){

		    }
		},
		mounted(){
			this.getTablelist();
		}
	}
</script>
<style>
.customer-container{
	text-align: left;
	/*padding-bottom: 15px;*/
}

.customer_table{
		padding: 20px;
		padding-bottom: 0;
}

</style>