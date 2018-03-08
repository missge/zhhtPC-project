<template>
    <div class="wrapper">
        <el-row class="container">
            <el-col :span="24" class="header">  
                <el-row class="header_container">
                    <el-col :span="4" class="logo">
                        <img class="menu-img" src="../assets/img/logo.png" width="180px" height="50px" alt="">
                    </el-col>
                    <el-col :span="16" class="tools">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"   background-color="#fff" text-color="#666666"  active-text-color="#1c7ffd">
                            <el-menu-item index="1" >对账结算</el-menu-item>
                           <!--  <el-menu-item index="2">
                                 订单管理
                            </el-menu-item>
                            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">客户管理</a></el-menu-item> -->
                        </el-menu>
                    </el-col>
                    <el-col :span="4" class="userinfo">
                       <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"   background-color="#fff" text-color="#666666"  active-text-color="#1c7ffd">
                            <el-submenu index="1">
                                <template slot="title">{{userName}}</template>
                            <!--     <el-menu-item index="2-1">返回主页</el-menu-item>
                                <el-menu-item  index="2-2">用户设置</el-menu-item> -->
                                <el-menu-item  @click="submitForm()" index="2-3">安全退出</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24" class="main">
                <el-row class="main_container">
                    <el-col :span="4" class="main_left">
                        <el-menu   default-active="1"  class="el-menu-vertical-demo" @open="handleOpen"  @close="handleClose"
                            background-color="#132347" text-color="#fff" active-text-color="#fff" >
                           <!--  <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>对账结算</span>
                                </template>
                                <el-menu-item-group>
                                   <router-link  @click.native="Go_fun('账户查询')"  to="/PlatformBill">
                                        <el-menu-item index="1-1"> 
                                            平台账单
                                        </el-menu-item>
                                    </router-link>
                                    <router-link  @click.native="Go_fun('结算记录')"  to="/SettleRecord">
                                        <el-menu-item index="1-2">
                                            结算记录 
                                        </el-menu-item>
                                    </router-link>
                                     <router-link  @click.native="Go_fun('结算记录详情')"  to="/SettleRecordDetail">
                                        <el-menu-item index="1-3">
                                            结算记录详情 
                                        </el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu> -->
                            <el-menu-item index="1">
                              <i class="el-icon-setting"></i>
                                <span slot="title">
                                    <router-link  @click.native="Go_fun('账户查询')"  to="/PlatformBill">
                                        平台账单
                                    </router-link>
                                </span>
                            </el-menu-item>
                            <el-menu-item index="2">
                              <i class="el-icon-menu"></i>
                                <span slot="title">
                                    <router-link  @click.native="Go_fun('结算记录')"  to="/SettleRecord">
                                         结算记录
                                    </router-link>
                                </span>
                            </el-menu-item>
                             <el-menu-item index="3">
                              <i class="el-icon-menu"></i>
                                <span slot="title">
                                    <router-link  @click.native="Go_fun('选品')"  to="/ProductSelectList">
                                         商品选择
                                    </router-link>
                                </span>
                            </el-menu-item>
                           <!--  <el-menu-item index="3">
                              <i class="el-icon-setting"></i>
                                <span slot="title">
                                    <router-link  @click.native="Go_fun('结算记录详情')"  to="/SettleRecordDetail">
                                       结算记录详情
                                    </router-link>
                                </span>
                            </el-menu-item> -->
                          </el-menu>

                    </el-col>
                    <el-col :span="20" class="main_right content">
              <!--           <el-breadcrumb separator="/" >
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                        </el-breadcrumb> -->
                         <router-view></router-view>
                
                  

                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'HelloWorld',
  data () {
     // const item = {
     //    date: '2016-05-02',
     //    name: '王小虎',
     //    address: '上海市普陀区金沙江路 1518 弄'
     //  };
      return {
        // tableData: Array(20).fill(item)
        activeIndex: '1',
        userName:''
     
      }
  },
  methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //点击header
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        onSubmit() {
            console.log('submit!');
        },
        Go_fun (str,fun_name) {
           
        },
        getResource(){
            console.log(localStorage.getItem("userName"))
            this.userName = localStorage.getItem("userName")
        },
        submitForm() {
           this.$router.push('/');
        

        }
  },
  mounted(){
       this.getResource()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
      position: relative;
}
.header {
    height: 80px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 20px;
    z-index: 1;
    box-sizing: border-box;
    background: #fff
  }
.main{
    display: block;
    margin-top: 80px;
}
.main_container{    width: 100%;
    height: 100%;
    position: fixed;}
.main_left,.main_right {
    height: 100%;
}
.main_left .router-link-active,.main_left a{color: #fff}
.main_left{
  background: #172850;
}


.main_left .el-menu li{text-align: left;}
.tools>ul>li,.userinfo{
 margin-top:10px;
}
.tools>ul>li:hover{background: none}
.logo{text-align: left;}
.menu-img{margin-top:15px;}
.content{padding: 25px;}


.main_right{
  overflow: scroll;
  padding-bottom: 60px;
  background: #EEEEEE;

}
</style>
