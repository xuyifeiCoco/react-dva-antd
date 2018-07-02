
import { routerRedux } from 'dva/router'

export default {
  namespace: 'attendantDetail',
  state: {},
  reducers: {},
  effects: { 
  },
  subscriptions: {
    setup({ history }) {
      history.listen((location) => {
        if (location.pathname === '/attendant-detail') {
          document.title = "金牌护工";
        }
      })
    },
  },
};
