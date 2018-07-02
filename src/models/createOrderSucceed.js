import React from 'react'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { getSucceedAds, getUserOrder } from '../services/httpService'
import { routerReducer } from 'react-router-redux';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'createOrderSucceed',
  state: {
    adsData: [],
    showLoading: false,
    phoneNo: '',
    orderId: '',
  },
  reducers: {
    getSucceedAdsData(state, { payload }) {
      return {
        ...state,
        ...{ adsData: payload.data },
      }
    },
    showLoading(state) {
      return { ...state, ...{ menuLoading: true } }
    },
    hideLoading(state) {
      return { ...state, ...{ menuLoading: false } }
    },
    getPhoneNo(state, { payload }) {
      return {
        ...state,
        ...{ phoneNo: payload.phoneNo },
        ...{ orderId: payload.orderId },
      }
    },
  },
  effects: {
    *getSucceedAds({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { success, data } = yield call(getSucceedAds, payload)
      yield put({ type: 'hideLoading' })
      if (success) {
        yield put({
          type: 'getSucceedAdsData',
          payload: {
            data: data,
          },
        })
      }
    },
    *toDetail({ payload }, {call, put }) {
      const { data } = yield call(getUserOrder, { orderId: payload.orderId })
      if (data.orderStatusName === '待派单') {
        yield put(routerRedux.push(`/waiting-order-detail/${payload.orderId}`))
      } else if (data.orderStatusName !==undefined) {
        yield put(routerRedux.push(`/order-detail/${payload.orderId}`))
      }else{
        Toast.info('该订单已被取消')
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen((location) => {
        const match = (location.pathname).split('/')
        if (match[1] === 'create-order-succeed') {
          document.title = "预约成功"
          dispatch({
            type: 'getPhoneNo',
            payload: {
              phoneNo: decodeURI(match[2]),
              orderId: decodeURI(match[3]),
            },
          })
          dispatch({
            type: 'getSucceedAds',
            payload: {
              staticCity: '',
            },
          })
        }
      })
    }
  },
};
