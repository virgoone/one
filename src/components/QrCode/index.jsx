'use strict';

import {
  h,
  Component,
} from 'lib/preact';
import { logger } from 'lib/decorator';
import { cxBind } from 'lib/helper';
import * as pf from 'lib/polyfills';
import styles from './styles';

const cx = cxBind(styles);

@logger('App UI QrCode')
export default class QrCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const qrcode = new pf.qrcode({
      render: 'canvas',
      size: 200,
      ...this.props,
    });
    this.logger.i('生成二维码地址--->', this.props.text);
    this.$qr.appendChild(qrcode);
  }
  componentWillUnmount() {
  }
  render({ style, className }) {
    return (
      <div
        className={cx('qrcode-root', className)}
        style={style}
        ref={r => { this.$qr = r; }}
      >
      </div>
    );
  }
}