import React from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import ConsultingService from '../components/ConsultingService'
import styles from './AttendantDetail.less'

function AttendantDetail({ attendantDetail, loading, dispatch }) {
  const data = [
    {
      title: '我们的优势',
      content: ' 持证上岗  &nbsp;  严格考核 <br />丰富的护理经验+严格的培训体系造就专业的服务',
      url: require('../assets/advantage.png'),
    },
    {
      title: '我们的服务',
      content: '  规范标准   &nbsp;  专业安心 <br /> 分病种标准化操作，严格遵守服务流程打造专业护理团队',
      url: require('../assets/service.png'),
    },
  ]
  const buttonData = {
    createrOrder() { // 点击立即预约跳转
      dispatch(routerRedux.push({
        pathname: '/create-order/0/0',
      }))
    },
  }
  return (
    <div className={styles.container}>
      {data.map((v, index) => {
        return (
          <div className={styles.outer} key={index}>
            <div className={styles.title}>
              <h2>{v.title}</h2>
            </div>
            <p dangerouslySetInnerHTML={{ __html: v.content }} />
            <img src={v.url} alt="" />
          </div>
        )
      })}
      <ConsultingService {...buttonData} />
    </div>
  )
}

export default connect(({ attendantDetail, loading }) => ({ attendantDetail, loading }))(AttendantDetail)
