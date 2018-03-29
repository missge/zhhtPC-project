<template>
    <div class="wrapper">
        <el-row class="container" style="  position: absolute; top: 0px; bottom: 0px; width: 100%;">
            <el-col :span="24" class="header">  
                <el-row class="header_container">
                    <el-col :span="4" class="logo">
                        <img class="menu-img" src="../assets/img/logo.png" width="180px" height="50px" alt="">
                    </el-col>
                    <el-col :span="16" class="tools">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"   background-color="#fff" text-color="#666666"  active-text-color="#1c7ffd">
                           <template v-for="(items,parentIndex) in menuList">
                                <el-menu-item :index="parentIndex+''" >
                                    <!-- <span  v-for="(item,childIndex) in items.fatherModuleDTOs" :key="childIndex"> -->
                                     <!-- </span>  -->
                                     <span>
                                          {{items.name}} 
                                         
                                     </span>
                                </el-menu-item>
                            </template>
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
                        <el-menu   :default-active="activeIndex"  class="el-menu-vertical-demo" @open="handleOpen"  @close="handleClose"background-color="#132347" text-color="#999999" active-text-color="#ffffff" >
                          <template v-for="(items,parentIndex) in menuList">
                            <div v-for="(item,childIndex) in items.fatherModuleDTOs" >
                                <div v-for="(childItem,index) in item.childModuleDTOs" v-if="childItem.sid==item.id && items.id==idFlag">
                                    <router-link :class="'submenu-hook-'+childIndex+'-'+index"  @click.native="Go_fun(childItem.name)"  :to="childItem.linkAddr">
                                        <el-menu-item :index="childIndex+'-'+index+''" :key="index">
                                            <i class="el-icon-setting"></i>
                                            <span slot="title" >
                                                {{childItem.name}}
                                            </span>
                                        </el-menu-item> 
                                    </router-link>
                               </div>
                            </div>
                          </template>

                               <!--  <el-menu-item index="1">
                                  <i class="el-icon-setting"></i>
                                    <span slot="title">
                                        <router-link  @click.native="Go_fun('账户查询')"  to="/PlatformBill">
                                            平台账单
                                        </router-link>
                                    </span>
                                </el-menu-item>
                               <!--<el-menu-item index="2">
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
                                        <router-link  @click.native="Go_fun('角色管理')"  to="/RoleManagement">
                                             角色管理
                                        </router-link>
                                    </span>
                                </el-menu-item>
                                  <el-menu-item index="4">
                                  <i class="el-icon-menu"></i>
                                    <span slot="title">
                                        <router-link  @click.native="Go_fun('用户管理')"  to="/UserManagement">
                                             用户管理
                                        </router-link>
                                    </span>
                                </el-menu-item>
                                </el-menu-item>
                                  <el-menu-item index="5">
                                  <i class="el-icon-menu"></i>
                                    <span slot="title">
                                        <router-link  @click.native="Go_fun('操作日志')"  to="/OperationLog">
                                             操作日志
                                        </router-link>
                                    </span>
                                </el-menu-item>
                                </el-menu-item>
                                  <el-menu-item index="6">
                                  <i class="el-icon-menu"></i>
                                    <span slot="title">
                                        <router-link  @click.native="Go_fun('功能日志')"  to="/FunctionLog">
                                             功能日志
                                        </router-link>
                                    </span>
                                </el-menu-item> -->
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
import { logon ,requestLogin} from "../api/api";
export default {
  name: 'HelloWorld',
  data () {
      return {
        // tableData: Array(20).fill(item)
        activeIndex: '0',
        userName:'',
        ruleForm: {
            userName: localStorage.getItem('userName'),
            passWord: localStorage.getItem('passWord'),
        },
        menuList:[],
        idFlag:'',
        clickFlag:0
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
            let arr=[]
            this.menuList.forEach(function(items){
                items.fatherModuleDTOs.forEach(function(item,index){
                    // if(key=item){
                        arr.push(item.sid);
                    // }
                })
            })
            let that=this
            arr.forEach(function(arrItem,index){
                if(index==key){
                    console.log(arrItem)
                    that.idFlag=arrItem
                }
            })
        },
        onSubmit() {
            console.log('submit!');
        },
        Go_fun (str,fun_name) {
           this.clickFlag=1
        },
        getResource(){
            this.userName = localStorage.getItem("userName")
            requestLogin(this.ruleForm).then((data) => {
                 let token = data.token;
                console.log(data.data)
                this.menuList=data.data
                    //  初始化菜单，显示第一个
                  let arr=[]
                   this.menuList.forEach(function(items){
                        items.fatherModuleDTOs.forEach(function(item,index){
                             arr.push(item.sid);
                        })
                    })
                    let that=this
                    arr.forEach(function(arrItem,index){
                        if(index==0){
                            that.idFlag=arrItem
                        }
                    })
              }).catch(message => {
                 this.$message.error("请求失败，请联系客服，失败码"+message);
                 this.loading=false
              });

        },
        submitForm() {
           logon().then((data) => {
            if(data.code==1){
               this.$router.push('/');
                 localStorage.setItem('token', 0);
            }
          }).catch(message => {
            this.$message.error("请求失败，请联系客服，失败码"+message);
              this.loading=false
          });

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
      /*position: relative;*/
          position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
}
.header {
       height: 80px;
    /* position: absolute; */
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 20px;
    z-index: 1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
  }
.main{
      /* display: block; */
    /* margin-top: 80px; */
    /* position: absolute; */
    /* top: 80px; */
    /* background: #172850; */
    background: #324057;
    position: absolute;
    top: 80px;
    bottom: 0px;
    overflow: hidden;
}
.main_container{    width: 100%;
    height: 100%;
    /*position: fixed;*/
  }
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
 .main_left a {
    color: #999999;
}
.main_left .is-active [class^=submenu-hook-]{
    color:#fff;
}

</style>
