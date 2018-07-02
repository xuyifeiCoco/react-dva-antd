const { config } = require('./common')
const CITIES = require('./data/city')
const { LoginUsers, Users } = require('./data/user')
const orders = require('./data/order')
const hospitalList = require('./data/hospital')
const DICTS = require('./data/dict')
const departments = require('./data/department')
const singleservice = require('./data/singleService')

const _Users = Users
const _Orders = orders
const _Dicts = DICTS
const _Cities = CITIES
const _HospitalList = hospitalList
const _Departments = departments
const _SingleService = singleservice

module.exports = {

  [`POST ${config.api.user.sendPhoneCode}`](req, res) {
    console.log(req.url, req.body)
    const { phone, phoneCode } = req.body;
    setTimeout(() => {
      res.status(200).json({
        data: {},
        code: 11,
        msg: '验证码发送失败',
      })
    }, 2000)
  },

  [`POST ${config.api.user.requestLogin}`](req, res) {
    console.log(req.url, req.body)
    setTimeout(() => {
      res.status(200).json({
        data: LoginUsers[0],
        code: 0,
      })
    }, 2000)
  },

  [`POST ${config.api.order.getUserOrderList}`](req, res) {
    console.log(req.url, req.body)

    let { page, pageSize } = req.body

    pageSize = Number(pageSize) || 10
    page = Number(page) || 1

    let mockOrders = _Orders
    mockOrders = mockOrders.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1))

    setTimeout(() => {
      res.status(200).json({
        code: 0,
        data: mockOrders,
      })
    }, 2000)
  },

  [`POST ${config.api.order.getUserOrder}`](req, res) {
    console.log(req.url, req.body)
    const { orderId } = req.body
    let mockData = _Orders.find((item) => {
      return item.orderId == orderId
    })
    if (!mockData) mockData = _Orders[0]

    setTimeout(() => {
      res.status(200).json({
        data: mockData,
        code: 0,
      })
    }, 2000)
  },

  [`POST ${config.api.order.createUserOrder}`](req, res) {
    console.log(req.url, req.body)
    _Orders.unshift(req.body)
    setTimeout(() => {
      res.status(200).json({
        data: {},
        code: 0,
      })
    }, 2000)
  },

  [`POST ${config.api.ads.getAds}`](req, res) {
    console.log(req.url, req.body)
    setTimeout(() => {
      res.status(200).json({
        data: [{
          img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
          link: 'http://www.sohu.com',
        }, {
          img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
          link: 'http://www.sina.com',
        }],
        code: 0,
      })
    }, 2000)
  },

  [`POST ${config.api.globalData.getCities}`](req, res) {
    console.log(req.url, req.body)
    setTimeout(() => {
      res.status(200).json({
        data: _Cities,
        code: 0,
      })
    }, 2000)
  },

  [`POST ${config.api.globalData.getDictList}`](req, res) {
    console.log(req.url, req.body)
    setTimeout(() => {
      res.status(200).json({
        data: _Dicts,
        code: 0,
      })
    }, 2000)
  },

  [`POST ${config.api.globalData.getHospitalDepartmentList}`](req, res) {
    console.log(req.url, req.body)
    setTimeout(() => {
      res.status(200).json({
        data: _Departments,
        code: 0,
      })
    }, 2000)
  },

  [`POST ${config.api.hospital.hospitalList}`](req, res) {
    // console.log(req.url, req.body)

    let { page, pageSize } = req.body

    pageSize = Number(pageSize) || 10
    page = Number(page) || 1

    let mockService = _SingleService
    mockService = mockService.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1))

    setTimeout(() => {
      res.status(200).json({
        data: {
          list: mockService,
          pageInfo: {
            total: _SingleService.length,
          },
        },
        code: 0,
      })
    }, 2000)
  },

}
