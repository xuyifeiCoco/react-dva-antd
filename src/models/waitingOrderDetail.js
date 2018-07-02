

import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { getUserOrder, cancelOrder } from '../services/httpService'
import { parseDate } from '../utils'
import { Toast } from 'antd-mobile'

export default {
  namespace: 'waitingOrderDetail',
  state: {
    id: 0,
    orderId: '',
    createTime: '',
    orderStatusName: '',
    patientName: '',
    sexName: '',
    phone: '',
    contact: '',
    hospitalName: '',
    orderDetail: [],
    patientRemark: '',
    isLoading: false,
    isData: false,
    loginPhone: '',
    hospitalPhone:'' // 工作人员联系电话
  },
  reducers: {
    showLoading(state) {
      return { ...state, ...{ isLoading: true } }
    },
    hideLoading(state) {
      return { ...state, ...{ isLoading: false } }
    },
    showHintInfo(state) {
      return { ...state, ...{ isData: true } }
    },
    setOrder(state, { payload }) {
      return {
        ...state,
        ...{ orderId: payload.orderId },
        ...{ createTime: payload.createTime },
        ...{ orderStatusName: payload.orderStatusName },
        ...{ patientName: payload.patientName },
        ...{ sexName: payload.sexName },
        ...{ phone: payload.phone },
        ...{ contact: payload.contact },
        ...{ hospitalName: payload.hospitalName },
        ...{ orderDetail: payload.orderDetail },
        ...{ loginPhone: payload.loginPhone },
        ...{ patientRemark: payload.patientRemark },
        ...{ payStatusName: payload.payStatusName },
        hospitalPhone: payload.hospitalPhone
      }
    },
  },
  effects: {
    *getUserOrder({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const { data, success } = yield call(getUserOrder, {
        orderId: payload,
      })
      function isEmptyObject(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
      }
      if (isEmptyObject(data)) {
        yield put({ type: 'showHintInfo' })
        return;
      }
      if (success) {
        yield put({ type: 'setOrder', payload: data })
      }
      yield put({ type: 'hideLoading' })
    },
    *cancelOrder({ payload }, { call,put }) {
      
      yield put({ type: 'showLoading' })
      const { data, msg } = yield call(cancelOrder, { orderId: payload.orderId })
      if(msg === 'SUCCESS') {
        Toast.info('已成功取消订单')
        yield put(routerRedux.push(`/order-list`));
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/waiting-order-detail/:orderId').exec(location.pathname)
        if (match) {
          document.title = "订单详情";
          dispatch({
            type: 'getUserOrder',
            payload: decodeURI(match[1]),
          })
        }
      })
    },
  },
};
