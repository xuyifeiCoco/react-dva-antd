
import { routerRedux } from 'dva/router'

export default {
  namespace: 'home',
  state: {},
  reducers: {},
  effects: {
    *createOrder({ payload }, { put }) {
      yield put(routerRedux.push('/create-order/0'))
    },
  },
  subscriptions: {
    setup({ history }) {
      history.listen((location) => {
        if (location.pathname === '/') {
          document.title = "预约护工";
        }
      })
    },
  },
};
