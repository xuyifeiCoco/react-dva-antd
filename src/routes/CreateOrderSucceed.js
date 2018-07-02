import React from 'react';
import { connect } from 'dva'
import styles from './CreateOrderSucceed.less'
import { Card, WhiteSpace, WingBlank, Button } from 'antd-mobile'

function CreateOrderSucceed({ createOrderSucceed, dispatch }) {
  const checkDetail = () => {
    dispatch({
      type: 'createOrderSucceed/toDetail',
      payload: {
        orderId: createOrderSucceed.orderId,
      },
    })
  }
  return (
    <div className={styles.createSuccess}>
      <WhiteSpace size="ms" />
      <WingBlank size="md">
        <Card >
          <Card.Body>
            <div className={styles.successContent}>
              <div className={styles.successTitle} >提交订单成功</div>
              <div className={styles.successBody} >预约助理会在10分钟内联系您，请耐心等待...</div>
              <div className={styles.successBody} >预约电话: <a href={`tel:${createOrderSucceed.phoneNo}`}>{createOrderSucceed.phoneNo}</a></div>
              <Button className={styles.detailBtn} size="small" onClick={checkDetail} >查看详情</Button>
            </div>
          </Card.Body>
        </Card>
      </WingBlank>
      {createOrderSucceed.adsData.map((val, index) => (
        <WingBlank size="md" key={index}>
          <Card className='Advertisement'>
            <Card.Body>
              <a
                href={val.staticUrl}
              >
                <img src={val.staticPig} alt="" />
              </a>
            </Card.Body>
          </Card>
        </WingBlank>))}
    </div>
  );
}

export default connect(({ createOrderSucceed, loading }) => ({ createOrderSucceed, loading }))(CreateOrderSucceed);
