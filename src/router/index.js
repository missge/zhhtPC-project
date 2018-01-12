import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'

//对账结算
import SettleRecord from '@/components/checkAccount/SettleRecord'
import PlatformBill from '@/components/checkAccount/PlatformBill'

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/',
		name: 'Home',
		component: Home,
		children:[
			 {
		    	path: '/SettleRecord',
				name: '结算记录',
				component: SettleRecord,
		    },
		    {
		    	path: '/PlatformBill',
				name: '平台账单',
				component: PlatformBill,
		    }
		]
    },
	{
    	path: '/Login',
		name: '登录',
		component: Login,
    },


  ]
})
