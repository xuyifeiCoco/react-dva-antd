
import { getUserOrderList, getOrderStatus } from '../services/httpService'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'orderList',
  state: {
    page: 1,
    pageSize: 10,
    listLoading: false,
    list: [],
    hasMore: true,
    refreshing: false,
    empty: false,
  },
  reducers: {
    showLoading(state) {
      return { ...state, ...{ listLoading: true } }
    },
    hideLoading(state) {
      return { ...state, ...{ listLoading: false } }
    },
    yieldEmpty(state) {
      const flag = !state.list.length
      return { ...state, ...{ empty: flag } }
    },
    refresh(state) {
      return { ...state, ...{ refreshing: true, page: 1, hasMore: true } }
    },
    setList(state, { payload }) {
      const num = state.refreshing ? 0 : (state.list.length + payload.list.length)
      return { ...state,
        ...{
          list: state.refreshing ? [...payload.list] : [...state.list, ...payload.list],
          hasMore: payload.pageInfo.total !== num,
          page: state.page + 1,
          refreshing: false,
        },
      }
    },
  },
  effects: {
    *getList({ payload }, { call, put, select }) {
      const state = yield select(s => s.orderList);
      if (state.listLoading || !state.hasMore) {
        return;
      }
      yield put({ type: 'showLoading' })
      const data = yield call(getUserOrderList, {
        page: state.page,
        pageSize: state.pageSize,
      })
      if (data.success) {
        yield put({ type: 'setList', payload: data.data })
        yield put({ type: 'yieldEmpty' })
      }
      yield put({ type: 'hideLoading' })
    },
    *refreshList({ payload }, { put }) {
      yield put({ type: 'refresh' })
      yield put({ type: 'getList' })
    },
    *toLogin({ payload }, { put }) {
      yield put(routerRedux.push('/login'))
    },
    *getUserOrder({ payload }, { call, put }) {
      const { success, data } = yield call(getOrderStatus, { orderId: payload })
      if (success) {
        if (data.orderStatus === '1') {
          yield put(routerRedux.push(`/waiting-order-detail/${encodeURI(payload)}`))
        } else {
          yield put(routerRedux.push(`/order-detail/${encodeURI(payload)}`))
        }
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/order-list') {
          document.title = '我的订单';
          dispatch({ type: 'refresh' })
          dispatch({ type: 'getList' })
        }
      })
    },
  },
};
