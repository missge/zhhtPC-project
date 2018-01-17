<template>
    <el-row>
        <el-col :span="24" >
            <el-card class="box-card resetbox-card">
                <div slot="header" class="clearfix">
                    <span>结算单状况 </span>   
                    <span class="RedColor"><i class="el-icon-success"></i>已核销</span>
                    <div class="box-card-rt" >流水号：js9028098309485098304  状态：待付款</div>
                </div>
                 <!-- <div v-for="o in items" :key="items" class="text item"> -->
                <div class="text item">
                    订单数： <a href="" class="BlueColor">215 条</a>
                </div>
                <div class="text item">
                    本期销售总额：18393.68元
                </div>
                 <div class="text item RedColor">
                   结算总金额：16221.08元
                </div>
            </el-card>
           
        </el-col>
        <el-col>
             <el-card class="box-card resetbox-card">
                <div slot="header" class="clearfix">
                    <span>发票信息（增值税专项发票）</span>
                </div>
                <div class="text item">开票金额：60.00元 </div>
                <div class="text item">本期销售总额：18393.68元</div>
                 <div class="text item">  快递公司：顺丰快递 </div>
                <div class="text item">物流单号：435343  </div>
                <div class="text item">发票电子版</div>
            </el-card>
        </el-col>
        <el-col>
             <el-card class="box-card resetbox-card">
                <div slot="header" class="clearfix">
                    <span>结算账户信息</span>
                </div>
                <div class="text item">账户名称：534534 </div>
                <div class="text item">开户行：534534</div>
                 <div class="text item">  账号：534534 </div>
            </el-card>
        </el-col>
         <el-col>
             <el-card class="box-card resetbox-card">
                <div slot="header" class="clearfix">
                    <span>结算账户信息</span>
                </div>
                <div class="text item">账户名称：534534 </div>
                <div class="text item">开户行：534534</div>
                 <div class="text item">  账号：534534 </div>
            </el-card>
        </el-col>
        <el-col>
             <el-card class="box-card resetbox-card">
                <div slot="header" class="clearfix">
                    <span>付款凭证</span>
                </div>
                     <img style="width50px;height:50px;" src="./../../assets/img/test.jpg" @click="clickImg($event)">
                   <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
                
            </el-card>
        </el-col>
    </el-row>
    
</template>
<script>
    import BigImg from './../publicCom/bigImg.vue';
	export default {
		name:'SettleRecordDetail',
        data(){
          return{
                showImg:false,
                imgSrc: './../../assets/img/test.png'
          }
        },
        components: {
            'big-img':BigImg
        },
        methods: {
            clickImg(e) {
                this.showImg = true;
                // 获取当前图片地址
                this.imgSrc = e.currentTarget.src;
            },
            viewImg(){
                this.showImg = false;
            },
        }
	}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
   	text-align: left;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }


  .resetbox-card{
  	width: 100%;
  	margin-bottom:20px;
  }
  .box-card .clearfix{
  	text-align: left;
  }
  .box-card-rt{
 	float:right; padding: 3px 0;
 	font-size: 14px;
   }
</style>