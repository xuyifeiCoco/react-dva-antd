import React from 'react';
import PropTypes from 'prop-types'

class CountDown extends React.Component {
  constructor() {
    super(...arguments)
    this.state = { count: 0, startTime: null };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.startTime && this.state.count !== 0 && this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.setState({ count: 0 })
      return;
    }
 
    if (nextProps.startTime > this.state.startTime) {
      this.setState({ startTime: nextProps.startTime, count: nextProps.startCount });
      if (this.intervalHandle) {
        clearInterval(this.intervalHandle);
      }
      this.intervalHandle = setInterval(() => {
        const newCount = this.state.count - 1
        if (newCount >= 0) {
          this.setState({ count: newCount })
        } else {
          clearInterval(this.intervalHandle)
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }
  }

  render() {
    return this.props.children(this.state.count);
  }

}

CountDown.propTypes = {
  children: PropTypes.func.isRequired,
  startCount: PropTypes.number.isRequired,
  startTime: PropTypes.any.isRequired,
}

export default CountDown;
