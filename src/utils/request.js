import axios from 'axios'
import qs from 'qs'
import config, { CORS } from './config'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { Toast } from 'antd-mobile';
import Promise from 'es6-promise'

Promise.polyfill();
let token = ""
let phone = ""
const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options

  const cloneData = lodash.cloneDeep(data)

  if (!token) {
    let userStr = localStorage.getItem('token')
    let phoneStr = localStorage.getItem('phone')
    if(userStr){
      token = JSON.parse(userStr)
      phone = JSON.parse(phoneStr)
    }
  }

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)  // 路径转化为正则
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    Toast.fail(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  }
      
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
        headers: { token: token },
      })
    case 'post':
      return axios({
        method: 'post',
        url: url,
        data: cloneData,
        headers: { token: token },
      });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {
  if(options.clearToken){
    token = ""
    delete options.clearToken
  }
  
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS'
      } else {
        options.fetchType = 'JSONP'
      }
    }
  }

  return fetch(options).then((response) => {

    const { statusText, status } = response
    let data = response.data
    if (data.hasOwnProperty('code')) {
      if (data.code.toString() === '0') {
        // 成功
      } else if (data.code.toString() === '999') {
        // 认证失效，跳回登录页
        localStorage.removeItem('token')
        token = ''
        //window.router.replace('/login')
        if (location.hash){
          window.location.href = `#/login?from=${location.hash.replace('#','')}`
        }else{
          window.location.href = '#/login'
        }

        return { success: false, statusCode: 500, message: '' }
      } else {
        // 服务端错误
        Toast.fail(data.msg)
        return { success: false, statusCode: 500, message: data.msg }
      }
    }
    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return { success: false, statusCode, message: msg }
  })
}

export function clearToken () {
  if (token) {
    token = ''
    phone = ''
  }
}
