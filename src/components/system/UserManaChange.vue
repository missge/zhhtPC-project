<template>
	<div>
		<div class="FormFile">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				  <el-form-item label="登录名" prop="userName">
				 	 <el-input v-model="userName" readonly></el-input>
				  </el-form-item>
				  <el-form-item label="真实姓名" prop="realName">
				    <el-input v-model="ruleForm.realName"></el-input>
				  </el-form-item>
				  <el-form-item label="用户级别">
				    <el-radio-group v-model="ruleForm.userLevel">
				       <el-radio v-for="(items,key) in userLevel" :key='key' @change="getRadioFn"
					      :label="items.key"
					      >{{items.value}}
					   </el-radio>
				    </el-radio-group>
				  </el-form-item>
	  			 <el-form-item label="联系电话" >
				    <el-input v-model="ruleForm.teleNo"></el-input>
				  </el-form-item>
				  <el-form-item label="状态">
					    <el-select v-model="oldStatus" placeholder="请选择" @change="getStatus">
						    <el-option
						      v-for="item1 in selectList"
						      :key="item1.key"
						      :label="item1.label"
						      :value="item1.value" >
						    </el-option>
						</el-select>
				  </el-form-item>
				 <el-form-item label="角色" >
				    <el-checkbox-group v-model="checkedUser" :max="5" @change="getCheckFn">
				      <el-checkbox v-for="Checkboxitem in checkboxList" :label="Checkboxitem.value" :key="Checkboxitem.key" >
				      </el-checkbox>
				    </el-checkbox-group>
				  </el-form-item>

				  <el-form-item label="开始和结束时间" required>
				    <el-col :span="11">
				      <el-form-item prop="begTime">
				        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.begTime" style="width: 100%;"></el-date-picker>
				      </el-form-item>
				    </el-col>
				    <el-col class="line" :span="2">-</el-col>
				    <el-col :span="11">
				      <el-form-item prop="endTime">
				        <el-date-picker type="date" placeholder="选择结束日期" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
				      </el-form-item>
				    </el-col>
				  </el-form-item>
				 <el-form-item label="密码错误次数" prop="name">
				 	 <el-input v-model="ruleForm.wrpass" readonly></el-input>
				  </el-form-item>
				 <el-form-item label="最后登录时间" prop="name">
				 	 <el-input v-model="ruleForm.lastLoginTime " readonly></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="seveFn(ruleForm.status)">保存</el-button>
				    <el-button >返回</el-button>
				  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import {getChangeList,UserPostChange,addUserList} from '../../api/api.js';
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	export default {
	    data() {
	      return {
	        rules: {
			  userName: [
			  	 {  message: '请输入用户名' },
			  ],
	          realName: [
	            { required: true, message: '请输入真实姓名', trigger: 'blur' },
	            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
	          ],
	          begTime: [
	            { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
	          ],
	          endTime: [
	            { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
	          ],
	        },
	        userName:this.$route.query.userName,
	        AddOrChange:this.$route.query.AddOrChange,
	        ruleForm:{
	        	userName:'',
	        	realName:'',
	        	userLevel:'',
	        	teleNo:'',
	        	stutas:'',
	        	roleIds:'',
	        	begTime:'',
				endTime:'',
				wrpass:'',
				lastLoginTime:'' 	
	        },//form表单必须是一个对象，否则会报错
		    checkboxList:[],
		    checkedUser:[],
		    userLevel:[],
		    oldStatus:'',
			selectList:[
				{value: "全部", key: 0}, 
				{value: "启用", key: 1}, 
				{value: "禁用", key: 2},
				{value: "删除", key: 3}
	        ],
	      };
	    },
	    methods: {
			getTablelist(){
				//标志是点击添加，还是修改按钮
				if(this.AddOrChange=='change'){
					getChangeList({userName:this.userName}).then((data) => {
						this.ruleForm=data.data
						this.checkedUser=data.roleMap
						this.checkboxList=data.dateInfo
						this.userLevel=data.levelAll

					  	let initStatus=data.data.status
					  	let initKey=''
						this.selectList.forEach(function(items){
							if(items.key == initStatus){
								initKey=items.value
							}
						})
						this.oldStatus=initKey
					}).catch(message => {
						this.$message.error("请求失败，请联系客服，失败码"+message);
						 this.loading=false
					})
				}else{
					
				}
				
			},
			seveFn(status){
				UserPostChange(this.ruleForm).then((data)=>{
					console.log(data)
				})
			},
			getRadioFn(val){
				this.ruleForm.userLevel=val
			},
			getStatus(val){

				let key='';
				this.selectList.forEach(function(items){
					if(items.value==val){
						key=items.key
					}
					
				})
				this.ruleForm.stutas=key
			},
			getCheckFn(val){
				//遍历角色所有的值，遍历选择的值。相等，输出items.key
				let checkArr=[]
				this.checkboxList.forEach(function(items){
					val.forEach(function(valItem){
						if(items.value==valItem){
							// console.log(items.key)
							checkArr.push(items.key)
						}
					})
				})
				this.ruleForm.roleIds=checkArr
			}
			// submitForm(formName) {
			// 	this.$refs[formName].validate((valid) => {
			// 	  if (valid) {
			// 	    alert('submit!');
			// 	  } else {
			// 	    console.log('error submit!!');
			// 	    return false;
			// 	  }
			// 	});
			// },
			// resetForm(formName) {
			// 	this.$refs[formName].resetFields();
			// }
	    },
	    mounted(){
	    	this.getTablelist();
	    }
 	}
</script>
<style>
	.FormFile{
		margin:0 auto;
		background:#fff;
	}	
	.FormFile>.el-form{
		width:80%;
		padding: 24px;
	}
	.FormFile .el-form-item__content{text-align:left;}
</style>