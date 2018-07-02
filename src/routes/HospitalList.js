import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, PullToRefresh, List, WhiteSpace, SearchBar } from 'antd-mobile';
import ConsultingService from '../components/ConsultingService'
import PromptCenter from '../components/PromptCenter'
import styles from './HospitalList.less'

const Item = List.Item;
const Brief = Item.Brief;

function HospitalList({ hospitalList, loading, dispatch }) {
  const buttonData = {
    createrOrder() {
      dispatch(routerRedux.push({
        pathname: '/create-order/0/0',
      }))
    },
    appointment: 0,
    content: ['咨询客服'],
  }
  const { list, refreshing, pageSize, listLoading, empty } = hospitalList;
  //  listLoading = loading.effects['hospitalList/getHospitalList']
  let dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });
  dataSource = dataSource.cloneWithRows(list)
  const onEndReached = () => {
    dispatch({ type: 'hospitalList/getHospitalList' })
  }
  const onRefresh = () => {
    dispatch({ type: 'hospitalList/refreshList' })
  };
  const extraContent = (item) => {
    return (
      <span className={styles.hosImg}>
        <img src={item.hospitalPic} alt="" />
      </span>
    )
  }
  const jump = (id) => {
    dispatch(routerRedux.push({
      pathname: `/create-order/${id}/0`,
    }))
  }
  const search = (value) => {
    dispatch({ type: 'hospitalList/searchHospital', payload: { value } })
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
              onClick={() => jump(item.hospitalId)}
            > {item.hospitalName} <Brief>{item.hospitalDepict}</Brief>
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
        text="暂时没有医院"
      />)}
      <ConsultingService
      {...buttonData}
      />
    </div>
  );
}

export default connect(({ hospitalList, loading }) => ({ hospitalList, loading }))(HospitalList);
