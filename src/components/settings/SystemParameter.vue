<template>
	<div>
		<div class="systemFormFile">
			<div><span>参数设置</span></div>
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
	import {merParamsAddPost,findMerParams} from '../../api/api.js';
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	
	export default {
	    data() {
	      	return {
		        systemform: {
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
				// UserPostChange(this.ruleForm).then((data)=>{
				// 	console.log(data)
				// })
				console.log(data)
			},
		    getDataList(id){
		    	findMerParams().then((data) => {
		    		this.systemform.cardMerId = data.cardMerId;
		    		this.systemform.cardTermId = data.cardTermId;
					this.systemform.markedWords = data.markedWords;	
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					this.loading=false
				})
		    }
	    },
	    mounted(){
	    	//id从哪里来？
	    	// this.getDataList(id);
	    }
 	}
</script>
<style>
	.systemFormFile{
		margin:0 auto;
		background:#fff;
	}	
	.systemFormFile>.el-form{
		width:80%;
		padding: 24px;
		
	}
	.systemFormFile .el-form-item__content{text-align:left;}
	
</style>