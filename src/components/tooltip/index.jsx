'use strict';
import {
  h,
  Component,
} from 'lib/preact';
import styles from './style.scss';

export default class Tooltip extends Component {
  render({ children, ...props }) {
    return (
      <div aria-label="Hey tooltip!" data-position="up" role="tooltip" className={styles.tooltip} {...props}>{children}</div>
    );
  }
}
