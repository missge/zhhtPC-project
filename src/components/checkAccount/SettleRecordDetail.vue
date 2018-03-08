<template>
    <el-row>
        <el-col :span="24" >
            <el-card class="box-card resetbox-card" v-for="(items,key) in detailList" :key='key'>
                <div slot="header" class="clearfix">
                    <span>结算单状况 </span>   
                    <span class="GreenColor"><i class="el-icon-success"></i>已核销{{items.status}}</span>
                    <div class="box-card-rt" >流水号：{{items.settId}}   状态：{{items.statusDesc}} </div>
                </div>
                 <!-- <div v-for="o in items" :key="items" class="text item"> -->
                <div class="text item">
                    订单数： <span class="BlueColor" v-if="items.status==1||items.status==2||items.status==3||items.status==4" @click="pageJump()">{{items.ordersQty}} 条</span>
                     <span v-if="items.status==5||items.status==6" >{{items.ordersQty}}条</span>
                </div>
                <div class="text item">
                    本期销售总额：{{items.totalAmt}}元
                </div>
                 <div class="text item RedColor">
                   结算总金额：{{items.settAmt}}元
                </div>
            </el-card>
           
        </el-col>
        <el-col>
             <el-card class="box-card resetbox-card" v-for="(items,key) in detailList" :key='key'>
                <div slot="header" class="clearfix">
                    <span>发票信息（增值税专项发票）</span>
                </div>
                <div class="text item">开票金额：{{items.applyAmt}}元 </div>
                <div class="text item">本期销售总额：{{items.totalAmt}}元</div>
                 <div class="text item">快递公司：{{items.logistName}} </div>
                <div class="text item">物流单号：{{items.waybillNo}}  </div>
                <div class="text item">发票电子版：
                    <img v-for="(photoItem,index) in photoList" style="width50px;height:50px;" v-if="photoItem.photoType==0" :src="photoItem.photoUrl" @click="clickImg($event)">
                </div>
            </el-card>
        </el-col>
        <el-col>
             <el-card class="box-card resetbox-card" v-for="(items,key) in detailList" :key='key'>
                <div slot="header" class="clearfix">
                    <span>结算账户信息</span>
                </div>
                <div class="text item">账户名称：{{items.accountName}} </div>
                <div class="text item">开户行：{{items.bank}}</div>
                 <div class="text item">账号：{{items.accountNum}} </div>
            </el-card>
        </el-col>
        
        <el-col>
             <el-card class="box-card resetbox-card">
                <div slot="header" class="clearfix">
                    <span>付款凭证</span>
                </div>
                 <img v-for="(photoItem,index) in photoList" style="width50px;height:50px;" v-if="photoItem.photoType==1" :src="photoItem.photoUrl" @click="clickImg($event)">
                    <!-- <img style="width50px;height:50px;" src="./../../assets/img/test.jpg" @click="clickImg($event)"> -->
                   <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
    import vue from 'vue';
    import qs from 'qs';
    import router from '@/router'
    //点击图片变大
    import BigImg from './../publicCom/bigImg.vue';
    import {getSettDetaills} from "../../api/api";

	export default {
		name:'SettleRecordDetail',
        data(){
            return{
                showImg:false,
                imgSrc: '',
                settId:this.$route.query.settId,
                detailList:'',
                photoList:''
            }
        },
        components: {
            'big-img':BigImg
        },
        methods: {
            //点击图片变大
            clickImg(e) {
                this.showImg = true;
                // 获取当前图片地址
                this.imgSrc = e.currentTarget.src;
            },
            //图片显示
            viewImg(){
                this.showImg = false;
            },
            //查询信息
             getTablelist(){
                getSettDetaills({settId:this.settId}).then((data) => {
                  console.log(data)
                    this.detailList=data.data.settDetails
                     this.photoList=data.data.photo;
                }).catch(message => {
                    this.$message.error("请求失败，请联系客服，失败码"+message);
                    this.loading=false
                })
                
            },
            pageJump(){
                 // this.$router.push({path: "/PlatformBill"});
                 this.$router.push({path:'/SettleManage',query:{settId:this.settId}})
            }
        },
        mounted(){
            this.getTablelist()
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