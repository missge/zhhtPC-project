<template>
  <div id="app">
		<transition name="fade"  >
			 <router-view/>
	    </transition>
  
  </div>
</template>

<script>
import { loginIntercept } from "./api/api";
export default {
  name: 'app',
  methods:{
     init(){
        loginIntercept().then((data) => {
           let token = data.token
            localStorage.setItem('token',token);
        }).catch(message => {
          this.$message.error("请求失败，请联系客服，失败码"+message);
            this.loading=false
        });
     }
  },
  mounted(){
    this.init()
  }
}
</script>

<style>
/*@import 'assets/theme/theme-darkblue/index.css';*/
@import 'assets/reset.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
.app-index-custom {
    background-color: #FFF!important;
    border:0px!important;
    border-radius:0px!important;
    overflow: visible;
    display: list-item!important;
    line-height:normal;
}
</style>
