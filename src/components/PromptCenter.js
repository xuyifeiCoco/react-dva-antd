import React from 'react';
import PropTypes from 'prop-types'
import { Button } from 'antd-mobile';
import styles from './PromptCenter.less'

class PromptCenter extends React.Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
  }
  render() {
    const { text, src } = this.props
    return (
      <div className={styles.center}>
        <div className={styles.inner}>
          {src && <img src={src} />}
          <span>{text}</span>
        </div>
      </div>
    )
  }
}
PromptCenter.propTypes = {
  text: PropTypes.string.isRequired,
  // src:PropTypes.string.isRequired,
}
PromptCenter.defaultProps = {
  text: '暂时没有数据',
  // src:require('../assets/avatar.png')
}

export default PromptCenter
