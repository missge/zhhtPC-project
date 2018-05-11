<template>
	 <div class="wrapper">
        <el-row class="container">
            <el-col :span="24" class="Login_header">  
                <div class="login_log">
                    <img src="./../assets/img/logon_log.png">
                </div>
            </el-col>
            <el-col :span="24" class="Login_main">
                <el-row class="Login_container">
                    <el-col :span="16">
                        <img  src="./../assets/img/logon_banner1.png" >
                    </el-col>
                     <el-col :span="8">
                        <div class="login-wrap">
                            <div class="ms-title">
                                 <img src="./../assets/img/logon.png" >
                            </div>
                            <div class="ms-login">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                                    <el-form-item prop="userName" class="login_right">
                                        <span class="login_icon">
                                             <img  src="../assets/img/logon_icon_1.png" >
                                        </span>
                                        <el-input v-model="ruleForm.userName" class="login_input" placeholder="userName"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="passWord"  class="login_right">
                                        <span class="login_icon">
                                             <img  src="./../assets/img/logon_icon_2.png" >
                                        </span>
                                        <el-input type="passWord" class="login_input"  placeholder="passWord" v-model="ruleForm.passWord" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                                    </el-form-item>
                                    <div class="nextLogin">
                                        <el-checkbox v-model="checked" checked>下次自动登录</el-checkbox>
                                    </div>
                                    <div class="login-btn">
                                        <el-button type="primary" @click="submitForm('ruleForm')" @keyup.enter.native="submitForm('ruleForm')">登录</el-button>
                                    </div>
                                    <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
                                </el-form>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
             <el-col :span="24" class="Login_footer">
              &copy; Copyright 2018北京中汇豪泰电子商务有限公司
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Vue from 'vue'
    import router from '@/router'
    // import md5 from 'js-md5'
    import { requestLogin } from "../api/api";
	export default{
		name: 'Login',
		data(){
            return {
                checked: false,
                ruleForm: {
                    userName: '',
                    passWord: '',
                    // age: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    passWord: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    // age: [
                    //     { validator: checkAge, trigger: 'blur' }
                    // ]
                },
                checked:true
               
            }
             // var checkAge = (rule, value, callback) => {
            //     if (!value) {
            //       return callback(new Error('年龄不能为空'));
            //     }
            //     setTimeout(() => {
            //       if (!Number.isInteger(value)) {
            //         callback(new Error('请输入数字值'));
            //       } else {
            //         if (value < 18) {
            //           callback(new Error('必须年满18岁'));
            //         } else {
            //           callback();
            //         }
            //       }
            //     }, 1000);
            //  };
               
        },
        methods: {
            submitForm(formName) {
                localStorage.setItem('token', 0);
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // this.ruleForm.password=md5(this.ruleForm.password)
                        this.loading=true
                        this.$router.push('/Home');
                        requestLogin(this.ruleForm).then((data) => {
                            console.log(data)
                            let token = data.token;
                           if(data.code==1){
                                localStorage.setItem('token', token);
                                this.$router.push('/Home');
                                localStorage.setItem('userName',this.ruleForm.userName);
                                localStorage.setItem("passWord", this.ruleForm.passWord);
                                
                            }else{
                                this.$confirm(data.descript, '提示', {
                                  confirmButtonText: '确定',
                                  cancelButtonText: '取消',
                                  type: 'warning'
                                }).then(() => {
                                    this.logining = false;
                                }).catch(() => {
                                    this.logining = false;
                                });
                           }

                        }).catch(message => {
                           this.$message.error("请求失败，请联系客服，失败码"+message);
                           this.loading=false
                        });
                        localStorage.setItem('ms_username',self.ruleForm.username);
                        console.log(localStorage.getItem('ms_username'))
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            login(){
                this.$store.state.setToken=true//改变token状态
                console.log(this.$store.state.setToken)
                let redirect = decodeURIComponent(this.$route.query.redirect || '/'); 
                this.$router.push({
                   path: redirect
                })
            }
        },
        mounted(){
        }
	}
</script>
<style scoped>
.wrapper{
      position: relative;
}
.Login_header {
    height: 130px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 100px;
    z-index: 1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /*border: 1px solid #ddd;*/
  }
.Login_main{
    display: block;
    margin-top: 130px;
   
}
.main_container{    width: 100%;
    height: 100%;
    position: fixed;}
.Login_footer{
     height: 25px;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0 20px;
    z-index: 1;
    box-sizing: border-box;
    /*background: #282828*/
    color:#92979B;
    font-size: 13px;
}
.login_log{text-align: left;margin-top: 30px;}
.Login_container{    
    width: 1160px;
    height: 450px;
    /*position: fixed;*/
    margin-bottom: 50px;
    /*padding: 0 100px;*/
    margin:0 auto;
     /*box-shadow: 0px 48px 0px -7px rgba(0, 0, 0, 0.8);*/
     box-shadow: 4px 4px 16px rgba(235,237,240,0.5), 4px 5px 20px #000
}
.login-wrap {
        background: #fff;
        height:450px;
    }
  /*  .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }*/
    .ms-title{
      /*  position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;*/
        padding: 60px 0 48px 0;

    }
    .ms-login{
       /* position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;*/
        padding:0 40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
/*    .ms-login .el-form-item{
        margin-bottom: 15px;
    }*/
    .nextLogin{
        text-align: left;
        /*margin-top: -5px;*/
        margin-bottom: 30px;
        
    }
  /*  .nextLogin .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #C0BFBF;
    }*/
    input{outline:none}
    .login-btn .el-button--primary{background: #036EB8}
    .ms-login .el-input{
            width: 80%;
    }
   .ms-login .login_right{
        line-height: 40px;
        position: relative;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 3px;
    }
    .ms-login  .login_icon{
        display: inline-block;
        width: 18%;
        border-right: 1px solid #ddd;
        /* border-right: none; */
        height: 40px;
    }
    .ms-login  .el-input {
    width: 80%;
    }
 
    .login_icon>img{vertical-align: middle;}
</style>