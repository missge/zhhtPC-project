import axios from 'axios';
import qs from 'qs';
import URLSearchParams from 'url-search-params';//接口定义了一些实用的方法来处理 URL 的查询字符串。
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
            //localStorage.removeItem("token");
            // pageJump("/login");
            // return data;
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
export const localHostUrl='http://wxmall.dealreal.com.cn/wxmallPort/'
export const mallId ='123307710000000'
// 同下面
// axios.post(url,data,Json).then(
//     function (response) {
//         console.log(response)
//     }
// ).catch(function(error){
//     console.log(error)
// })
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
// 获取下拉列表
export const getSelectList = params => {
    return loginInstance.post(`${base}getSelectList.json`,formData(params)).then(responseFilter);
}