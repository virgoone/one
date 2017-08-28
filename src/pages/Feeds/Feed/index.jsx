'use strict';
import {
  h,
  Component,
} from 'lib/preact';
import { logger } from 'lib/decorator';
import Img from 'components/Image';
import Link from 'components/Link';

import styles from './feed.scss';

@logger('Feed')
export default class Feed extends Component {
  render() {
    return (
      <figure className={styles.feed_figure}>
        <Img src="http://img.kaiyanapp.com/d896f050a1edd9ceecd9d28dc8a3f841.jpeg?imageMogr2/quality/60/format/jpg" className={styles.feed_poster} />
        <figcaption className={styles.feed_figcaption}>
          <Link className={styles.feed_content}>
            <div className={styles['feed-item']}>

            </div>
            <div className={styles['feed-intro']}>
              <p className={styles.title}>「生化危机 6：终章」中文预告</p>
              <p className={styles.desc}>索尼影视娱乐／#预告</p>
            </div>
            
          </Link>

        </figcaption>
      </figure>
    );
  }
}
