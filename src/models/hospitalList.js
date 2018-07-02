import { getHospital } from '../services/httpService'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'hospitalList',
  state: {
    list: [],
    page: 1,
    pageSize: 10,
    hasMore: true,
    listLoading: false,
    refreshing: false,
    searchValue: '',
    empty: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/hospital-list') {
          document.title = '医院列表';
          dispatch({ type: 'refresh' })
          dispatch({ type: 'getHospitalList' })
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
    *getHospitalList({ payload }, { call, put, select }) {
      const state = yield select(s => s.hospitalList);
      if (state.listLoading || !state.hasMore) {
        return;
      }
      yield put({ type: 'showLoading' })
      const data = yield call(getHospital, {
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
      yield put({ type: 'getHospitalList' })
    },
    *searchHospital({ payload }, { call, put, select }) {
      yield put({ type: 'getValue', payload })
      yield put({ type: 'getHospitalList' })
    },
  },
};
