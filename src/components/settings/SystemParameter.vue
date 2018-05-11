<template>
	<div>
		<div class="systemFormFile">
			<div style="margin-bottom:15px"><span>参数设置</span></div>
			<el-form ref="systemform" :model="systemform" :rules="rules" class="demo-ruleForm el-form-item__content">
				<el-form-item label="一卡通商户号:" prop="cardMerId">
					<el-input v-model="systemform.cardMerId" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="一卡通终端号:" prop="cardTermId">
					<el-input v-model="systemform.cardTermId" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="商家提示语:" prop="markedWords">
					<el-input type="textarea" v-model="systemform.markedWords" placeholder=""></el-input>
				</el-form-item>
				<el-form-item>
				    <el-button type="primary" @click="seveFn(systemform)">保存</el-button>
				    <el-button >返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {merParamsAddPost,findMerParams,mallId} from '../../api/api.js';
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	
	export default {
	    data() {
	      	return {
		        systemform: {
		        	operatorId:'',
		        	updateTime:'',
		        	merId:'',
		          	openSaleDays:'',
		          	endTime:'',
		          	cardMerId: '',
		          	cardTermId: '',
		          	markedWords: ''
		        },
		        rules: {
		          cardMerId: [
		            { required: true, message: '请输入一卡通商户号', trigger: 'blur' }
		          ],
		          cardTermId: [
		            { required: true, message: '请输入一卡通终端号', trigger: 'blur' }
		          ]
		        }
      		};
	    },
	    methods: {
			seveFn(data){
				merParamsAddPost(this.systemform).then((data) => {
		    		if(data.code==1){
						this.$message({
					        message: '保存成功',
					        type: 'success'
					    });
					}else{
						this.$message.error(data.descript);
					}
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					this.loading=false
				})
			},
		    getDataList(id){
		    	findMerParams({merId:id}).then((data) => {
		    		this.systemform.operatorId = data.data[0].operatorId;
		    		this.systemform.updateTime = data.data[0].updateTime;
		    		this.systemform.merId = data.data[0].merId;
		    		this.systemform.openSaleDays = data.data[0].openSaleDays;
		    		this.systemform.endTime = data.data[0].endTime;
		    		this.systemform.cardMerId = data.data[0].cardMerId;
		    		this.systemform.cardTermId = data.data[0].cardTermId;
					this.systemform.markedWords = data.data[0].markedWords;
					this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					this.loading=false
				})
		    }
	    },
	    mounted(){
	    	//id从哪里来？
	    	// console.log('mallId:',mallId)
	    	this.getDataList(mallId);
	    }
 	}
</script>
<style>
	.systemFormFile{
		margin:0 auto;
		background:#fff;
		text-align: left;
		padding: 24px;
	}	
	.systemFormFile>.el-form{
		width:80%;
	}
	.systemFormFile .el-form-item__content{text-align:left;}
	
</style>