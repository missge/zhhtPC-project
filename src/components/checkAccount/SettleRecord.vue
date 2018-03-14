<template>
	<div>
	   <el-form :inline="true" :model="tableList" class="demo-form-inline query-form ">
               <el-form-item label="流水号">
                    <el-input v-model="tableList.settId" placeholder="流水号"></el-input>
               </el-form-item>
               <!-- <el-form-item label="申请时间"> -->
		         	<!-- <el-date-picker
				      v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
				    </el-date-picker> -->
			    <span class="demonstration">申请时间</span>
			    <el-date-picker
			      v-model="tableList.startTime"
			      type="datetime"
			      placeholder="选择开始时间"  value-format="yyyy-MM-dd HH:mm:ss">
			    </el-date-picker>
			    <span class="demonstration">--</span>
			    <el-date-picker
			      v-model="tableList.endTime"
			      type="datetime"
			      placeholder="选择结束时间"  value-format="yyyy-MM-dd HH:mm:ss">
			    </el-date-picker>
			    <el-form-item label="状态">
				     <el-select v-model="oldStatus" placeholder="请选择"   >
					    <el-option
					      v-for="item in selectList"
					      :key="item.key"
					      :label="item.label"
					      :value="item.value" >
					    </el-option>
					</el-select>
			    </el-form-item>
              	<div class="query_button">
              		<el-form-item>
	                    <el-button type="primary" @click="getSarch(tableList.settId,tableList.startTime,tableList.endTime,oldStatus)">查询</el-button>
	                    <el-button  @click="setReset">重置</el-button>
	               </el-form-item>
              	</div>
        </el-form>
        <div class="table"> 
            <el-table
			    :data="tableDatas"  border style="width: 100%" v-loading="loading">
			     <el-table-column prop="settId"   label="流水号">   </el-table-column>
			     <el-table-column  prop="settAmt" label="结算总额"> </el-table-column>
			    <el-table-column   prop="ordersQty" label="订单数">  </el-table-column>
			    <el-table-column prop="invoiceNum" label="发票编号"></el-table-column>
			    <el-table-column  prop="status" label="状态" >  </el-table-column>
			     <el-table-column  prop="applyTime"  label="申请时间">   </el-table-column>
			     <el-table-column label="操作" width="100">
	                <template slot-scope="scope">
	                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">结算详情</el-button>
	                    <!-- <el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
	                </template>
	            </el-table-column>
			  </el-table>
			  <el-pagination class="pagination"  @current-change="handleCurrentChange" background layout="prev, pager, next,jumper"  :current-page.sync="tableList.pageIndex" :total="totalCount">
			  </el-pagination>
        </div>
	</div>
</template>
<script >
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	import { getSelectList,getMallSettInfo} from "../../api/api";
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
		        type:'settStatus',
		        selectList:'',

				formInline: {
					user: '',
					region: '',
					name:''
				},
				oldStatus:''

			}
		},
		methods:{
			//获取table列表
			getTablelist(){
				// var url = this.$store.state.localHostUrl +'/mallSettInfo.json'
		  //   	let that= this
				// that.$http.post(url,data,{emulateJSON:true}).then(
				// 	function(res){
				// 		if(res.data.code===1){
				// 			that.tableDatas=res.data.data
				// 			that.totalCount=res.data.pageInfo.totalCount
				// 			that.loading=false
				// 		}else{
				// 			that.$message.error("请求失败，请联系客服，失败码"+res.data.descript);
				// 			that.loading=false
				// 		}
				// 	}
				// )
		    	// var data= qs.stringify(this.tableList)
				getMallSettInfo(this.tableList).then(data => {
					this.tableDatas=data.data
					this.totalCount=data.pageInfo.totalCount
					this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
				    this.loading=false
				});
			},
			//点击哪页触发的时间
			handleCurrentChange(val) {
				this.tableList.pageIndex=val
				this.getTablelist()
				console.log(this.tableList.pageIndex);
	   			// console.log(`当前页: ${val}`);
	        },
	        //搜索事件
			getSarch(settId,startTime,endTime,status){
				console.log(status);
				let key='';
				this.selectList.forEach(function(items){
					if(items.value == status){
						key=items.key
					}
				})

				//开始时间，结束时间
				// this.tableList.startTime=time[0]
				// this.tableList.endTime=time[1]
				this.tableList.settId=settId
				this.tableList.status=key
				this.getTablelist()
			},
			//重置
            setReset(){
            	this.tableList.startTime=''
				this.tableList.endTime=''
				this.tableList.settId=''
				this.oldStatus=''
            },
            handleEdit(index, row){
            	//获取settId的值row.settId
            	 console.log(row.settId);
            	 this.$router.push({path:'/SettleRecordDetail',query:{settId:row.settId}})
            },
            getSelectList(){
            	getSelectList({type:this.type}).then((data) => {
            		this.selectList=data.data
					console.log(data)
					this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
				    this.loading=false
				});
            },
           
		},
		mounted(){
			this.getTablelist();
			this.getSelectList()
		}
	}
</script>
