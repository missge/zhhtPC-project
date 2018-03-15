<template>
	<div>
		<div class="FormFile">
			<el-form :model="rolesList" :rules="rules" ref="rolesList" label-width="150px" class="demo-ruleForm">
				  <el-form-item label="角色编号" prop="name">
				 	 <el-input v-model="rolesList.code" readonly></el-input>
				  </el-form-item>
				  <el-form-item label="角色名称" prop="name">
				    <el-input v-model="rolesList.name"></el-input>
				  </el-form-item>
				   <el-form-item label="所属机构" prop="region">
				    <el-select v-model="rolesList.organId" placeholder="请选择商户">
				      <el-option
					      v-for="item in selectList"
					      :key="item.key"
					      :label="item.label"
					      :value="item.value" >
					    </el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="状态" prop="selectList">
				    <el-select v-model="rolesList.status" placeholder="请选择商户">
					    <el-option
					      v-for="item in selectList"
					      :key="item.key"
					      :label="item.label"
					      :value="item.value" >
					    </el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="角色类型" prop="selectList">
				    <el-radio-group v-model="rolesList.isCommon">
				      <el-radio v-for="items in selectList"
					      :label="items.key"
					      >{{items.value}}
					   </el-radio>

				    </el-radio-group>
				  </el-form-item>
	  			  <el-form-item label="权限" prop="resource">
					   <el-tree
						  :data="data2"
						  show-checkbox
						  default-expand-all
						  node-key="id"
						  ref="tree"
						  highlight-current
						  :props="defaultProps">
					</el-tree>	
	  			  </el-form-item>
				 <el-form-item label="描述">
				    <el-input type="textarea" v-model="rolesList.memo"></el-input>
				 </el-form-item>
				  <el-form-item>
				    <el-button type="primary">保存</el-button>
				    <el-button >返回</el-button>
				  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import {getRolePostChange} from '../../api/api.js'
	import Vue from 'vue'
	import router from '@/router'
	 export default {
	    data() {
	      return {
	      	id:this.$route.query.id,
	      	rolesList:[],
		    // isCommon:1,
	      	selectList:[
				{value: "全部", key: 0}, 
				{value: "启用", key: 1}, 
				{value: "禁用", key: 2},
				{value: "删除", key: 3}
		    ],
		    treeJson:[],
	        ruleForm: {
	          name: '',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: '',

	        },
	        rules: {
	          name: [
	            { required: true, message: '请输入活动名称', trigger: 'blur' },
	            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	          ],
	          region: [
	            { required: true, message: '请选择活动区域', trigger: 'change' }
	          ],
	          date1: [
	            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
	          ],
	          date2: [
	            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
	          ],
	          type: [
	            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
	          ],
	          resource: [
	            { required: true, message: '请选择活动资源', trigger: 'change' }
	          ],
	          desc: [
	            { required: true, message: '请填写活动形式', trigger: 'blur' }
	          ]
	        },
	        data2: [
		        {
		          id: 1,
		          label: '一级 1',
		          children: [{
		            id: 4,
		            label: '二级 1-1',
		            children: [{
		              id: 9,
		              label: '三级 1-1-1'
		            }, {
		              id: 10,
		              label: '三级 1-1-2'
		            }]
		          }]
		        },
		         {
		          id: 2,
		          label: '一级 2',
		          children: [{
		            id: 5,
		            label: '二级 2-1'
		          }, {
		            id: 6,
		            label: '二级 2-2'
		          }]
		        },
		         {
		          id: 3,
		          label: '一级 3',
		          children: [{
		            id: 7,
		            label: '二级 3-1'
		          }, {
		            id: 8,
		            label: '二级 3-2'
		          }]
		        }
	        ],
	        defaultProps: {
	          children: 'children',
	          label: 'label'
	        }
	      };
	    },
	    methods: {
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            alert('submit!');
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		    },
		    getTablelist(){
				getRolePostChange({id:this.id}).then((data) => {
					console.log(data.jsonsAll);
					this.rolesList=data.roles;
					this.treeJson=data.jsonsAll;
					// this.tableDatas=data.data
					// this.totalCount=data.pageInfo.totalCount
					//  this.loading=false
				}).catch(message => {
					this.$message.error("请求失败，请联系客服，失败码"+message);
					 this.loading=false
				})
			}
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