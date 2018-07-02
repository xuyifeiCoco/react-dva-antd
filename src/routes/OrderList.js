import React from 'react';
import { connect } from 'dva';
import { ListView, PullToRefresh, Flex } from 'antd-mobile';
import PromptCenter from '../components/PromptCenter'
import styles from './OrderList.less';

function OrderList({ orderList, loading, dispatch }) {
  const {
    pageSize,
    list,
    refreshing,
    empty,
  } = orderList

  const listLoading = loading.effects['orderList/getList']

  let dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });
  dataSource = dataSource.cloneWithRows(list)

  const onEndReached = () => {
    dispatch({ type: 'orderList/getList' })
  }

  const onRefresh = () => {
    dispatch({ type: 'orderList/refreshList' })
  };

  const showDetail = (item) => {
    dispatch({
      type: 'orderList/getUserOrder',
      payload: item.orderId,
    })
  }

  const row = (item, sectionID, rowID) => {
    return (
      <div className={styles.item} key={rowID} onClick={() => showDetail(item)}>
        <div className={styles.row1}>
          <span className={styles.orderId}>订单号：{ item.orderId}</span>
          <span className={styles.right}><span className={item.orderStatusName !=='已完成'? 'blueStatus': 'grayStatus'}>{ item.orderStatusName }</span> <span className={item.payStatusName !=='已付款'? item.payStatusName !== '已退款'?'blueStatus':'redStatus': 'grayStatus'}>{item.payStatusName}</span></span>
        </div>
        <div className={styles.row2}>
          <Flex>
            <div className={styles.imgContainer}>
              <img src={item.picAddress} alt="" />
            </div>
            <div className={styles.textContainer}>
              <h4>{item.serviceTypeName}</h4>
              <p>医院：{ item.hospitalName}   {item.departmentName }</p>
              <p>护工/小组：{ item.workerNames || '暂无' }</p>
            </div>
          </Flex>
        </div>
        <div className={styles.row3}>
          <span>共{ item.day || '0'}天{item.hour || 0}小时</span>
          <span className={item.actualTotalPrice ? '' : styles.noPay}>实付款：{`￥${item.totalAmount}`}</span>
        </div>
      </div>
    );
  };
  const wid100={
    'height':'100%'
  };
  return (
    <div className={styles.normal} style={wid100}>
      {
      !empty ? (
        <ListView
          dataSource={dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
            {listLoading && !refreshing ? '加载中...' : (refreshing ? '' : '加载完成')}
          </div>
        )}
          renderRow={row}
          className="amList"
          pageSize={pageSize}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
          pullToRefresh={<PullToRefresh
            distanceToRefresh={window.devicePixelRatio * 25}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
        />
      ) : (<PromptCenter
        text="暂时没有订单"
      />)
    }

    </div>
  );
}

export default connect(({ orderList, loading }) => ({ orderList, loading }))(OrderList);
