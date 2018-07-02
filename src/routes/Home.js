import React from 'react';
import { connect } from 'dva';
import styles from './Home.less';
import { Button } from 'antd-mobile';

function Home({ dispatch }) {
  const createOrder = () => {
    // window.location.href = '/#/create-order'
    dispatch({
      type: 'home/createOrder',
    })
  }

  return (
    <div className={styles.normal}>
      <Button type="primary" className={styles.gotoButton} onClick={createOrder}>立刻预约</Button>
    </div>
  );
}

export default connect(({ home, loading }) => ({ home, loading }))(Home);

