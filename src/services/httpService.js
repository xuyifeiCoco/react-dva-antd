import { request, config } from '../utils'

const { api } = config
const { order, user, ads, hospital, servicePhone ,addService} = api

export async function sendPhoneCode(params) {
  return request({
    url: user.sendPhoneCode,
    method: 'post',
    data: params,
  })
}
export async function requestLogin(params) {
  return request({
    url: user.requestLogin,
    method: 'post',
    data: params,
  })
}
export async function getUserOrderList(params) {
  return request({
    url: order.getUserOrderList,
    method: 'post',
    data: params,
  })
}
export async function getUserOrder(params) {
  return request({
    url: order.getUserOrder,
    method: 'post',
    data: params,
  })
}
export async function createUserOrder(params) {
  return request({
    url: order.createUserOrder,
    method: 'post',
    data: params,
  })
}
export async function getAds(params) {
  return request({
    url: ads.getAds,
    method: 'post',
    data: params,
  })
}

export async function getHospital(params) {
  return request({
    url: hospital.hospitalList,
    method: 'post',
    data: params,
  })
}

//获取四级联动医院列表
export async function getSelectHospital(params) {
  return request({
    url: hospital.getSelectHospital,
    method: 'post',
    data: params,
  })
}

// 获取轮播图资源
export async function getCarousels(params) {
  return request({
    url: ads.getCarousels,
    method: 'post',
    data: params,
  })
}
//获取提交成功后的广告页
export async function getSucceedAds(params) {
  return request({
    url: ads.getSucceedAds,
    method: 'post',
    data: params,
  })
}

export async function getServicePhone(params) {
  return request({
    url: servicePhone.phone,
    method: 'post',
    data: params,
  })
}

//取消订单
export async function cancelOrder(params) {
  return request({
    url: order.cancelOrder,
    method: 'post',
    data: params,
  })
}

//获取首页营销位图资源
export async function getMenuAdsSources(params) {
  return request({
    url: ads.getMenuAdsSources,
    method: 'post',
    data: params,
  })
}

//个人中心获取手机号码
export async function getPersonalInfo(params) {
  return request({
    url: user.getPersonalInfo,
    method: 'post',
    data: params,
  })
}

//根据订单号获取订单状态
export async function getOrderStatus(params) {
  return request({
    url: order.getOrderStatus,
    method: 'post',
    data: params,
  })
}

//获取增值服务列表
export async function getIncreament(params) {
  return request({
    url: addService.increament,
    method: 'post',
    data: params,
  })
}