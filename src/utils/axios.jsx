import { message } from "antd"
import axios from "axios"

const locationOri = window.location.origin
const root = `${locationOri}:3001`

function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

axios.interceptors.request.use(function (request) {
    const userToken =  localStorage.getItem("_usertoken") || undefined
    if (userToken && request.method === "post") {
        if (!request.data) request.data = {}
        request.data.token = userToken
    }
    if (userToken && request.method === "get") {
        if (!request.params) request.params = {}
        request.params.token = userToken
    }
    return request;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

// 参数过滤函数
function filterNull (o) {
    for (var k in o) {
        console.log(k)
        if (o[k] === null || o[k] === undefined) {
            delete o[k]
        }
        o[k] = toType(o[k]) === 'string' ? o[k].trim() : o[k]
        o[k] = ['object', 'array'].includes(toType(o[k])) ? filterNull(o[k]) : o[k]
    }
    return o
}

async function apiAxios (method, url, params) {
    if (params) {
        params = filterNull(params)
    }
    try {
        const responseData = await axios({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            baseURL: root,
            withCredentials: true
        })
        if (responseData.code === 200) {
            responseData.message && message.success({
                content: responseData.message,
                duration: 0.5
            })
            return responseData.data
        } else {
            responseData.message && message.error(responseData.message)
            return Promise.reject(responseData)
        }
    } catch (error) {
        console.log(error)
    }

}

export default {
    get: function (url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
        return apiAxios('POST', url, params, success, failure)
    },
    put: function (url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    }
}
