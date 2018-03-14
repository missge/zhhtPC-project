<template>
	<div>
		<div class="FormFile">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				  <el-form-item label="登录名" prop="name">
				 	 <el-input v-model="ruleForm.name" readonly></el-input>
				  </el-form-item>
				  <el-form-item label="真实姓名" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="用户级别" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="运营商"></el-radio>
				      <el-radio label="供应商"></el-radio>
				      <el-radio label="餐厅"></el-radio>
				      <el-radio label="商城"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="商户" prop="region">
				    <el-select v-model="ruleForm.region" placeholder="请选择商户">
				      <el-option label="区域一" value="shanghai"></el-option>
				      <el-option label="区域二" value="beijing"></el-option>
				    </el-select>
				  </el-form-item>
	  			 <el-form-item label="联系电话" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="状态" prop="region">
				    <el-select v-model="ruleForm.region" placeholder="请选择商户">
				      <el-option label="区域一" value="shanghai"></el-option>
				      <el-option label="区域二" value="beijing"></el-option>
				    </el-select>
				  </el-form-item>
				 <el-form-item label="角色" prop="type">
				    <el-checkbox-group v-model="ruleForm.type">
				      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
				      <el-checkbox label="地推活动" name="type"></el-checkbox>
				      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
				      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
				    </el-checkbox-group>
				  </el-form-item>
				  <el-form-item label="开始和结束时间" required>
				    <el-col :span="11">
				      <el-form-item prop="date1">
				        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
				      </el-form-item>
				    </el-col>
				    <el-col class="line" :span="2">-</el-col>
				    <el-col :span="11">
				      <el-form-item prop="date2">
				        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
				      </el-form-item>
				    </el-col>
				  </el-form-item>
				 <el-form-item label="密码错误次数" prop="name">
				 	 <el-input v-model="ruleForm.name" readonly></el-input>
				  </el-form-item>
				 <el-form-item label="最后登录时间" prop="name">
				 	 <el-input v-model="ruleForm.name" readonly></el-input>
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
	 export default {
	    data() {
	      return {
	        ruleForm: {
	          name: '',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: ''
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
	      }
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