import React from 'react';
import { connect } from 'dva';
import styles from './WaitingOrderDetail.less';
import { Modal, List, Button, WhiteSpace, WingBlank, Card, Flex } from 'antd-mobile';
import style from '../components/ConsultingService.less';
function WaitingOrderDetail({ waitingOrderDetail, dispatch }) {
  const Item = List.Item
  const Brief = Item.Brief
  const orderId = waitingOrderDetail.orderId
  const alert = Modal.alert
  const storagePhone = localStorage.getItem('phone')
  const cancelOrder = () => {
    dispatch({
      type: 'waitingOrderDetail/cancelOrder',
      payload: {
        orderId: orderId,
      }
    })
  }
  return (
    <div className={styles.waitingOrderDetail}>
      {waitingOrderDetail.isLoading && !waitingOrderDetail.isData && <div style={{ padding: 30, textAlign: 'center' }}> 加载中...</div>}
      {waitingOrderDetail.isLoading && waitingOrderDetail.isData && <div style={{ padding: 30, textAlign: 'center' }}> 订单已被取消</div>}
      {!waitingOrderDetail.isLoading && <div className={styles.normal}>
      <Card full className="waitingOrderDetailTitle">
          <Card.Body>
          <Flex>
            <Flex.Item><p className={styles.status}>订单号：{waitingOrderDetail.orderId}</p></Flex.Item>
            <Flex.Item align="end"><p className={waitingOrderDetail.orderStatusName !=='已完成'?'blueStatus':'grayStatus'}>{waitingOrderDetail.orderStatusName}</p> </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item><p className={styles.time}>下单时间：{waitingOrderDetail.createTime}</p></Flex.Item>
            <Flex.Item align="end"><p className={waitingOrderDetail.payStatusName !=='已付款'? waitingOrderDetail.payStatusName !== '已退款'?'blueStatus':'redStatus': 'grayStatus'}>{waitingOrderDetail.payStatusName}</p></Flex.Item>
          </Flex>
          </Card.Body>
        </Card>
      <List renderHeader={() => '患者信息'} className="my-list">
        <Item extra={waitingOrderDetail.patientName}>姓名</Item>
        <Item extra={waitingOrderDetail.sexName}>性别</Item>
        <Item extra={waitingOrderDetail.phone}>联系电话</Item>
        <Item extra={waitingOrderDetail.contact}>联系人</Item>
      </List>
      {!waitingOrderDetail.isLoading && waitingOrderDetail.orderDetail.length !== 0 && <List renderHeader={() => '服务信息'} className="my-list">
        <Item extra={waitingOrderDetail.hospitalName}>入住医院</Item>
        <Item extra={waitingOrderDetail.orderDetail[0].workerInfo.serviceTypeName}>服务类型</Item>
        <Item extra={waitingOrderDetail.orderDetail[0].sickRoomInfo.buildingNumberName?waitingOrderDetail.orderDetail[0].sickRoomInfo.buildingNumberName +'-'+ waitingOrderDetail.orderDetail[0].sickRoomInfo.floorName +'-'+ waitingOrderDetail.orderDetail[0].sickRoomInfo.departmentName:''}>科室</Item>
        <Item extra={waitingOrderDetail.orderDetail[0].sickRoomInfo.bedNumber}>床号</Item>
        <Item extra={waitingOrderDetail.orderDetail[0].beginTime}>预约时间</Item>
      </List>}
      <List renderHeader={() => '备注'} className="my-list">
      <Item wrap>{waitingOrderDetail.patientRemark}</Item>
      </List>
      </div>}
      <WhiteSpace size="xl" style={{'marginBottom':'20px'}}/>
      <WingBlank>
      {!waitingOrderDetail.isLoading && (waitingOrderDetail.orderDetail.length !==0) && !waitingOrderDetail.orderDetail.beginTime && (waitingOrderDetail.loginPhone === JSON.parse(storagePhone) || JSON.parse(storagePhone) === waitingOrderDetail.phone) && <div className='positionBtn'>
       {/*<Button type="primary" onClick={() => alert('提示', '确定取消订单吗？', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确定', onPress: () => cancelOrder() },
        ])}
        >取消订单</Button>
      */} 
          <div className={style.consulting}>
          <div className='consult'>
            <Button
                activeStyle={{ backgroundColor: '#cc9933' }}
                type="warning" size="large" inline
                style={{ width: '70%', backgroundColor: '#FFA911' }}
                onClick={() => { window.location.href = `tel:${waitingOrderDetail.hospitalPhone}` }}
              >联系工作人员 <img src={require('../assets/phone.png')} alt="" className={style.phoneIcon} /></Button>
              <Button
                type="warning" size="large" inline
                onClick={() => alert('提示', '确定取消订单吗？', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  { text: '确定', onPress: () => cancelOrder() },
                ])}
                style={{ width: '30%', backgroundColor: '#00A8F9' }} activeStyle={{ backgroundColor: '#0099cc' }}
              >取消订单</Button>
          </div>
        </div>
      </div>}
      </WingBlank>
      <WhiteSpace size="xl" />
    </div>
  );
}

export default connect(({ waitingOrderDetail, loading }) => ({ waitingOrderDetail, loading }))(WaitingOrderDetail);