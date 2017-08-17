'use strict';
import {
  h,
  Component,
} from 'lib/preact';
import { logger } from 'lib/decorator';
@logger('App UI CountDown')
export default class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.time,
    };
    this.timer = 0;
  }
  componentDidMount() {
    this.start(this.props);
  }
  componentWillReceiveProps(props) {
    if (props.time !== this.props.time) {
      this.setState({ count: props.time });
      this.__clearAllTimer();
      this.start(props);
    }
  }
  start = (props) => {
    const { callbackTime, lottery, vote } = props;
    const clacCount = (lottery || vote) ? 1000 : 1;
    this.timer = setInterval(() => {
      let { count } = this.state;
      count -= clacCount;
      if (callbackTime && callbackTime >= count) {
        this.props.onTimecallback && this.props.onTimecallback(count);
      }
      if (count < 0) {
        count = 0;
        this.__clearAllTimer();
        this.props.onTimeout && this.props.onTimeout();
        return;
      }
      this.setState({ count });
    }, 1000);
  }
  componentWillUnmount() {
    this.__clearAllTimer();
  }
  __clearAllTimer() {
    clearInterval(this.timer);
  }
  formatTime = (time) => {
    const { formatTime } = this.props;
    return formatTime ? formatTime(time) : time;
  }
  render({ style, className }, { count }) {
    return (
      <span className={className} style={style}>
        {
          this.formatTime(count)
        }
        {this.props.children}
      </span>
    );
  }
}