import React from 'react';
import PropTypes from 'prop-types'
import { WhiteSpace , Grid  } from 'antd-mobile';
import styles from './ServiceDetail.less'


class ServiceDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const data = this.props.data
    // if(data.city){
    // console.log(data.city)
    // }
    return (
      <div>
        <div className={styles.whiteBac}>
          {
            data.title && <h3>{data.title}</h3>
          }
          {
            data.city && (<div>
                 {
                    data.city.map((v, index) => {
                      return (
                        <div key={index}>
                          <h4>{v.name}</h4>
                          <div className={styles.desc} dangerouslySetInnerHTML={{ __html: v.content }} />
                          {v.beizhu&&<div className={styles.beizhu}>{v.beizhu}</div> }
                          {v.src&&<div className={styles.fullScreen}>
                              <img src={require(`../${v.src}.png`)} alt="" />
                        </div>}
                        </div>
                      )
                    })
                  }
            </div>)
          }
          {data.content && <div className={styles.desc} dangerouslySetInnerHTML={{ __html: data.content }} />}
          {
            data.type && data.type === 'full' && (<div className={styles.fullScreen}>
              <img src={require(`../${data.src}.png`)} alt="" />
            </div>)
          }
          {
            data.type && data.type === 'small' && (
              <div className={styles.process}>
                <img src={require(`../${data.src}.png`)} alt="" className={styles.descImg} />
              </div>
            )
          }

        </div>
        <WhiteSpace size="sm" />
      </div>
    )
  }
}

export default ServiceDetail
