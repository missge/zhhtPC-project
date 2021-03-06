import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
// 公共组件
import bigImg from '@/components/publicCom/bigImg'

//对账结算
import SettleRecord from '@/components/checkAccount/SettleRecord'
import PlatformBill from '@/components/checkAccount/PlatformBill'
import SettleRecordDetail from '@/components/checkAccount/SettleRecordDetail'
import SettleManage from '@/components/checkAccount/SettleManage'

//选品列表
import ProductSelectList from '@/components/goods/ProductSelectList'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/Home',
		name: '主页',
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
		    },{
		    	path: '/SettleRecordDetail',
		    	name: '结算详情',
				component: SettleRecordDetail,
		    },
		    {
		    	path:'/SettleManage',
		    	name:'结算管理',
		    	component:SettleManage,
		    },
		    {
		    	path: '/ProductSelectList',
				name: '选品列表',
				component: ProductSelectList,
		    },

		   
		]
    },
	{
    	path: '/',
		name: '登录',
		component: Login,
    },
     {
    	path:'/bigImg',
    	name: '结算记录',
		component: bigImg
    },{
    	path:'/test',
    	name: '测试',
		component: test
    }



  ]
})
