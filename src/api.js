import axios from 'axios';
import qs from 'qs';

function getParamValue(key,params){
	let value='';
	if (params[key]){
		value = params[key];
		delete params[key]
	}
	return value;
}

function responseFilter(response) {
    let {status, data} = response;
    if (status >= 200 && status < 300) {
        return data;
    }

    switch (status) {
        case 401: {
            //localStorage.removeItem("token");
            pageJump("/login");
            return;
        }
        default: {
            return Promise.reject(data.message);
        }
    }
}
