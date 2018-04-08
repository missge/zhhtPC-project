<template>
	<div>
		<div class="FormFile">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				  <el-form-item label="登录名" prop="userName">
				 	 <el-input v-model="userName" readonly v-if="AddOrChange == 'change'"></el-input>
				 	 <el-input v-model="userName"  v-if="AddOrChange == 'add'"></el-input>
				 	 <!-- <el-input v-model="userName"  :readonly="[AddOrChange ? 'change':'true','false']"></el-input> -->
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
					<el-form-item label="发卡机构" prop="name" v-if="ruleForm.userLevel==0">
					 	 <el-input v-model="organId" readonly></el-input>
					</el-form-item>
				   <el-form-item label="商户" v-if="ruleForm.userLevel!=0">
					    <el-select v-model="merIdKey" placeholder="请选择" @change="getMerId">
						    <el-option
						      v-for="Merchitem in getMerch"
						      :key="Merchitem.key"
						      :label="Merchitem.label"
						      :value="Merchitem.value" >
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
				    <el-button @click="returnFn">返回</el-button>
				  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import {getChangeList,UserPostChange,addUserList,getLevelList,setAddSave,getAllMerch} from '../../api/api.js';
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
				lastLoginTime:'' ,
				merId:''

	        },//form表单必须是一个对象，否则会报错
		    checkboxList:[],
		    checkedUser:[],
		    userLevel:[],
		    oldStatus:'',
		    merIdKey:'',//商户选中
		    getMerch:[],
			selectList:[
				// {value: "全部", key: 0}, 
				// {value: "启用", key: 1}, 
				// {value: "禁用", key: 2},
				// {value: "删除", key: 3}
	        ],
	        setRuleForm:{
	        	userName:this.$route.query.userName,
	        	realName:'',
	        	userLevel:'',
	        	organId:'',
	        	MerId:'',
	        	teleNo:'',
	        	status  :'',
				endTime:'',
				begTime:'',
				dlsFlag:'' ,
				roleIds:'',
				merId:''
	        },
	        addRuleForm:{
	        	userName:'',
	        	realName:'',
	        	userLevel:'',
	        	teleNo:'',
	        	status  :'',
				endTime:'',
				begTime:'',
				roleIds:'',
				merId:'',
				organId:''
	        },
	        organId:'发卡机构'

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
					  	this.selectList=data.userStatus
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
					getLevelList({}).then((data) => {
						this.checkboxList=data.data.dateInfo
						this.userLevel=data.data.levelAll
					  	let initStatus=data.data.userStatus
					  	let initKey=''
					  	this.selectList=data.data.userStatus
						this.selectList.forEach(function(items){
							if(items.key == initStatus){
								initKey=items.value
							}
						})
						this.oldStatus=initKey
					})
				}
				//获取商户
				getAllMerch({}).then((data) => {
					// this.selectList.forEach(function(items){
					// 		if(items.key == initStatus){
					// 			initKey=items.value
					// 		}
					// 	})
					// 	this.oldStatus=initKey
					if(data.data.code==1){
						// let initMerch=''
						this.getMerch=data.data.dataInfo
						// this.getMerch.forEach(function(item){
						// 	if(item.key == initStatus){
						// 		initMerch=item.value
						// 	}
						// })
						// this.merIdKey=initMerch
					}

				})
				
			},
			seveFn(status){
				if(this.AddOrChange=='change'){
					this.setRuleForm.realName = this.ruleForm.realName
					this.setRuleForm.userLevel = this.ruleForm.userLevel
					this.setRuleForm.teleNo = this.ruleForm.teleNo
					this.setRuleForm.status = this.ruleForm.stutas
					this.setRuleForm.endTime = this.ruleForm.endTime
					this.setRuleForm.begTime = this.ruleForm.begTime
					this.setRuleForm.roleIds = this.ruleForm.roleIds
					if(this.ruleForm.userLevel==0){
						this.setRuleForm.organId = this.ruleForm.userLevel
					}else{
						this.setRuleForm.merId = this.ruleForm.merId
					}

					console.log()
					UserPostChange(this.setRuleForm).then((data)=>{
						if(data.code==1){
							this.$message({
					          message: '修改成功',
					          type: 'success'
					        });
						}else{
							this.$message.error(data.descript);
						}
					      this.$router.push('/UserManagement');
					})

				}else{
					this.addRuleForm.userName=this.userName
					this.addRuleForm.realName = this.ruleForm.realName
					this.addRuleForm.userLevel = this.ruleForm.userLevel
					this.addRuleForm.teleNo = this.ruleForm.teleNo
					this.addRuleForm.status = 	this.ruleForm.stutas
					this.addRuleForm.endTime = this.ruleForm.endTime
					this.addRuleForm.begTime = this.ruleForm.begTime
					this.addRuleForm.roleIds = this.ruleForm.roleIds
					if(this.ruleForm.userLevel==0){
						this.setRuleForm.organId = this.ruleForm.userLevel
					}else{
						this.setRuleForm.merId = this.ruleForm.merId
					}

					setAddSave(this.addRuleForm).then((data)=>{
						console.log(data)
						if(data.data.code==1){
							this.$message({
					          message: '添加成功',
					           type: 'success'
					        });
						}else{
							this.$message.error(data.data.descript);
						}
					      this.$router.push('/UserManagement');

					})
				}
			},
			returnFn(){
				this.$router.push('/UserManagement');
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
			getMerId(val){
				let MerIdkey='';
				this.getMerch.forEach(function(items){
					if(items.value==val){
						MerIdkey=items.key
					}
				})
				this.ruleForm.merId=MerIdkey

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