
import { getSelectHospital, createUserOrder } from '../services/httpService'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { parseDate } from '../utils'
import { Toast } from 'antd-mobile'
import { getHospitalDepartmentList as query, getDict } from '../services/globalData'

export default {
  namespace: 'createOrder',
  state: {
    patientName: '',
    sex: '',
    sexData: [{
      label: '男',
      value: '1',
    }, {
      label: '女',
      value: '2',
    }],
    serviceScene: [
      {
        label: '医院外(适合居家患者)',
        value: '001',
      }, {
        label: '医院内(适合住院患者)',
        value: '002',
      },
    ],
    cols: 1,
    phone: '',
    linkman: '',
    hospital: '',
    section: '',
    bedNum: '',
    showParam: true,
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()),
    remarks: '',
    hosData: [],
    initHospital: [],
    tripleSelectData: [],
    serviceType: [],
    initServiceType: [],
    showSubmitLoading: false,

  },
  reducers: {
    hospitalSelectList(state, { payload }) {
      const { data, initHospital } = payload;
      return {
        ...state,
        ...{ hosData: data },
        ...{ initHospital: initHospital },
      }
    },
    // 服务类型
    serviceTypeList(state, { payload }) {
      const data = payload.data
      return {
        ...state,
        ...{ serviceType: data },
      }
    },
    // 医院三级联动
    tripleSelect(state, { payload }) {
      const defaultHospital = payload.id
      const tripleSelectData = payload.data
      return { ...state, ...{ tripleSelectData }, ...{ initHospital: defaultHospital } }
    },
    // 服务场景
    reviseServiceScene(state, { payload }) {
      const id = payload.data
      if (id === '001') {
        return {
          ...state,
          ...{ showParam: false },
        }
      } else {
        return {
          ...state,
          ...{ showParam: true },
        }
      }
    },
    //设置默认服务类型
    setDefaultServiceType(state, { payload }) {
      const defaultType = payload.serviceType
      return {
        ...state,
        ...{ initServiceType: defaultType },
      }
    },
    setStartTime(state, { payload }) {
      return {
        ...state,
        ...{ startTime: payload.startTime },
      }
    },
    showLoading(state) {
      return { ...state, ...{ showSubmitLoading: true } }
    },
    hideLoading(state) {
      return { ...state, ...{ showSubmitLoading: false } }
    },
  },
  effects: {
    *queryHospitalList({ payload }, { call, put }) {
      const { success, data } = yield call(getSelectHospital)
      if (!success) return
      let defaultHospital = []
      defaultHospital = payload !== '0' ? payload.split(',') : []

      // 遍历医院
      function setLabel(obj) {
        obj.label = obj.name
        if (obj.hasOwnProperty('children') && obj.children !== null) {
          for (const result of obj.children) {
            setLabel(result)
          }
        }
      }
      data.map((val) => {
        return setLabel(val)
      })
      yield put({
        type: 'hospitalSelectList',
        payload: {
          data,
          initHospital: defaultHospital,
        },
      })
      let tripleSelectData = []
      for (const result of data) {
        if ( payload === result.value) {
          tripleSelectData = result.children
        }
      }

      yield put({
        type: 'tripleSelect',
        payload: {
          id: defaultHospital,
          data: tripleSelectData,
        },
      })
    },
    *setTripleSelect({ payload }, { put }) {
      let defaultHospital = []
      defaultHospital = payload.id !== '0' ? payload.id.split(',') : []
      let tripleSelectData = []
      for (const result of payload.data) {
        if ( payload.id === result.value) {
          tripleSelectData = result.children
        }
      }
      yield put({
        type: 'tripleSelect',
        payload: {
          id: defaultHospital,
          data: tripleSelectData,
        },
      })
    },

    *getServiceType({ payload }, { call, put }) {
      const { data } = yield call(getDict, payload.type)
      if (data.items.length > 0) {
        for (const obj of data.items) {
          obj.label = obj.name
        }
        yield put({
          type: 'serviceTypeList',
          payload: {
            data: data.items,
          },
        })
      }
    },
    *getInitServiceType({ payload }, { put }) {
      const initType = payload.serviceType
      let defaultType = []
      defaultType = initType !== '0' ? initType.split(',') : ['1']
      yield put({
        type: 'setDefaultServiceType',
        payload: {
          serviceType: defaultType,
        },
      })
    },
    *sumbit({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { success, data } = yield call(createUserOrder, payload);
      yield put({ type: 'hideLoading' });
      if (success) {
        Toast.success('提交成功');
        yield put(routerRedux.push(`/create-order-succeed/${data.phone}/${data.orderId}`));
      } 
    },
    *toLogin({ payload },{ put }) {
      yield put(routerRedux.push('/login'))
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {  
      history.listen((location) => {
        const match = (location.pathname).split('/')
        if (match[1] === 'create-order') {
          document.title = "预约单";
          dispatch({
            type: 'queryHospitalList',
            payload: match ? decodeURI(match[2]) : '',
          })

          dispatch({
            type: 'getServiceType',
            payload: {
              type: 'serviceType',
            },
          })
          dispatch({
            type: 'getInitServiceType',
            payload: {
              serviceType: decodeURI(match[3])
            },
          })
        }
      })
    },
  },
};
