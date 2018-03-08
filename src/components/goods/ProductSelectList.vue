<template>
	<el-row class="container">
		<el-col :span='24' >
			<div role="alert" class="el-alert el-alert--warning">
		  		<i class="el-alert__icon el-icon-warning"></i>
				<div class="el-alert__content">
					本页展示商品均为{{name}}微信店铺内上架商品，企业如需将商品需要下架，请将商品选取后，提交系统客服进行下架处理。
				</div>
		    </div>
		</el-col>
		<el-col :span='24' >
			<el-row class="all-classify">
				<el-col :span='16' >
						<span class="">所有分类></span>
						<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" size="small"  @close="handleClose(tag)">
						  {{tag}}
						</el-tag>
						<span>共有1300件商品</span>
					</div>
				</el-col>
				<el-col :span='6' >
					<el-input size="mini" v-model="input" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span='2'>
					 <el-button type="primary" size="mini">查询</el-button>
				</el-col>
			</el-row>
		</el-col>
		<el-col :span='24' class="aboutClassify">
			相关分类：
			<el-tag size='medium'>一次性用品</el-tag>
			<el-tag size='medium'>一次性用品</el-tag>

		</el-col>
		<el-col :span='24' >
			<el-row class="all-classify-two">
				<el-col :span='8' class="all-classify-lf">
					<span class="BlueColor">默认排序</span>
					<span>价格最低</span>
					<span>价格最高</span>
				</el-col>
				<el-col :span='8' class="all-classify-ct">
					价格：
					<div class="xsmini-input" >
						<el-input  size='mini' v-model="input" placeholder="请输入内容"></el-input>
					</div> 元 -
					<div class="xsmini-input" >
					<el-input v-model="input" size='mini'  placeholder="请输入内容"></el-input> 
					</div> 元
					 <el-button type="primary" size="mini">确定</el-button>

				</el-col>
				<el-col :span='8' class="all-classify-rt">
					<i class="el-icon-arrow-left"></i>
					<span>3/21</span>
					<i class="el-icon-arrow-right"></i>
				</el-col>
			</el-row>
		</el-col>
		<el-col :span='24' class="listClassify">
			<el-row>
				<el-col :span="6">
				    <el-card :body-style="{ padding: '0px' }">
				      <img src="./../../assets/img/hamburger.png" class="listClassify-image">
				      <div style="padding: 14px;">
				        	<p class="listClassify-title">波司登棉衣男外套中长款棉</p>
					        <div class="listClassify-bottom clearfix">
					          <span class="RedColor">199.00-239.00</span>
					          <i class="el-icon-remove-outline"></i>
					        </div>
				       </div>
				    </el-card>
				</el-col>
				<el-col :span="6" >
				    <el-card :body-style="{ padding: '0px' }">
				      <img src="./../../assets/img/hamburger1.png" class="listClassify-image">
				      <div style="padding: 14px;">
				        	<p class="listClassify-title">波司登棉衣男外套中长款棉服2017秋冬新款连帽加厚棉袄韩版波司登棉衣男外套中长款棉服2017秋冬新款连帽加厚棉袄韩版</p>
					        <div class="listClassify-bottom clearfix">
					          <span class="RedColor">199.00-239.00</span>
					          <i class="el-icon-circle-plus-outline"></i>
					        </div>
				       </div>
				    </el-card>
				</el-col>
				<el-col :span="6" >
				    <el-card :body-style="{ padding: '0px' }">
				      <img src="./../../assets/img/hamburger1.png" class="listClassify-image">
				      <div style="padding: 14px;">
				        	<p class="listClassify-title">波司登棉衣男外套中长款棉服2017秋冬新款连帽加厚棉袄韩版波司登棉衣男外套中长款棉服2017秋冬新款连帽加厚棉袄韩版</p>
					        <div class="listClassify-bottom clearfix">
					          <span class="RedColor">199.00-239.00</span>
					          <i class="el-icon-circle-plus-outline"></i>
					        </div>
				       </div>
				    </el-card>
				</el-col>
				<el-col :span="6" >
				    <el-card :body-style="{ padding: '0px' }">
				      <img src="./../../assets/img/hamburger1.png" class="listClassify-image">
				      <div style="padding: 14px;">
				        	<p class="listClassify-title">波司登棉衣男外套中长款棉服2017秋冬新款连帽加厚棉袄韩版波司登棉衣男外套中长款棉服2017秋冬新款连帽加厚棉袄韩版</p>
					        <div class="listClassify-bottom clearfix">
					          <span class="RedColor">199.00-239.00</span>
					          <i class="el-icon-circle-plus-outline"></i>
					        </div>
				       </div>
				    </el-card>
				</el-col>

			</el-row>
		</el-col>
		<el-col :span='24' class="all-classify-page">
			  <el-pagination class="pagination "  background layout="prev, pager, next , jumper"  :current-page.sync="pageIndex" :total="1000" >
			  </el-pagination>
		</el-col>
		<el-col :span='24' class="all-classify-bottom">
			<el-row>
				<el-col :span="8" class="all-classify-bottom-lf">
					<span>选择本页全部商品</span>
				</el-col>
				<el-col :span="8" class="all-classify-bottom-ct">
					<span>已选择1件商品</span>
				</el-col>
				<el-col :span="8" class="all-classify-bottom-rt">
					 <el-button type="primary" size="mini">提交</el-button>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
	  
	  

</template>
<script>
	export default {
		data(){
			return {
				name:'xxx',
				dynamicTags: ['标签一'],
		        inputVisible: false,
		        inputValue: '',
		        input:1,
		        pageIndex:1
			}
		},
		methods:{
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},
		}
	}
</script>
<style>
/*	.all-classify{
		height: 40px;
		background: #fff;
		font-size: 14px;
	}*/
	.all-classify-two {background: #fff;padding:0 16px;font-size: 14px;height: 40px;}

	.aboutClassify{text-align: left; background: #fff;padding: 8px 16px;font-size: 14px;  border-bottom: 1px solid #ddd;}
	.all-classify-lf{
		text-align: left;
		margin-top: 10px;

	}
	.all-classify-lf>span{
		margin-right: 5px;cursor: pointer;
	}
	.all-classify-ct{padding:6px 0;}
	.xsmini-input{width: 50px;text-align: center;display:inline-block;}
	.all-classify-rt{
		text-align: right;
		padding-top: 12px;
	}
	.all-classify-rt>span{padding:0 8px;}
	.all-classify-rt .el-icon-arrow-left,	.all-classify-rt .el-icon-arrow-right{cursor: pointer;font-weight: bold}
	 .time {
	    font-size: 13px;
	    color: #999;
	  }
	  
	  .listClassify-bottom {
	    margin-top: 13px;
	    line-height: 12px;
	    position: relative;
	    text-align: left;
	  }
	  .listClassify-bottom .RedColor{
	  	/*text-align: left;
	  	float: left;*/
	  }
	  .listClassify-bottom .el-icon-circle-plus-outline ,.listClassify-bottom .el-icon-remove-outline{
	     padding: 0;
	    /* float: right; */
	    font-size: 25px;
	    font-weight: bold;
	    position: absolute;
	    right: 0;
	    top: -6px;
	  }

	  .image {
	    width: 100%;
	    display: block;
	  }

	  .clearfix:before,
	  .clearfix:after {
	      display: table;
	      content: "";
	  }
	  
	  .clearfix:after {
	      clear: both
	  }
	  .listClassify-image{
	  	max-width: 200px;
	    display: block;
	    height: 250px;
	    margin: 0 auto;
	  }
	  .listClassify>.el-row>.el-col{
	  	padding-top:5px;
	  }
	  .listClassify-title{
	  	font-size: 14px;
	    text-align: left;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	    overflow: hidden;
	    height: 38px;
	  }
	  .all-classify-page{
	  	background: #fff;padding-bottom: 20px;
	  }
	  .all-classify-bottom{
	  	height: 40px;
	  	background: #fff;
	  	border-top:1px solid #ddd;
	  }
	  .all-classify-bottom-lf, .all-classify-bottom-ct{
	  	line-height: 40px;
	  }
	   .all-classify-bottom-rt{
	   		padding-top: 4px;
	   }
</style>