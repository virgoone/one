'use strict';
import {
  h,
  Component,
} from 'lib/preact';
import { logger } from 'lib/decorator';
import styles from './styles';
import { cxBind } from 'lib/helper';
const cx = cxBind(styles);

@logger('OneHub HamalFx')
export default class extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render({ className, style, children }) {
    return (
      <div className={cx('grid__item', 'grid__item--c1', className)} style={style}>
        <div className={styles.stack}>
          <div className={styles.stack__deco}></div>
          <div className={styles.stack__deco}></div>
          <div className={styles.stack__deco}></div>
          <div className={styles.stack__deco}></div>
          <div className={styles.stack__figure}>
            {
              children
            }
          </div>
        </div>
      </div>
    );
  }
}
