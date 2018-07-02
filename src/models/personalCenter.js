import { routerRedux } from 'dva/router'
import { Toast } from 'antd-mobile'
import {clearToken} from '../utils/request'
import { getPersonalInfo } from '../services/httpService'

export default {
  namespace: 'personalCenter',
  state: {
    userPhone: '',
  },
  reducers: {
    getUserPhone(state, { payload }) {
      return {
        ...state,
        ...{ userPhone: payload},
      }
    },
  },
  effects: {
    *toMenuIndexPage({ payload }, { put }) {
      clearToken()
      yield put(routerRedux.push('/menu-index'))
      Toast.info('退出登录成功', 1);
    },
    *toLogin({ payload },{ put }) {
      yield put(routerRedux.push('/login'))
    },
    *getPersonalInfo({}, { call,put }) {
      const { success, data } = yield call(getPersonalInfo)
      if (success) {
        yield put({
          type: 'getUserPhone',
          payload: data.phone,
        })
      }
    },
  },
  subscriptions: {
    setup({history, dispatch }) {
      history.listen((location) => {
        if (location.pathname === '/personal-center') {
          document.title = "个人中心";
          dispatch({
            type: 'getPersonalInfo',
          })
        }
      })
    }
  },
};
