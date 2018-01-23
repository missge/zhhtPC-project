<template>
	<div>
	   <el-form :inline="true" :model="tableList" class="demo-form-inline query-form ">
           <el-form-item label="流水号">
                <el-input v-model="tableList.orderId" placeholder="订单号"></el-input>
           </el-form-item>
         	<el-form-item label="下单时间">
	         	<el-date-picker
			      v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
			    </el-date-picker>
			</el-form-item>  
		<!-- 	<el-date-picker
		      v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerBeginDateAfter">
		    </el-date-picker> -->
		    </el-date-picker>
		   <el-form-item label="收货人">
                <el-input v-model="tableList.memName" placeholder="收货人"></el-input>
           </el-form-item>
             <el-form-item label="商品">
                <el-input v-model="tableList.goodsName" placeholder="商品"></el-input>
           </el-form-item>
          	<div class="query_button">
          		<el-form-item>
                    <el-button type="primary" @click="getSarch(tableList.orderId,time,tableList.memName,tableList.goodsName)" >查询</el-button>
                    <el-button @click="setReset" >重置</el-button>
               </el-form-item>
          	</div>
        </el-form>
        <div class="table"> 
            <el-table :data="tableDatas"  border style="width: 100%"  v-loading="loading">
			    <el-table-column   prop="orderId" label="订单号" >  </el-table-column>
			    <el-table-column   prop="unitMerPrice" label="单价/数量">  </el-table-column>
			    <el-table-column   prop="memName" label="收货人">  </el-table-column>
			    <el-table-column   prop="price" label="总金额"></el-table-column>
			    <el-table-column   prop="mallSettAmt"  label="商家结算金额">  </el-table-column>
			    <el-table-column   prop="merOrMallId" label="商城号"></el-table-column>
			    <el-table-column   prop="goodsName"   label="商品名">   </el-table-column>
			    <el-table-column   prop="attrvalStr" label="商品属性值">  </el-table-column>
			    <el-table-column   prop="orderTime" label="下单时间"> </el-table-column>
			    <el-table-column   prop="payTime"  label="完成时间">  </el-table-column>
			  </el-table>
			  <el-pagination class="pagination "  @current-change="handleCurrentChange" background layout="prev, pager, next , jumper"  :current-page.sync="tableList.pageIndex" :total="totalCount" >
			  </el-pagination>
        </div>
	</div>
</template>
<script >
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	export default{
		name: 'PlatformBill',
		data () {
			return {
		        tableList:{
		        	mallId:this.$store.state.mallId,
		        	pageIndex:1,
		        	orderId:'',
		        	memName:'',
		        	goodsName:'',
		        	startTime:'',
		        	endTime:''
		        },
		        tableDatas:[],//列表的值
		        totalCount:0,//页数
		        time:'',
		        loading: true
			}
		},
		methods:{
			//获取table列表
			getTablelist(){
				var url = this.$store.state.localHostUrl +'/orderBillInfo.json'
		    	var data= qs.stringify(this.tableList)
		    	let that= this
				that.$http.post(url,data,{emulateJSON:true}).then(
					function(res){
						if(res.data.code===1){
							that.tableDatas=res.data.data
							that.totalCount=res.data.pageInfo.totalCount
							that.loading=false
						}else{
							that.$message.error("请求失败，请联系客服，失败码"+res.data.descript);
							that.loading=false
						}
					}
				)
			},
			//点击哪页触发的时间
			handleCurrentChange(val) {
				this.tableList.pageIndex=val
				this.getTablelist()
				console.log(this.tableList.pageIndex);
	   			// console.log(`当前页: ${val}`);
	        },
			//搜索事件
			getSarch(orderId,time,memName,goodsName){
				//开始时间，结束时间
				this.tableList.startTime=time[0]
				this.tableList.endTime=time[1]
				this.tableList.orderId=orderId
				this.tableList.memName=memName
				this.tableList.goodsName=goodsName
				this.getTablelist()
			},
			//小于当前日期，则不允许点击
			 pickerBeginDateAfter:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            //重置
            setReset(){
            	this.tableList.startTime=''
				this.tableList.endTime=''
				this.tableList.orderId=''
				this.tableList.memName=''
				this.tableList.goodsName=''
				this.time=''
            }
		},
		mounted(){
			//获取数据项
			this.getTablelist();
		}
	}
</script>
