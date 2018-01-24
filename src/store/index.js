// store.js
import Vue from 'vue'
import Vuex from 'vuex'

// 引入 axios
import axios from 'axios'
import router from '@/router'
import qs from 'qs'

Vue.use(Vuex)
 // var localhostStr='http://10.0.0.110:8080/wxmallPort'
 // var localhostStr='../'
 var localhostStr='http://wxmall.dealreal.com.cn/wxmallPort'
 

const store = new Vuex.Store({
	state:{
		localHostUrl: localhostStr,
		mallId: '123307710000000',
	},
	actions:{
	
	}	    

})

export default store