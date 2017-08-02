'use strict';

import {
  h,
  Component,
} from 'lib/preact';
import { logger } from 'lib/decorator';
import { cxBind } from 'lib/helper';
import styles from './styles';

const cx = cxBind(styles);

@logger('LiveApp UI Loading')
export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.loaded();
    }, 600);
  }
  loaded = () => {
    clearTimeout(this.timer);
    this.setState({ loading: false });
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render({ style, className, loadingImg }, { loading }) {
    const classes = cx(className, 'loading-root', { 'in': loading, 'leave': !loading });
    return (
      <div className={classes} style={style}>
        <img src={loadingImg ? loadingImg : 'https://sdkcdn.videojj.com/liveos-sdk/static/loading.gif'} className={styles.img} />
      </div>
    );
  }
}