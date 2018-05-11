<template>
	<div>
		<div class="CustomerForm">
			<el-form ref="customerform" :rules="customerrules" :model="customerform" class="demo-ruleForm el-form-item__content"  size="mini">
				<el-row :gutter="24">
				  <el-col class="form-label" :span="24"><div>基本信息</div></el-col>
				</el-row>

				<el-row :gutter="24">
				  <el-col :span="12">
				  	<el-form-item label="客户名称" prop="compName">
					    <el-input v-model="customerform.compName"  placeholder="请输入客户名称"></el-input>
						</el-form-item>
				  </el-col>
				 	<el-col :span="12">
				  	<el-form-item label="类型"  prop="genre">
					    <el-radio-group v-model="customerform.genre">
					      <el-radio   label="0" >供应商</el-radio>
					      <el-radio   label="1" >餐厅</el-radio>
					      <el-radio  label="2" >商城</el-radio>
					    </el-radio-group>
					  </el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24" >
					<el-col :span="12">
				  	<el-form-item label="企业" prop="merName">
					    <el-select v-model="customerform.companyId" placeholder="请选择企业">
								    <el-option
								      v-for="item in companylist"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
							  	</el-select>
						</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="12">
				  	<el-form-item label="商铺名称" prop="merName">
					    <el-input v-model="customerform.merName" placeholder="请输入商铺名称"></el-input>
						</el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="联系人" prop="conPerName">
					    <el-input v-model="customerform.conPerName" placeholder="请输入联系人"></el-input>
						</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="12">
				  	<el-form-item label="手机号码" prop="conPerTeleNo">
					    <el-input v-model="customerform.conPerTeleNo" placeholder="请输入手机号码"></el-input>
						</el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="座机" prop="teleNo">
					    <el-input v-model="customerform.teleNo" placeholder="请输入座机"></el-input>
						</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
				 	<el-col :span="24">
						<el-form-item label="所在地" required>
					 	<el-row :gutter="24" class="inner-row">
					  	<el-col :span="5">
						  	<el-form-item prop="provinceId">
							    <el-select v-model="customerform.provinceId" placeholder="请选择省">
								    <el-option
								      v-for="item in provincelist"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
							  	</el-select>
						  	</el-form-item>
						  </el-col>
						  <el-col :span="5">
							  <el-form-item prop="cityId">
							    <el-select v-model="customerform.cityId" placeholder="请选择城市">
								    <el-option
								      v-for="item in citylist"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
							  	</el-select>
						  	</el-form-item>
						  </el-col>
						  <el-col :span="5">
							  <el-form-item prop="areaIds">
							    <el-select v-model="customerform.areaIds" placeholder="请选择城区">
								    <el-option
								      v-for="item in arealist"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
							  	</el-select>
						  	</el-form-item>
						  </el-col>
					  	<el-col :span="9">
						  	<el-form-item prop="streeSce">
							    <el-input v-model="customerform.streeSce" placeholder="请选择所在地街道，大厦，门牌号"></el-input>
						    </el-form-item>
						  </el-col>
						</el-row>
						</el-form-item>
						</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="12">
				  	<el-form-item label="状态" prop="status">
					    <el-select v-model="customerform.status" placeholder="请选择状态">
					      <el-option label="合作中" value="1"></el-option>
					      <el-option label="已到期" value="2"></el-option>
					      <el-option label="已解约" value="3"></el-option>
					    </el-select>
						</el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="客服电话" prop="serviceTel">
					    <el-input v-model="customerform.serviceTel" placeholder="请输入客服电话"></el-input>
						</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="24">
				  	<el-form-item label="LOGO图(点击图片可查看大图)" prop="uploadfile">
					   	<el-upload
							  class="upload-demo"
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :before-remove="beforeRemove"
							  :limit="1"
							  :on-exceed="handleExceed"
							  :file-list="fileLog"
							  list-type="picture">
							  <el-button size="small" type="primary">点击上传</el-button>
							  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
							</el-upload>
						</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
				  <el-col class="form-label" :span="24"><div>资质及合同</div></el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="24">
				  	<el-form-item class="file-label" label="基本资质(点击图片可查看大图)" label-suffix="" prop="uploadfile">
					   	<el-upload
							  class="upload-demo"
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :before-remove="beforeRemove"
							  multiple
							  :limit="5"
							   drag
							  :on-exceed="handleExceed"
							  :file-list="fileLog"
							  list-type="picture">
							  <i class="el-icon-upload"></i>
  							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							  <div slot="tip" class="el-upload__tip">注意:图片至少上传1张，最多上传5张，图片大小不超过1M</div>
							</el-upload>
						</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="24">
				  	<el-form-item class="file-label" label="特殊资质(点击图片可查看大图)" prop="">
					   	<el-upload
							  class="upload-demo"
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :before-remove="beforeRemove"
							  multiple
							  :limit="10"
							   drag
							  :on-exceed="handleExceed"
							  :file-list="fileLog"
							  list-type="picture">
							  <i class="el-icon-upload"></i>
  							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							  <div slot="tip" class="el-upload__tip">注意:图片最多上传10张,图片大小不超过1M</div>
							</el-upload>
						</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="24">
				  	<el-form-item class="file-label" label="合同(点击图片可查看大图)" prop="">
					   	<el-upload
							  class="upload-demo"
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :before-remove="beforeRemove"
							  multiple
							  :limit="15"
							  drag
							  :on-exceed="handleExceed"
							  :file-list="fileLog"
							  list-type="picture">
							  <i class="el-icon-upload"></i>
  							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							  <div slot="tip" class="el-upload__tip">注意:图片最多上传15张,图片大小不超过1M</div>
							</el-upload>
						</el-form-item>
				  </el-col>
				</el-row>


				<el-row :gutter="24">
				  <el-col class="form-label" :span="24"><div>合作方式</div></el-col>
				</el-row>

				<el-row :gutter="24">
				 	<el-col :span="12">
				  	<el-form-item label="对账分类"  prop="cooperation">
					    <el-radio-group v-model="customerform.cooperation">
					      <el-radio   label="0" >固定扣点</el-radio>
					      <el-radio   label="1" >分润</el-radio>
					    </el-radio-group>
					  </el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
				  <el-col :span="12">
				  	<el-form-item label="分润比例/平台扣点 (客户扣点或分润比例请填写0.xx格式，如10%时，填写0.1)" prop="rakeRate">
					    <el-input v-model="customerform.rakeRate"  placeholder="请输入分润比例/平台扣点"></el-input>
						</el-form-item>
				  </el-col>
				</el-row>
				<!-- 15天  30天  45天  60天  1天 -->
				<el-row :gutter="24">
				 	<el-col :span="12">
				  	<el-form-item label="对账分类"  prop="settPeriod">
					    <el-radio-group v-model="customerform.settPeriod">
					      <el-radio   label="15" >15天</el-radio>
					      <el-radio   label="30" >30天</el-radio>
					      <el-radio   label="45" >45天</el-radio>
					      <el-radio   label="60" >60天</el-radio>
					      <el-radio   label="1" >1天</el-radio>
					    </el-radio-group>
					  </el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
				  <el-col class="form-label" :span="24"><div>商品规则</div></el-col>
				</el-row>

				<el-row :gutter="24">
				  <el-col :span="12">
				  	<el-form-item label="商品上限" prop="goodsLimit">
					    <el-input v-model="customerform.goodsLimit"  placeholder="请输入商品上限"></el-input>
						</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
				  <el-col :span="24">
				  	<el-form-item label="商品类目" prop="cityCode">
					    <el-tree 
					    :data="cityCodeData"
					    :props="customerform.cityCode" 
					    show-checkbox
					    @node-click="handleNodeClick"></el-tree>
						</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
				  <el-col :span="24">
				  	<el-form-item label="价格筛选(提示：价格过滤仅针对“商城”类型客户，供应商和餐厅类型不适用)">
					  	<el-row :gutter="24" class="inner-row">
					  		<el-col :span="7">
						    	<el-select v-model="merTemp.item1" width="100%">
							      <el-option label="价格" value="1"></el-option>
							      <el-option label="毛利率" value="2"></el-option>
							    </el-select>
						    </el-col>
						    <el-col :span="7">
						    	<el-select v-model="merTemp.item2">
							      <el-option label="大于" value="1"></el-option>
							      <el-option label="小于" value="2"></el-option>
							      <el-option label="等于" value="3"></el-option>
							      <el-option label="区间" value="4"></el-option>
							    </el-select>
						    </el-col>
						    <el-col :span="7">
						    	 <el-input v-model="merTemp.item3"  placeholder="请输入条件"></el-input>
						    </el-col>
						    <el-col :span="2">
						    	 <el-button type="danger" round>删除</el-button>
						    </el-col>
						  </el-row>
							</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
				  <el-col :span="12">
				  	<el-form-item>
					     <el-button type="success" round>添加</el-button>
						</el-form-item>
				  </el-col>
				</el-row>

				<el-row :gutter="24">
				  <el-col :span="12">
				  	<el-form-item label="备注" prop="remark">
					    <el-input v-model="customerform.remark"  placeholder="请输入备注"></el-input>
						</el-form-item>
				  </el-col> 
				</el-row>

				<el-row :gutter="24">
				  <el-col class="form-label" :span="24"><div>账号信息</div></el-col>
				</el-row>

				<el-row :gutter="24">
				  <el-col :span="12">
				  	<el-form-item label="登录名" prop="userName">
					    <el-input v-model="customerform.userName"  placeholder="请输入备注"></el-input>
						</el-form-item>
				  </el-col> 
				  <el-col :span="12">
				  	<el-form-item label="登录密码" prop="passWord">
					    <el-input v-model="customerform.passWord"  placeholder="请输入登录密码"></el-input>
						</el-form-item>
				  </el-col> 
				</el-row>

				<el-row :gutter="24">
				  <el-col :span="12">
				  	<el-form-item label="有效期开始" prop="begTime">
					    <el-date-picker type="date" placeholder="选择有效期开始" v-model="customerform.begTime"></el-date-picker>
						</el-form-item>
				  </el-col> 
				  <el-col :span="12">
				  	<el-form-item label="有效期结束" prop="endTime">
					    <el-date-picker type="date" placeholder="选择有效期结束" v-model="customerform.endTime"></el-date-picker>
						</el-form-item>
				  </el-col> 
				</el-row>
				
				<el-row :gutter="24">
				  <el-col :span="24">
						<el-form-item class="customer-btn">
						    <el-button size="large" type="primary" @click="seveFn(customerform)">保存</el-button>
						    <el-button size="large" >返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {addAreaTemp,editAreaTemp} from '../../api/api.js';
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	
	export default {
	    data() {
	      return {
	      	AddOrChange:this.$route.query.AddOrChange,
        	fileLog:[],
        	provincelist:[],
        	citylist:[],
					arealist:[],
					companylist:[],
					cityCodeData:[{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            	}]
          	}]
	        }, {
	          label: '一级 2',
	          children: [{
	            label: '二级 2-1',
	            children: [{
	              label: '三级 2-1-1'
	            }]
	          }, {
	            label: '二级 2-2',
	            children: [{
	              label: '三级 2-2-1'
	            }]
	          }]
	        }, {
	          label: '一级 3',
	          children: [{
	            label: '二级 3-1',
	            children: [{
	              label: '三级 3-1-1'
	            }]
	          }, {
	            label: '二级 3-2',
	            children: [{
	              label: '三级 3-2-1'
	            }]
	          }]
	        }],
	        merTemp:{
	        	item1:'0',
	        	item2:'0',
	        	item3:''
	        },
        	customerform: {
	          compName: '',
	          genre:'0',
	          companyId:'',
	          merName:'',
	          conPerName:'',
	   				conPerTeleNo:'',
	   				teleNo:'',
	   				provinceId:'',
	   				cityId:'',
	   				areaIds:'',
	   				streeSce:'',
	   				status:'1',
	   				serviceTel:'',
	   				cooperation:'0',
	   				rakeRate:'',
	   				settPeriod:'15',
	   				goodsLimit:'',
	   				remark:'',
	   				cityCode:'',
	   				merTemp:'',
	   				userName:'',
	   				passWord:'',
	   				begTime:'',
	   				endTime:''
	        },
	        customerrules:{
	        	compName: [
            	{ required: true, message: '请输入客户名称', trigger: 'blur' }
          	],
          	genre: [
            	{ required: true, message: '请输入类型', trigger: 'blur' }
          	],
          	merName: [
            	{ required: true, message: '请输入商铺名称', trigger: 'blur' }
          	],
          	conPerName: [
            	{ required: true, message: '请输入联系人', trigger: 'blur' }
          	],
          	conPerTeleNo: [
            	{ required: true, message: '请输入手机号码', trigger: 'blur' }
          	],
          	provinceId: [
            	{required: true, message: '请选择省', trigger: 'change' }
          	],
          	cityId: [
            	{ required: true, message: '请选择市', trigger: 'change' }
          	],
          	areaIds: [
            	{ required: true, message: '请选择城区', trigger: 'change' }
          	],
          	streeSce: [
            	{ required: true, message: '请输入街道', trigger: 'blur' }
          	],
          	status: [
            	{ required: true, message: '请选择状态', trigger: 'change' }
          	],
          	serviceTel: [
            	{ required: true, message: '请输入客服电话', trigger: 'blur' }
          	],
          	cooperation: [
            	{ required: true, message: '请选择对账分类', trigger: 'change' }
          	],
          	rakeRate: [
            	{ required: true, message: '请输入平台扣点', trigger: 'blur' }
          	],
          	settPeriod: [
            	{ required: true, message: '请选择结算周期', trigger: 'change' }
          	],
          	goodsLimit: [
            	{ required: true, message: '请输入商品上限', trigger: 'blur' }
          	],
          	userName: [
            	{ required: true, message: '请输入登录名', trigger: 'blur' }
          	],
          	passWord: [
            	{ required: true, message: '请输入登录密码', trigger: 'blur' }
          	],
          	begTime: [
            	{ type: 'date', required: true, message: '请选择有效期开始时间', trigger: 'change' }
          	],
          	endTime: [
            	{ type: 'date', required: true, message: '请选择有效期结束时间', trigger: 'change' }
          	],
          	uploadfile:[
            	{ required: true, message: '请选择图片', trigger: 'blur' }
          	],
	        }
	      };
	    },
	    methods: {
				getTablelist(){
					//标志是点击添加，还是修改按钮
					if(this.AddOrChange=='change'){
						getChangeList().then((data) => {
							
						}).catch(message => {
							this.$message.error("请求失败，请联系客服，失败码"+message);
							 this.loading=false
						})
					}else{
						
					}
				},
				seveFn(data){
					// UserPostChange(this.ruleForm).then((data)=>{
					// 	console.log(data)
					// })
					console.log(data)
				},
				/*文件上传的方法*/
				handleRemove(file, fileList) {
	        console.log(file, fileList);
	      },
	      handlePreview(file) {
	        console.log(file);
	      },
	      handleExceed(files, fileList) {
	        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
	      },
	      beforeRemove(file, fileList) {
	        return this.$confirm(`确定移除 ${ file.name }？`);
	      },

	      handleNodeClick(){

	      }
		   
	    },
	    mounted(){
	    	//cityOptions从接口中调数据
	    	this.getTablelist();
	    }
 	}
</script>
<style>
	.CustomerForm{
		background: #fff;
    padding: 24px;
	}	

	.CustomerForm .el-select{
		    width: 100%;
	}
	.CustomerForm .el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 100%
	}
	.CustomerForm .form-label{

		font-size: 18px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
	}

	.CustomerForm .form-label>div{
		background: #409EFF;
    color: #fff;
    margin: 0 -24px;
    padding: 0 24px;
	}

	.CustomerForm  .file-label{
		padding-bottom: 15px;
    border-bottom: 1px dashed #409EFF;
	}

	.CustomerForm  .customer-btn{
		margin: 50px 0;
    float: right;
	}

	.CustomerForm  .file-label .el-form-item__label{
		/*font-size: 16px;*/
		margin-bottom: 10px;
		display: inline-block;
		font-weight: bold;
	}

	.CustomerForm .el-form-item__content{text-align:left;}
	.CustomerForm .el-form-item {
    	margin-bottom: 0;
	}

	.CustomerForm .el-form-item__label{
		line-height: 16px
	}

	.CustomerForm .el-row{
		margin-bottom: 15px;
	}

	.CustomerForm .el-row.inner-row {
		margin-bottom: 0;
	}

	.CustomerForm .el-form-item__content{
		line-height: 30px;
	}
	.CustomerForm .el-form-item__label{
		float: none;
	}
</style>