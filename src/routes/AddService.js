import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, PullToRefresh, List, WhiteSpace, SearchBar } from 'antd-mobile';
import ConsultingService from '../components/ConsultingService'
import PromptCenter from '../components/PromptCenter'
import styles from './HospitalList.less'

const Item = List.Item;
const Brief = Item.Brief;

function AddService({ addservice, loading, dispatch }) {
  const { list, refreshing, pageSize, listLoading, empty } = addservice;
  //  listLoading = loading.effects['hospitalList/getHospitalList']
  const buttonData = {
    createrOrder() {
      dispatch(routerRedux.push({
        pathname: '/create-order/0/0',
      }))
    },
    appointment: 0,
    content: ['咨询客服'],
  }
  let dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });
  dataSource = dataSource.cloneWithRows(list)
  const onEndReached = () => {
    dispatch({ type: 'addservice/getService' })
  }
  const onRefresh = () => {
    dispatch({ type: 'addservice/refreshList' })
  };
  const extraContent = (item) => {
    return (
      <span className={styles.hosImg}>
        <img src={item.incrementPic} alt="" />
      </span>
    )
  }
  const jump = (url) => {
    window.location.href=url
  }
  const row = (item, sectionID, rowID) => {
    return (
      <div className="listOuter">
        <div key={rowID} className={styles.singalList} style={{ backgroundImage: `url("${require('../assets/singalService.png')}")` }}>
          <List className="my-list">
            <Item
              className="hosList"
              multipleLine="true"
              platform="android"
              wrap
              extra={extraContent(item)}
              onClick={() => jump(item.incrementUrl)}
            > {item.incrementName} 
            <Brief>
                {
                 item.incrementDepict.split('（').length===1? item.incrementDepict:<span>{item.incrementDepict.split('（')[0]}<span style={{'color':'black'}}>（{item.incrementDepict.split('（')[1]}</span></span>
                }
            </Brief>
            </Item>
          </List>
        </div>
        <WhiteSpace size="sm" />
      </div>
    );
  };

  return (
    <div>
      { /* <SearchBar
        placeholder="Search"
        onChange={value => search(value)}
        maxLength={8}
      />*/}
      { !empty ? (
        <ListView
          dataSource={dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {listLoading && !refreshing ? '加载中...' : (refreshing ? '' : '加载完成')}
            </div>
        )}
          className="amContainer"
          renderRow={row}
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
        text="暂时没有增值服务"
      />)}
      <ConsultingService
      {...buttonData}
      />
    </div>
  );
}

export default connect(({ addservice, loading }) => ({ addservice, loading }))(AddService);
