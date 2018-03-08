<template>
	<div>
		<el-row class="container">
			<el-col :span='24' >
				<el-row class="all-classify">
					<el-col :span='22' >
							<span class="">结算金额总计: <span class="RedColor">{{settAmt}}</span>元</span>
					</el-col>
					<el-col :span='2'>
						 <el-button type="info" size="mini" @click="importFn(tableList.settId,tableList.pageIndex)">导出</el-button>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<div class="table"> 
			<el-table
			:data="tableDatas"  border style="width: 100%" v-loading="loading">
			<el-table-column prop="orderId" label="订单号"></el-table-column>
			<el-table-column  prop="goodsName" label="商品" >  </el-table-column>
			<el-table-column   prop="unitPrice" label="售价">  </el-table-column>
			 <el-table-column prop="qty"   label="数量">   </el-table-column>
			 <el-table-column  prop="memName" label="买家"> </el-table-column>
			 <el-table-column  prop="price"  label="小计">   </el-table-column>
			  <el-table-column prop="mallSettAmt"   label="商城结算金额">   </el-table-column>
			 <el-table-column  prop="orderTime" label="下单时间"> </el-table-column>
			 <el-table-column  prop="payTime"  label="支付时间">   </el-table-column>
			 
			</el-table>
			<el-pagination class="pagination "  @current-change="handleCurrentChange" background layout="prev, pager, next , jumper"  :current-page.sync="tableList.pageIndex" :total="totalCount" >
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	import { getSettleManage,localHostUrl } from "../../api/api";
	export default{
		data(){
			return{
				tableList:{
		        	settId:this.$route.query.settId,
		        	pageIndex:1
		        },
				tableDatas:[],//列表的值
		        totalCount:0,//页数
		        loading: true,
		        settAmt:''//结算金额

			}
		},
		methods:{
			getTablelist(){
				console.log(this.tableList.settId)
				getSettleManage(this.tableList).then((data) => {
					this.tableDatas=data.data
                    this.loading=false
                    console.log(data)
                    this.totalCount=data.pageInfo.totalCount
                    this.settAmt=data.settAmt
				}).catch(message => {
                    this.$message.error("请求失败，请联系客服，失败码"+message);
                    this.loading=false
                })

			},
			handleCurrentChange(val) {
				this.tableList.pageIndex=val
				this.getTablelist()
	        },
	        importFn(settId,pageIndex){
				var url = `${localHostUrl}exportBillBySettId.json?settId=${settId}`
				window.location.href=url
	        }
		},
		mounted(){
			this.getTablelist();
		}
	}
</script>
