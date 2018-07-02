import { getIncreament} from '../services/httpService'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'addservice',
  state: {
    list: [],
    page: 1,
    pageSize: 1000,
    hasMore: true,
    listLoading: false,
    refreshing: false,
    searchValue: '',
    empty: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/add-service') {
          document.title = '增值服务';
          dispatch({ type: 'refresh' })
          dispatch({ type: 'getService' })
        }
      })
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, ...{ listLoading: true } }
    },
    hideLoading(state) {
      return { ...state, ...{ listLoading: false } }
    },
    refresh(state) {
      return { ...state, ...{ refreshing: true, page: 1, hasMore: true } }
    },
    getValue(state, { payload }) {
      return { ...state, ...{ searchValue: payload.value, page: 1, hasMore: true, list: [] } }
    },
    yieldEmpty(state) {
      const flag = !state.list.length
      return { ...state, ...{ empty: flag } }
    },
    setList(state, { payload }) {
      let num=state.refreshing ? 0:(state.list.length+payload.list.length)
      // console.log(payload.pageInfo.total !== num)
      return { ...state,
        ...{
          list: state.refreshing ? [...payload.list] : [...state.list, ...payload.list],
          hasMore: false,
          page: state.page + 1,
          refreshing: false,
        },
      }
    },
  },
  effects: {
    *getService({ payload }, { call, put, select }) {
      const state = yield select(s => s.addservice);
      if (state.listLoading || !state.hasMore) {
        return;
      }
      yield put({ type: 'showLoading' })
      const data = yield call(getIncreament, {
        page: state.page,
        pageSize: state.pageSize,
        searchValue: state.searchValue,
      })
    
      if (data.success) {
        yield put({ type: 'setList', payload: data.data })
      }
      yield put({ type: 'hideLoading' })
      yield put({ type: 'yieldEmpty' })
    },
    *refreshList({ payload }, { call, put }) {
      yield put({ type: 'refresh' })
      yield put({ type: 'getService' })
    },
    *searchHospital({ payload }, { call, put, select }) {
      yield put({ type: 'getValue', payload })
      yield put({ type: 'getService' })
    },
  },
};
