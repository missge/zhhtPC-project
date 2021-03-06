import axios from 'axios';
import qs from 'qs';
import URLSearchParams from 'url-search-params';//接口定义了一些实用的方法来处理 URL 的查询字符串。
export const setToken = 'setToken'

//使用base64和md5
let Base64 = require('js-base64').Base64
function getParamValue(key,params){
	let value='';
	if (params[key]){
		value = params[key];
		delete params[key]
	}
	return value;
}
function pageJump(url) {
    router.push({path: url});
}
//webpack.dev.conf.js修改url路径
// let base = SERVER_BASE_URL;
let base = 'http://wxmall.dealreal.com.cn/wxmallPort/'
// let base = 'http://10.0.0.21:8081/wxmallPort/'
// let base = 'http://10.0.0.37:8080/wxmallPort/'
export const localHostUrl='http://wxmall.dealreal.com.cn/wxmallPort/'
// export const localHostUrl='http://10.0.0.37:8080/wxmallPort/'

let loginInstance = axios.create({
    baseURL: base
});
//请求axios response返回来的数据
function responseFilter(response) {
    let {status, data} = response;
    if (status >= 200 && status < 300) {
        return data;
    }
    switch (status) {
        case 401: {
            // localStorage.removeItem("token");
            pageJump("/login");
            return ;
        }
        default: {
            //es6 promise---reject失败
            return Promise.reject(data.message);
        }
    }
}
//formData 拼接请求字符串类似于qs.stringify()
function formData(param) {
    const data = new URLSearchParams();
    for (let key in param) {
        data.append(key, param[key]);
        // console.log(param)
    }
    return data;
}


export const mallId ='123307710000000'
// 同下面
// axios.post(url,data,Json).then(
//     function (response) {
//         console.log(response)
//     }
// ).catch(function(error){
//     console.log(error)
// })
//退出清除token
 export const logon = params => {
    return axios.post(`${base}logon.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}
//是否存在token
 export const loginIntercept = params => {
    return axios.post(`${base}loginIntercept.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}
/***************************登录*********************************/
export const requestLogin = params => {
    return loginInstance.post(`${base}loginInfo.json`, formData(params)).then(responseFilter);

}
/***************************平台账单*****************************/
//查询数据
export const getOrderBillInfo = params => {
    // return axios.post(`${localHostUrl}orderBillInfo.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
    return loginInstance.post(`${base}orderBillInfo.json`, formData(params)).then(responseFilter);
};
//点击查看
export const ClickSee = params => {
    return loginInstance.post(`${base}getPactPic.json`,formData(params)).then(responseFilter);
};
//导出
// export const OrderBillInfoImport = params => {
//     return loginInstance.post(`${base}exportBill.json`,formData(params)).then(responseFilter);
// }
/***************************结算记录*****************************/
//结算记录列表
export const getMallSettInfo = params =>{
     return axios.post(`${base}mallSettInfo.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
}
// 获取下拉列表
export const getSelectList = params => {
    return loginInstance.post(`${base}getSelectList.json`,formData(params)).then(responseFilter);
}
//查看
export const getSettDetaills = params => {
    return loginInstance.post(`${base}mallSettDetails.json`,formData(params)).then(responseFilter);
}
//结算管理
export const getSettleManage = params => {
    return loginInstance.post(`${base}getBillBySettId.json`,formData(params)).then(responseFilter);
}
//撤销结算单
export const setCencelSett = params => {
    return loginInstance.post(`${base}cancelSett.json`,formData(params)).then(responseFilter);
}
/*************************系统维护***************************/
// 用户管理列表
export const getFindUserPost = params =>{
     return axios.post(`${base}findUserPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
}
//用户管理状态
export const UserSelectStatus = params => {
    return axios.post(`{base}`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
}
//用户管理添加
export const addUserList = params => {
    return axios.post(`${base}createUserPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
}
//用户修改列表获取数据
export const getChangeList = params => {
    return axios.post(`${base}editUser.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
} 
//用户修改保存
export const UserPostChange = params => {
    return axios.post(`${base}editUserPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
}
//用户删除
export const UserPostDelete = params =>{
    return axios.post(`${base}DeletUserPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
}
//用户初始化
export const UserPostInit = params =>{
    return axios.post(`${base}UserupPassPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
}
//用户添加获取数据
export const getLevelList = params => {
    return axios.post(`${base}createUsers.json`,qs.stringify(params),{emulateJSON:true})
} 
//用户添加数据
export const setAddSave = params => {
    return axios.post(`${base}createUserPost.json`,qs.stringify(params),{emulateJSON:true})
} 
//商户获取
export const getAllMerch = params => {
    return axios.post(`${base}getAllMerch.json`,qs.stringify(params),{emulateJSON:true})
} 
//角色修改获取数据
export const getRolePostChange = params => {
    return axios.post(`${base}editRoles.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
}
//角色管理修改
export const RolePostchange = params =>{
    return axios.post(`${base}editRolesPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
}
//角色列表
export const getRoleUserPost = params =>{
     return axios.post(`${base}findRolePost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter);
}
//操作日志
export const OperationLog = params => {
    return axios.post(`${base}findOperatorsPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}
//操作日志删除
export const OperationLogDelete = params => {
    return axios.post(`${base}deletOperatorsPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//功能日志
export const FunctionLog = params => {
    return axios.post(`${base}findFunctionsPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}
/*************************设置***************************/
//获取地区模板列表
export const getAreaTempList = params => {
    return axios.post(`${base}findAreaTemp.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//获取城市列表
export const getfindAreaCity = params => {
    return axios.post(`${base}findAreaCity.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//删除地区模板列表
export const delAreaTempList = params => {
    return axios.post(`${base}deletTemp.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//添加地区模板列表
export const addSaveTemp = params => {
    return axios.post(`${base}addSaveTemp.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//修改地区模板列表
export const editAreaTemp = params => {
    return axios.post(`${base}editAreaTemp.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}


//获取商户参数列表findMerParams
export const findMerParams = params => {
    return axios.post(`${base}findMerParams.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//商户参数添加
export const merParamsAddPost = params => {
    return axios.post(`${base}merParamsAddPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

/*************************会员***************************/
//获取会员信息列表
export const findMembersPost = params => {
    return axios.post(`${base}findMembersPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//批量导入会员
export const batchUploadMember = params => {
    return axios.post(`${base}batchUploadMember.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//会员信息详情
export const membersDetailPost = params => {
    return axios.post(`${base}membersDetailPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//饭卡明细
export const memMealCardDetail = params => {
    return axios.post(`${base}memMealCardDetail.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//会员信息设为餐厅/商户
export const memAddMerId = params => {
    return axios.post(`${base}memAddMerId.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

//发送站内信息
export const membersSendInfo = params => {
    return axios.post(`${base}membersSendInfo.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}

/*************************客户***************************/

//客户信息列表
export const findMerchPost = params => {
    return axios.post(`${base}findMerchPost.json`,qs.stringify(params),{emulateJSON:true}).then(responseFilter)
}