import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Toast } from 'antd-mobile'
import { sendPhoneCode, requestLogin } from '../services/httpService'

export default {
  namespace: 'login',
  state: {
    // 倒计时秒数
    countDown: 60,
    // 倒计时开始时间
    countDownStartTime: 0,
    // 是否处于提交中
    showSubmitLoading: false,
    // 是否同意协议
    agree: true,
  },
  reducers: {
    setField(state, { payload }) {
      return { ...state, ...payload }
    },
    startCountDown(state) {
      return { ...state, ...{ countDownStartTime: new Date() } }
    },
    toggleAgree(state) {
      return { ...state, ...{ agree: !state.agree } }
    },
    showLoading(state) {
      return { ...state, ...{ showSubmitLoading: true } }
    },
    hideLoading(state) {
      return { ...state, ...{ showSubmitLoading: false } }
    },
    resetCountDown(state) {
      return { ...state, ...{ countDownStartTime: 0 } }
    },
  },
  effects: {
    *sendVerifyCode({ payload }, { call, put }) {
      yield put({
        type: 'startCountDown',
      })
      const data = yield call(sendPhoneCode, payload)
      if (data.success) {
        Toast.success('验证码发送成功')
      } else {
        // 重置定时器
        yield put({ type: 'resetCountDown' })
      }
    },

    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(requestLogin, payload)
      yield put({ type: 'hideLoading' })
      if (data.success) {
        Toast.success('登录成功')
        localStorage.setItem('token', JSON.stringify(data.data.token))
        localStorage.setItem('phone', JSON.stringify(data.data.phone))
        const search=queryString.parse(location.hash.split('?')[1])
        if(search.from){
          yield put(routerRedux.push(`${search.from}`));
        }else{
          yield put(routerRedux.push('/menu-index'));
        }
      }
    },
    *resetLoginCountDOwn({}, {put }) {
      // 重置定时器
      yield put({ type: 'resetCountDown' })
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen((location) => {
        if (location.pathname === '/login' ) {
          document.title = "手机号快捷登录";
          dispatch({
            type: 'resetLoginCountDOwn',
          })
        }
      })
    },
  },
};
