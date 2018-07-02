import React from 'react';
import { connect } from 'dva';
import { Result, Button, List, WingBlank, Toast, Modal } from 'antd-mobile';
import styles from './PersonalCenter.less';

function PersonalCenter({ personalCenter, dispatch }) {
  const myImg = src => <img src={src} className="spe" alt="" />
  const alert = Modal.alert
  const logOut = () => {
    const alertInstance = alert('提示', '确定退出账号吗？', [
      { text: '取消', onPress: () => {} },
      { text: '确定', onPress: () => {
        localStorage.removeItem('token')
        dispatch({
          type: 'personalCenter/toMenuIndexPage',
        })
      } },
    ])
  }
  return (
    <div className={styles.normal}>
      <Result 
        className="personalCenter"
        img={myImg(require('../assets/avatar.png'))}
        message={personalCenter.userPhone}
      />
      {/* <List className="personalLine">
        <List.Item
          extra={<Button icon="right"></Button>}
        >
          我的订单
        </List.Item>
      </List>
      <List className="personalLine">
        <List.Item
          extra={<Button icon="right"></Button>}
        >
          联系客服
        </List.Item>
      </List> */}
      <WingBlank>
      <Button className="logOutBtn" type="primary" onClick={logOut} >退出当前账号</Button>
      </WingBlank>
    </div>
  );
}

export default connect(({ personalCenter, loading }) => ({ personalCenter, loading }))(PersonalCenter);
