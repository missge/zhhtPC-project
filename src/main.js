// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.config.productionTip = false
axios.defaults.withCredentials=true
Vue.prototype.$axios = axios;
Vue.prototype.$http = axios
Vue.use(Vuex)
Vue.use(ElementUI)

// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//         if (store.state.token) {  // 通过vuex state获取当前的token是否存在
//             next();
//         }
//         else {
//             next({
//                 path: '/Login',
//                 query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//     }
//     else {
//         next();
//     }
// })


// router.beforeEach((to, from, next) => {
//     //NProgress.start();
//     // sessionStorage.removeItem('token');
//     // if (to.path == '/login') {

//     //     localStorage.removeItem('token');

//     // }
//     //let token = sessionStorage.getItem('token');

//    let token = localStorage.getItem('token');
//     if (!token) {
//         // 检测url里是否存在token
//         // let url = window.location.href;
//         // let index = url.search(/token/) + 6;
//         // if (index !== 5) {
//         //     console.log(index)
//         //     let str1 = url.substr(index);
//         //     let end = str1.search(/&/)
//         //     if (end !== -1) {
//         //         str1 = str1.substr(0, end)
//         //     }
//         //     token = str1
//             // window.localStorage.setItem('token', token);
//         // }
//     	// alert("1")

//     }
//     if (!token && to.path != '/Login') {
//     	   next({path: '/login'})
//     }
//     else{
//         next()	

//     }
    
// })
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  // template: '<App/>',
  // components: { App }
   render: h => h(App)
}).$mount('#app')

