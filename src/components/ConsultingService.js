import React from 'react';
import PropTypes from 'prop-types'
import { Button } from 'antd-mobile';
import styles from './ConsultingService.less'
import { getServicePhone } from '../services/httpService'

class ConsultingService extends React.Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
    this.state = {
      phone: '',
      flag: true,
    }
  }
  componentWillMount() {
    getServicePhone({}).then((data) => {
      if (data.success) {
        this.setState({
          phone: data.data.phone,
          flag: false,
        })
      }
    })
  }
  render() {
    const { createrOrder, appointment, content } = this.props
    return (
      <div className={styles.consulting}>
        <div className='consult'>
           <Button
              activeStyle={{ backgroundColor: '#cc9933' }}
              type="warning" size="large" inline
              disabled={this.state.flag}
              style={appointment === 1 ? { width: '70%', backgroundColor: '#FFA911' } : { width: '100%', backgroundColor: '#FFA911' }}
              onClick={() => { window.location.href = `tel:${this.state.phone}` }}
            >{content[0]} <img src={require('../assets/phone.png')} alt="" className={styles.phoneIcon} /></Button>
            {appointment && appointment === 1 && (<Button
              type="warning" size="large" inline
              onClick={createrOrder}
              style={{ width: '30%', backgroundColor: '#00A8F9' }} activeStyle={{ backgroundColor: '#0099cc' }}
            >{content[1]}</Button>)}
        </div>
      </div>
    )
  }
}
ConsultingService.propTypes = {
  // data: PropTypes.object.isRequired,
}
ConsultingService.defaultProps = {
  content: ['咨询客服', '立即预约'],
  appointment: 1,
}


export default ConsultingService
