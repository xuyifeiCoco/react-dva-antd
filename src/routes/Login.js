import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import styles from './Login.less';
import { List, InputItem, Button, Toast, WingBlank, WhiteSpace, Checkbox } from 'antd-mobile';
import { createForm } from 'rc-form';
import { showFormError, validators } from '../utils';
import CountDown from '../components/CountDown';
import Icon from '../components/CustomIcon';


const Item = List.Item;
const AgreeItem = Checkbox.AgreeItem

function Login({ login, dispatch, form }) {
  const { getFieldProps, getFieldError, getFieldsValue } = form;

  const { countDown, countDownStartTime, showSubmitLoading, agree } = login

  const sendVerifyCode = () => {
    form.validateFields(['phone'], { force: true }, (errors) => {
      if (errors) {
        showFormError(errors)
        return
      }

      dispatch({
        type: 'login/sendVerifyCode',
        payload: {
          phone: getFieldsValue().phone,
        },
      })
    });
  }

  const requestLogin = () => {
    form.validateFields({ force: true }, (errors) => {
      if (!errors) {
        const values = getFieldsValue()
        dispatch({
          type: 'login/login',
          payload: {
            phone: values.phone,
            phoneCode: values.code,
          },
        })
      } else {
        showFormError(errors)
      }
    });
  }

  const toggleAgree = () => {
    dispatch({
      type: 'login/toggleAgree',
    })
  }

  const agreement = (e) => {
    e.preventDefault();
    dispatch(routerRedux.push({
      pathname: '/agreement',
    }))
  }

  return (
    <form className='normal'>
      <List className={styles.login} renderHeader={() => ''}>
        <InputItem
          {...getFieldProps('phone', {
            validate: [{
              trigger: 'onBlur',
              rules: [
                { required: true, message: '请输入手机号' },
                { validator: validators.phone, message: '请输入正确的手机号码' },
              ],
            }],
          })}
          clear
          type="digit"
          error={!!getFieldError('phone')}
          onErrorClick={() => {
            // console.log(getFieldError('phone'))
            Toast.info(getFieldError('phone')[0])
          }}
          placeholder="请输入手机号"
        />

        <InputItem
          {...getFieldProps('code', {
            rules: [
              { required: true, message: '请输入验证码' },
            ],
          })}
          clear
          type="digit"
          error={!!getFieldError('code')}
          onErrorClick={() => {
            Toast.info(getFieldError('code').join('、'), 2)
          }}
          placeholder="验证码"
          extra={
            <CountDown startCount={countDown} startTime={countDownStartTime}>
              {
                count => <Button type="ghost" className={styles.sendCode} onClick={sendVerifyCode} inline="true" disabled={count > 0}>{ count > 0 ? `${count}秒后重新获取` : '获取验证码' }</Button>
              }
            </CountDown>
          }
        />
      </List>
      <WhiteSpace size="lg" />
      <WingBlank size="lg"><span className={styles.info}><Icon type={require('../svg/complain.svg')} /><span>未注册的手机号将自动注册</span></span></WingBlank>

      <WhiteSpace size="lg" />
      <WingBlank size="lg"><Button type="primary" disabled={!agree || showSubmitLoading} loading={showSubmitLoading} onClick={requestLogin}>登录</Button></WingBlank>
      <AgreeItem defaultChecked={agree} onChange={toggleAgree}>
          同意<a className={styles.protocol} onClick={e => agreement(e)}>《陪你康复用户协议》</a>
      </AgreeItem>
    </form>
  );
}
const LoginFormWrapper = createForm()(Login);
export default connect(({ login, loading }) => ({ login, loading }))(LoginFormWrapper)
