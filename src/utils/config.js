// const API = 'http://192.168.1.88:10002/care-management/app' // 测试环境地址
const API = 'http://180.76.174.246:10007/care-management/app' // 正式环境地址

const config = {
  name: '泰心康护运用户端',
  prefix: 'antdAdmin',
  footerText: '厦门蓝海健康大数据有限公司 © 2017',
  CORS: ['http://192.168.1.88:10002','http://192.168.1.145:10002','http://180.76.174.246:10007'],
  api: {
    user: {
      // 发送手机验证码
      sendPhoneCode: `${API}/user-patient/phonecode`,
      // 登陆
      requestLogin: `${API}/user-patient/login`,
      //个人中心获取手机号码
      getPersonalInfo: `${API}/user-patient/getUserPhone`,
    },
    order: {
      // 获得用户的所有订单列表
      getUserOrderList: `${API}/order/list`,
      // 获得用户订单详情
      getUserOrder: `${API}/order/query`,
      // 创建用户订单
      createUserOrder: `${API}/order/user/add`,
      //取消订单
      cancelOrder: `${API}/order/user/delete`,
      //根据id获取订单状态
      getOrderStatus: `${API}/order/queryStatus`,
    },
    ads: {
      // 获得广告位信息
      getAds: `${API}/advert/list`,
      // 获取轮播图资源
      getCarousels: `${API}/static/roll`,
      // 获取提交订单成功后的广告图
      getSucceedAds: `${API}/static/reservation/market`,
      //获取首页营销位资源
      getMenuAdsSources: `${API}/static/home/market`,
    },
    servicePhone: {
      // 获取联系客服的电话
      phone: `${API}/static/kfphone`,
    },
    hospital: {
      // 医院四级联动列表
      getSelectHospital: `${API}/hospital/linkage`,
      hospitalList: `${API}/static/hospital`,
    },
    addService: {
        increament:`${API}/static/increment/list`
    },
    globalData: {
      // 获得字典清单
      getDictList: `${API}/static/param`,
      // 获得城市列表
      getCities: `${API}/area/list`,
      // 获得医院、科室、楼号、楼层四级联动
      getHospitalDepartmentList: `${API}/static/hospital`,
    },
  },
}

export default config
