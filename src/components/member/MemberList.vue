<template>
	<div class="member-content">
		<div class="table">
			<div class="member_table">
			<div class="member-container">
				<el-row style="margin-bottom:15px">
					<el-button size="mini" @click="openMessageDialog(multipleSelection)">发送站内信</el-button>
					<!-- <el-button type="success" size="mini" @click="dialogFormVisible = true">批量导入会员</el-button> -->
				</el-row>
				<el-row>
					<el-form :inline="true" :model="form" class="demo-form-inline" >
					  <el-form-item label="关注时间" prop="date">
					    <el-date-picker size="mini" style="width:160px" type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
					  </el-form-item>
					  <el-form-item label="状态" prop="status">
					    <el-select  size="mini" style="width:120px" v-model="form.status" placeholder="请选择状态">
						    <el-option
						      v-for="item in status"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
					  </el-form-item>
					  <el-form-item label="昵称/手机号码" prop="userinfo">
					    <el-input size="mini" style="width:160px" v-model="form.userinfo" placeholder="请输入昵称/手机号码"></el-input>
					  </el-form-item>
					  <el-form-item label="注册状态" prop="zcStatus">
					    <el-select  size="mini" style="width:120px" v-model="form.zcStatus" placeholder="请选择状态">
						    <el-option
						      v-for="item in zcStatus"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
					  </el-form-item>
					 
					  <el-form-item>
					    <el-button size="mini" type="primary" @click="getTablelist(form)">查询</el-button>
					  </el-form-item>
					</el-form>
				</el-row>
			</div>
	        <el-table :data="tableDatas"  border style="width: 100%;"  v-loading="loading" @selection-change="handleSelectionChange">
	        	<el-table-column type="selection" width="40"></el-table-column>
				<el-table-column label="用户名">
					<template slot-scope="scope" >
		           	<img class="member-user-img" :src="scope.row.wxPhoto">
		           	<span>{{ scope.row.userName }}</span>
		          	</template>
				</el-table-column>
				<el-table-column  prop="availableAmt" label="积分"></el-table-column>
				<el-table-column  label="性别">
					<template slot-scope="scope" >
		           		<span v-if="scope.row.sex==1">男</span>
        				<span v-if="scope.row.sex==2">女</span>
        				<span v-if="scope.row.sex==3">不祥</span>
		          	</template>
				</el-table-column>
				<el-table-column width="110px"  prop="teleNo" label="电话"></el-table-column>
				<el-table-column  prop="companyName" label="所属企业"></el-table-column>
				<el-table-column  label="状态">
					<template slot-scope="scope" >
		           		<span v-if="scope.row.status==0">已取消</span>
        				<span v-if="scope.row.status==1">已关注</span>
		          	</template>
				</el-table-column>
				<el-table-column width="180px" prop="gzTime" label="关注时间"></el-table-column>
		        <el-table-column width="180px" label="相关操作" >
			        <template slot-scope="scope" >
		           	<el-button size="small" @click="memerInfo(scope.row.memId)">详情</el-button>
		           	<el-button size="small" type="danger" @click="dialogRefectoryVisible = true">设为餐厅</el-button>
		          	</template>
		     	</el-table-column>
			</el-table>
			<el-pagination class="pagination"  @current-change="handleCurrentChange" background layout="prev, pager, next , jumper"  :current-page.sync="tableList.pageIndex" :total="totalCount" >
			</el-pagination>

			<el-dialog width="400px" title="批量导入会员" :visible.sync="dialogFormVisible">
				<el-upload
				  class="upload-demo"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :on-preview="handlePreview"
				  :on-remove="handleRemove"
				  :before-remove="beforeRemove"
				  multiple
				  :limit="1"
				  :on-exceed="handleExceed"
				  :file-list="fileList">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">上传任何文件</div>
				</el-upload>
			  	<div slot="footer" class="dialog-footer">
			    	<el-button @click="dialogFormVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			  	</div>
			</el-dialog>

			<el-dialog width="400px" title="设为餐厅" :visible.sync="dialogRefectoryVisible">
				
				<el-form :model="formRefectory">
				    <el-form-item label="选择餐厅" prop="refectory">
				      <el-select v-model="formRefectory.refectory" placeholder="请选择餐厅">
				        <el-option
					      v-for="item in refectoryList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				      </el-select>
				    </el-form-item>
				</el-form>

			  	<div slot="footer" class="dialog-footer">
			    	<el-button @click="dialogRefectoryVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="dialogRefectoryVisible = false">确 定</el-button>
			  	</div>
			</el-dialog>

			<el-dialog width="800px" title="发送站内信" :visible.sync="dialogMessageVisible">
				<el-form  :rules="rulesMessage" :model="formMessage" :ref="formMessage" >
					 <div class="message-userlist">
					 	<div class="message-label">收件人</div>
					    <div class="message-user-box">
					    	<span class="message-user" v-for="item in multipleSelection">{{item.userName}}(会员编号：{{item.memId}})</span>
					    </div>
					</div>
				    <el-form-item label="标题" prop="title">
					    <el-input v-model="formMessage.title"  placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="内容" prop="content">
					    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="formMessage.content"></el-input>
					</el-form-item>
				</el-form>

			  	<div slot="footer" class="dialog-footer">
			    	<el-button @click="dialogMessageVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="sendMessage(formMessage)">确 定</el-button>
			  	</div>
			</el-dialog>
		</div>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	import {findMembersPost,membersSendInfo} from '../../api/api.js'
	export default{
		data(){
			return{
				totalCount:1,
				loading: true,
				dialogFormVisible: false,
				dialogRefectoryVisible: false,
				dialogMessageVisible: false,
				multipleSelection: [], //会员选择状态；
				selectedUser:[],//被选择的用户
				tableList:{
					pageIndex:1
				},
				refectoryList:[],//餐厅列表
				tableDatas:[],//列表的值
				fileList:[],
				form:{
					date:'',
					status:'',
					userinfo:'',
					zcStatus:'',
					pageIndex:1
				},
				formRefectory:{
					refectory:''
				},
				formMessage:{
					memId:'',
					title:'',
					content:'',
					sender:''
				},
				status: [{
		          value: '',
		          label: '全部'
		        }, {
		          value: '0',
		          label: '已取消'
		        }, {
		          value: '1',
		          label: '已关注'
		        }],
		        zcStatus: [{
		          value: '',
		          label: '不限'
		        }, {
		          value: '0',
		          label: '已注册'
		        }, {
		          value: '1',
		          label: '未注册'
		        }],
		        rulesMessage: {
		          title: [
		            { required: true, message: '请输入信息标题', trigger: 'blur' }
		          ],		
		          content: [
		            { required: true, message: '请填写信息内容', trigger: 'blur' }
		          ]
		        }

			}
		},
		methods:{
			//点击哪页触发的时间
			handleCurrentChange(val) {
				this.form.pageIndex=val
				this.getTablelist(this.form)
	        },
			getTablelist(formName){
				findMembersPost(formName).then((data) => {
					if(data.code === 1){
						this.tableDatas=data.data
						this.totalCount=data.pageInfo.totalCount
					}else{
						this.tableDatas = [];
						this.totalCount = 1;
					}
					
					this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					 this.loading=false
				})
			},
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview(file) {
		        console.log(file);
		    },
		    handleExceed(files, fileList) {
		       this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		    },
		    beforeRemove(file, fileList) {
		        return this.$confirm(`确定移除 ${ file.name }？`);
		    },
		    memerInfo(id){
				this.$router.push({path:'/MemberInfo',query:{memId:id}})
		    },
		    settingFn(id){

		    },
		    handleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
		    openMessageDialog(val){
				let userlist = val;
				if(userlist.length == 0){
					this.$message.error("请没有选择会员");
				} else{
					this.selectedUser = [];
					userlist.map((item) => {
					    this.selectedUser.push(item.memId);
					});
					this.formMessage.memId = this.selectedUser.join(",");

					this.formMessage.sender = localStorage.getItem('userName');
					this.dialogMessageVisible = true;
				}
		    },
		    sendMessage(formName){
		    	this.$refs[formName].validate((valid) => {
			    	 if (valid) {
			            membersSendInfo(formName).then((data) => {
							this.$message.success("发送成功！");
							this.dialogMessageVisible = false;
						}).catch(message => {
							this.$message.error("请求失败，请联系客服，失败码"+message);
						})
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
		        });
		    }
		},
		mounted(){
			this.getTablelist(this.form);
		}
	}
</script>
<style>
.member-container{
	text-align: left;
	/*padding-bottom: 15px;*/
}

.member-user-img{
	width: 32px;
    vertical-align: middle;
    margin-right: 5px;
}

.member_table{
		padding: 20px;
		padding-bottom: 0;
	}

.el-dialog__body,
.el-dialog__header{
	text-align: left;
}

.message-user{
	position: relative;
    padding-right: 10px;
    margin-right: 15px;
    height: 15px;
    display: inline-block;
    font-size: 12px;
}
.message-user:after{
	content: ";";
	position:absolute;
	right: 0;
}

.message-user:last-child:after{
	display: none;
}

.message-userlist{
	margin-bottom: 20px;
}
.message-label{
	font-size: 14px;
	line-height: 40px;
    padding: 0 12px 0 0;
}

.message-user-box
{
	border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 8px;
}

.member-content .el-dialog__body{
	padding: 10px 20px;
}
</style>