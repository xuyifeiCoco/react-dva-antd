import React from 'react'
import { routerRedux } from 'dva/router'
import { getCarousels, getMenuAdsSources } from '../services/httpService'


export default {
  namespace: 'menuIndex',
  state: {
    imgHeight: '',
    menuLoading: false,
    carouselData: [],
    gridData: [
      {
        icon: require('../assets/close.png'),
        text: '医院护理',
      },
      {
        icon: require('../assets/month.png'),
        text: '居家护理',
      },
      {
        icon: require('../assets/many.png'),
        text: '增值服务',
      },
      {
        icon: require('../assets/fast.png'),
        text: '快速预约',
      },
    ],
    marketingData: [
      {
        icon: require('../assets/hospital.png'),
      },
      {
        icon: require('../assets/caremall.png'),
      },
    ],
    transferData: [],
  },
  reducers: {
    setImgHeight(state) {
      return {
        ...state,
        ...{ imgHeight: 'auto' },
      }
    },
    getCarouselsData(state, { payload }) {
      return {
        ...state,
        ...{ carouselData: payload.data },
      }
    },
    getTransferData(state, { payload }) {
      return {
        ...state,
        ...{ transferData: payload },
      }
    },
    showLoading(state) {
      return { ...state, ...{ menuLoading: true } }
    },
    hideLoading(state) {
      return { ...state, ...{ menuLoading: false } }
    },
  },
  effects: {
    *getCarousels({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { success, data } = yield call(getCarousels, payload)
      yield put({ type: 'hideLoading' })
      if (success) {
        yield put({
          type: 'getCarouselsData',
          payload: {
            data: data,
          }
        })
      }
    },
    *getMenuAdsSources({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { success, data } = yield call(getMenuAdsSources, payload)
      const changedData = data.map((val) => {
        val.icon = val.staticPig
        return val
      })
      const repaire = {
        icon: require('../assets/white.png'),
      }
      if (changedData.length % 2 !== 0) {
        changedData.push(repaire)
      }
      if (success) {
        yield put({
          type: 'getTransferData',
          payload: changedData,
        })
      }
    },
    *toServicePage({ payload }, { put }) {
      yield put(routerRedux.push(`/service-process?type=${payload.type}`));
    },
    *toCreatePage({ payload }, { put }) {
      yield put(routerRedux.push('/create-order/0/0'))
    },
    *toHospitalList({ payload }, { put }) {
      yield put(routerRedux.push('./hospital-list'))
    },
    *toGoldenCare({ payload }, { put }) {
      yield put(routerRedux.push('./attendant-detail'))
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen((location) => {
        if (location.pathname === '/menu-index' || location.pathname === '/') {
          document.title = "陪你康复";
          dispatch({
            type: 'getCarousels',
            payload: {
              staticCity: '',
            },  
          })
          dispatch({
            type: 'getMenuAdsSources',
            payload: {
              staticCity: '',
            },
          })
        }
      })
    },
  },
};
