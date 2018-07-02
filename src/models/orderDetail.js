

import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { getUserOrder } from '../services/httpService'
import { parseDate } from '../utils'
import { Toast } from 'antd-mobile'

export default {
  namespace: 'orderDetail',
  state: {
    id: 0,
    orderId: '',
    orderStatus: '',
    orderStatusName: '',
    time: '',
    showWorkers: false,
    patient: [],
    service: [],
    servicePay: [],
    workers: [],
    workerDetails: [],
    refund: [],
    haveRefund: false,
    refundActualAmount: 0,
    actualTotalPrice: 0,
    isLoading: false,
    receiptDetail: [],
    createTime: '',
    beginTime: '',
    endTime: '',
    hospitalPhone: '',
  },
  reducers: {
    showLoading(state) {
      return { ...state, ...{ isLoading: true } }
    },
    hideLoading(state) {
      return { ...state, ...{ isLoading: false } }
    },
    setOrder(state, { payload }) {
      
      const info = {};
      info.details = []
      info.isLoading = false
      info.orderId = payload.orderId
      info.createTime = payload.createTime
      info.orderStatus = payload.orderStatus
      info.orderStatusName = payload.orderStatusName
      //info.time = getDispTime(payload)
      info.time = payload.beginTime + payload.endTime
      info.timeStr = payload.timeStr

      info.patient = [{
        label: '患者',
        value: `${payload.patientName}  ${payload.sexName}`,
      }, {
        label: '联系方式',
        value: `${payload.contact}  ${payload.phone}`,
      }, {
        label: '医院',
        value: payload.hospitalName,
      }]

      info.details = []
      payload.orderDetail.map((item) => {
        const detail = [{
          label: '明细信息',
          value: `${item.timeStr}`,
        }, {
          label: '科室',
          value: `${item.sickRoomInfo.buildingNumberName} - ${item.sickRoomInfo.floorName} - ${item.sickRoomInfo.departmentName}`,
        }, {
          label: '服务类型',
          value: item.workerInfo.serviceTypeName,
        }, {
          label: '护工/小组',
          value: item.workerInfo.workers.map(w => w.workerName).join(' / '),
        }, {
          label: '服务时间',
          value: `${item.beginTime}至${item.endTime}`,
        }]
        info.details.push(detail)
      })
      info.payStatusName = payload.payStatusName
      info.payStatus = payload.payStatus
      info.receiptDetail = payload.receiptDetail
      info.hospitalPhone = payload.hospitalPhone
      return { ...state, ...info }
    },
  },
  effects: {
    *getOrder({ payload }, { call, put, select }) {
      const state = yield select(s => s.orderDetail);
      if (state.isLoading) {
        return;
      }
      yield put({ type: 'showLoading' })
      const data = yield call(getUserOrder, {
        orderId: payload,
      })
      if (data.success) {
        yield put({ type: 'setOrder', payload: data.data })
      }
      yield put({ type: 'hideLoading' })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/order-detail/:orderId').exec(location.pathname)
        if (match) {
          document.title = "订单详情";
          dispatch({
            type: 'getOrder',
            payload: decodeURI(match[1]),
          })
        }
      })
    },
  },
};
