import React from 'react';
import { connect } from 'dva';
import styles from './OrderDetail.less';
import { Card, Flex, List, Button, WhiteSpace } from 'antd-mobile';
import CustomIcon from '../components/CustomIcon'
const Item = List.Item
function OrderDetail({ orderDetail }) {
  const callPhone = () => {
    window.location.href = "tel:"+orderDetail.hospitalPhone
  }
  return (
    <div className={styles.orderDetail}>
      {orderDetail.isLoading && <div style={{ padding: 30, textAlign: 'center' }}> 加载中...</div>}
      {!orderDetail.isLoading && <div className={styles.normal}>
        <Card full className="orderDetailTitle">
          <Card.Body>
          <Flex>
            <Flex.Item><p className={styles.status}>订单号：{orderDetail.orderId}</p></Flex.Item>
            <Flex.Item align="end"><p className={orderDetail.orderStatusName !=='已完成'?'blueDetailStatus':'grayDetailStatus'}>{orderDetail.orderStatusName}</p> </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item><p className={styles.time}>下单时间：{orderDetail.createTime}</p></Flex.Item>
            <Flex.Item align="end"><p className={orderDetail.payStatusName !=='已付款'? orderDetail.payStatusName !== '已退款'?'blueDetailStatus':'redDetailStatus': 'grayDetailStatus'}>{orderDetail.payStatusName}</p></Flex.Item>
          </Flex>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header
            title={<span><img src={require('../assets/base-info.png')} alt="" /> 患者信息</span>}
          />
          <Card.Body>
            <List>
              {
                orderDetail.patient.map((item, index) => {
                  return <Item key={index} extra={item.value}>{item.label}</Item>
                })
              }
            </List>
          </Card.Body>
        </Card>
        {!orderDetail.isLoading && orderDetail.details && orderDetail.details.length !== 0 && orderDetail.details.map((detail, index) => {
          return (<Card key={index}>
            <Card.Header
              title={
                <span>
                  <img src={require('../assets/service-info.png')} alt="" /> {detail[0].label} {detail[0].value}
                </span>
              }
            />
            <Card.Body>
              <List>
              {detail.slice(1).map((item, index) => {
                return (<Item key={index} extra={item.value}>{item.label}</Item>)
              })}
              </List>
            </Card.Body>
          </Card>)
          })
        }
        <Card className="feeInfo" >
          <Card.Header
            title={
              <span>
                <img src={require('../assets/card.png')} alt="" /> 费用信息
              </span>
            }
          />
          <Card.Body>
            <List>
              {
                orderDetail.receiptDetail.map((item, index) => {
                  return <Item className={item.type==='2'?'redCharge':''} key={index} extra={'￥'+item.value}>{item.label}</Item>
                })
              }
            </List>
          </Card.Body>
        </Card>  
      </div>}
      <div className={styles.support}></div>
      <Button className="contactBtn" icon={<CustomIcon type={require('../svg/phone.svg')} alt="" />} onClick={callPhone}>联系工作人员</Button>
    </div>
  );
}

export default connect(({ orderDetail, loading }) => ({ orderDetail, loading }))(OrderDetail);