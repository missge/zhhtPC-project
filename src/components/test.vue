<template>
	<div class="test">
		测试
		{{datalist}}
	</div>
</template>
<script>
import { getOrderBillInfo } from "../api/api";
	export default{
		data(){
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
		        datalist:''
			}			
		},
		methods:{
			test(){
				 getOrderBillInfo(this.tableList).then((data) => {
				 	console.log(data)
				 	// this.datalist=data;
	            }).catch(message => {
	                this.$message.error(message);
	            });
			}
		},
		mounted(){
			this.test();
		}
	}
</script>