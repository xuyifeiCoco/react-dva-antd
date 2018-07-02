import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Flex, WhiteSpace, Button } from 'antd-mobile';

import ConsultingService from '../components/ConsultingService'
import ServiceDetail from '../components/ServiceDetail'
import CustomIcon from '../components/CustomIcon'
import styles from './ServiceProcess.less'

function ServiceProcess({ serviceProcess, loading, dispatch, location }) {
  location.query = queryString.parse(location.search)
  const { query } = location
  const type = query.type;
  let appointType = ''
  if (type === 'heart') {
    appointType = 1
  } else if (type === 'manyperson') {
    appointType = 2
  } else if(type === 'month'){
    appointType = 4
  }
  const buttonData = {
    createrOrder() { // 点击立即预约跳转
      dispatch(routerRedux.push({
        pathname: `/create-order/0/${appointType}`,
      }))
    },
    appointment: 1,  // 立即预约
    content: ['咨询客服', '立即预约'],
  }
  // const list=serviceProcess.heart;
  const list = serviceProcess[type];
  return (
    <div>
      <div className={styles.container}>
        {
          list.map((v, index) => {
            return (
              <ServiceDetail
                key={index}
                data={v}
              />
            )
          })
        }
      </div>
      <ConsultingService
        {...buttonData}
      />
    </div>
  )
}
export default connect(({ serviceProcess, loading }) => ({ serviceProcess, loading }))(ServiceProcess);
