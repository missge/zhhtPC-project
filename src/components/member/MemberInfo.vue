<template>
	<div class="table">
		<div class="meberinfo">
			<div>
				<div class="label">详情信息</div>
				<table width="100%" border="0" cellpadding="0" cellspacing="0" class="formTable">
					<tbody>
						<tr>
							<th>头像：</th>
							<td colspan="3">
								<span v-if="tableUserlist.wxPhoto===''" class="Color3">暂无头像！</span>
								<span v-if="tableUserlist.wxPhoto!==''" class="Color3"><img class="user-img" :src="tableUserlist.wxPhoto"></span>
							</td>
						</tr>
						<tr>
							<th>昵称：</th>
							<td><label>{{tableUserlist.username}}</label></td>
							<th>手机号：</th>
							<td><label>{{tableUserlist.teleNo}}</label></td>
						</tr>
					 	<tr>		
							<th>姓名：</th>
							<td><label>{{tableUserlist.realName}}</label></td>
							<th>性别：</th>
							<td>
								<span v-if="tableUserlist.sex==='1'">男</span>
								<span v-if="tableUserlist.sex==='2'" >女</span>
								<span v-if="tableUserlist.sex==='3'" >不详</span>
							</td>	      	
					  	</tr>
					  	<tr>
					  		<th>所在地：</th>
							<td><label>{{tableUserlist.areaId}}</label></td>
							<th>生日：</th>
							<td><label>{{tableUserlist.birthday}}</label></td>
					  	</tr>
					   	<tr>
					  		<th>职业：</th>
							<td><label>{{tableUserlist.career}}</label></td>
							<th>爱好：</th>
							<td><label>{{tableUserlist.hobby}}</label></td>
					  	</tr>
					  	<tr>
					  		<th>关注时间：</th>
							<td><label>{{tableUserlist.gzTime}}</label></td>
							<th>备注：</th>
							<td><label>{{tableUserlist.notes}}</label></td>
					  	</tr>
					</tbody>
				</table>
			</div>

			<div>
				<div class="label">账户信息</div>
				<table width="100%" border="0" cellpadding="0" cellspacing="0" class="formTable">
					<tbody>
						<tr>
							<th>卡包余额：</th>
							<td>￥<label style="color:red;font-size:35px;">{{tableAccInfo.balance}}</label>元可用</td>
							<th>优惠券：</th>
							<td>{{tableAccInfo.Coupon}}张可用</td>
							<th>积分：</th>
							<td>{{tableAccInfo.AccPoint}}积分可用</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div>
				<div class="label">下单记录</div>
				<el-table :data="tableOrder"  border style="width: 100%;"  v-loading="loading">
					<el-table-column prop="orderTime" label="下单时间"></el-table-column>
					<el-table-column prop="orderId" label="订单号"></el-table-column>
					<el-table-column prop="orderAmt" label="商品金额"></el-table-column>
					<el-table-column prop="paidAmt" label="实付金额"></el-table-column>
					<el-table-column prop="status" label="订单状态"></el-table-column>
				</el-table>
				<div class="pagination-box">
					<el-pagination class="pagination"  @current-change="handleCurrentChange1" background layout="prev, pager, next , jumper"  :current-page.sync="tableParamer1.pageIndex" :total="totalCount1" >
					</el-pagination>
				</div>
			</div>

			<div>
				<div class="label">收获地址</div>
				<el-table :data="tableMem"  border style="width: 100%;"  v-loading="loading">
					<el-table-column width="100px" prop="memName" label="收货人"></el-table-column>
					<el-table-column width="150px" prop="memTele" label="手机号"></el-table-column>
					<el-table-column prop="address" label="地址"></el-table-column>
				</el-table>
			</div>

			<div>
				<div class="label">饭卡明细</div>
				<el-table :data="tableMerList"  border style="width: 100%;"  v-loading="loading">
					<el-table-column prop="typeDesc" label="交易类型"></el-table-column>
					<el-table-column prop="money" label="交易金额"></el-table-column>
					<el-table-column prop="merName" label="交易地点"></el-table-column>
					<el-table-column prop="date" label="交易时间"></el-table-column>
				</el-table>
				<div class="pagination-box">
					<el-pagination class="pagination"  @current-change="handleCurrentChange2" background layout="prev, pager, next , jumper"  :current-page.sync="tableParamer2.pageIndex" :total="totalCount2" >
					</el-pagination>
				</div>
			</div>
		</div>	
	</div>
</template>
<script>
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	import {membersDetailPost,memMealCardDetail} from '../../api/api.js'
	export default{
		data(){
			return{
				totalCount1:1,
				totalCount2:1,
				loading: true,
				tableParamer1:{
					memId:this.$route.query.memId,
					pageIndex:1
				},
				tableParamer2:{
					memId:this.$route.query.memId,
					pageIndex:1
				},
				tableUserlist:{
					"memId": "",
		            "userName": "",
		            "wxPhoto": "",
		            "memRealName": "",
		            "sex": "",
		            "areaId": "",
		            "birthday": "",
		            "career": "",
		            "hobby": "",
		            "notes": "",
		            "birthday": "",
		            "teleNo": "",
		            "companyName": "",
		            "status": "",
		            "gzTime": ""
				},
				tableAccInfo:{
					"balance": "",
		            "Coupon": "",
		            "AccPoint": ""
				},
				tableOrder:[],
				tableMem:[],
				tableMerList:[]
			}
		},
		methods:{
			//点击哪页触发的时间
			handleCurrentChange1(val) {
				this.tableParamer1.pageIndex=val
				this.getTablelist1(this.tableParamer1)
	        },
	        handleCurrentChange2(val) {
				this.tableParamer2.pageIndex=val
				this.getTablelist2(this.tableParamer2)
	        },
			getTablelist1(paramer){
				membersDetailPost(paramer).then((data) => {
					if(data.code === 1){
						this.tableUserlist=data.data[0]
						this.tableAccInfo=data.accInfo[0]
						this.tableOrder=data.OrderRecord
						this.tableMem=data.shippingAddr
						this.totalCount1=data.pageInfo.totalCount
					}else{
						this.totalCount1 = 1;
					}
					
					this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					this.loading=false
				})
			},
			getTablelist2(paramer){
				memMealCardDetail(paramer).then((data) => {
					if(data.code === 1){
						this.tableMerList=data.data
						this.totalCount2=data.pageInfo.totalCount
					}else{
						this.totalCount2 = 1;
					}
					this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					this.loading=false
				})
			}
		},
		mounted(){
			this.getTablelist1(this.tableParamer1);
			this.getTablelist2(this.tableParamer2);
		}
	}
</script>
<style>
	.meberinfo{
		background: #fff;
		padding: 24px;
	}	

	.meberinfo .user-img{
		width: 32px;
		margin:2px;
	}

	.meberinfo .label{
		font-size: 18px;
    	font-weight: bold;
    	font-family: "Microsoft YaHei";
    	background: #409EFF;
    	color: #fff;
    	text-align: left;
    	padding-left: 24px;
    	margin:0 -24px;
	}

	.meberinfo .el-table{
		margin: 20px auto;
	}
	.meberinfo .formTable {
		margin: 20px auto;
	    border-collapse: collapse;
	    border: #ebeef5 solid 1px;
	}

	.meberinfo .formTable th {
	    background: #f7f7f7;
	    border: #ebeef5 solid 1px;
	    height: 36px;
	    color: #909399;
	    font-weight: normal;
	    font-size: 14px;
	    vertical-align: middle;
	}

	.meberinfo .formTable td {
	    border: #ebeef5 solid 1px;
	    height: 36px;
	    padding: 0px 8px;
	    font-size: 14px;
	    vertical-align: middle;
	    text-align: left;
	}

	.meberinfo .pagination-box{
		margin-bottom: 20px;
		text-align: right;
	}

	.meberinfo .pagination-box .pagination{
		float: none;
	}

	
</style>