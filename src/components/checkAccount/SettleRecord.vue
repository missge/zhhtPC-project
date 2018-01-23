<template>
	<div>
	   <el-form :inline="true" :model="tableList" class="demo-form-inline query-form ">
               <el-form-item label="流水号">
                    <el-input v-model="tableList.settId" placeholder="订单号"></el-input>
               </el-form-item>
               <el-form-item label="申请时间">
		         	<el-date-picker
				      v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
				    </el-date-picker>
				</el-form-item>  
			    <el-form-item label="状态">
				     <el-select v-model="tableList.status" placeholder="请选择" >
					    <el-option
					      v-for="item in statusOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value" >
					    </el-option>
					</el-select>
			    </el-form-item>
              	<div class="query_button">
              		<el-form-item>
	                    <el-button type="primary" @click="getSarch(tableList.settId,time,tableList.status)">查询</el-button>
	                    <el-button  @click="setReset">重置</el-button>
	               </el-form-item>
              	</div>
        </el-form>
        <div class="table"> 
            <el-table
			    :data="tableDatas"  border style="width: 100%" v-loading="loading">
			    <el-table-column prop="invoiceNum" label="发票号"></el-table-column>
			    <el-table-column  prop="status" label="状态" >  </el-table-column>
			    <el-table-column   prop="ordersQty" label="订单数">  </el-table-column>
			     <el-table-column prop="settId"   label="流水号">   </el-table-column>
			     <el-table-column  prop="settAmt" label="结算额"> </el-table-column>
			     <el-table-column  prop="applyTime"  label="申请时间">   </el-table-column>
			     <el-table-column label="操作" width="100">
	                <template slot-scope="scope">
	                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">结算详情</el-button>
	                    <!-- <el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
	                </template>
	            </el-table-column>
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
		name: 'HelloWorld',
		data () {
			return {
				tableList:{
		        	mallId:this.$store.state.mallId,
		        	pageIndex:1,
		        	settId:'',
		        	status:'',
		        	startTime:'',
		        	endTime:''
		        },
		        tableDatas:[],//列表的值
		        totalCount:0,//页数
		        time:'',
		        loading: true,



				formInline: {
					user: '',
					region: '',
					name:''
				},
				value7: '',
				test:1,
				statusOptions: [{
		          value: '1',
		          label: '发票待确认'
		        }, {
		          value: '付款待确认',
		          label: '付款待确认'
		        }, {
		          value: '待付款',
		          label: '待付款'
		        }, {
		          value: '已核销',
		          label: '已核销'
		        }, {
		          value: '已撤销',
		          label: '已撤销'
		        }, {
		          value: '已驳回',
		          label: '已驳回'
		        }],
		        value: '',
		        tableData: [{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        }],
		        currentPage3: 5

			}
		},
		methods:{
			//获取table列表
			getTablelist(){
				var url = this.$store.state.localHostUrl +'/mallSettInfo.json'
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
			getSarch(settId,time,status){
				//开始时间，结束时间
				this.tableList.startTime=time[0]
				this.tableList.endTime=time[1]
				this.tableList.settId=settId
				this.tableList.status=status
				this.getTablelist()
			},
			//重置
            setReset(){
            	this.tableList.startTime=''
				this.tableList.endTime=''
				this.tableList.settId=''
				this.tableList.status=''
            },
            handleEdit(index, row){
            	//获取settId的值row.settId
            	 console.log(row.settId);
            	 this.$router.push({path:'/SettleRecordDetail',query:{settId:row.settId}})
            }
		},
		mounted(){
			this.getTablelist()
		}
	}
</script>
<style>

</style>