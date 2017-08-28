'use strict';
import {
  h,
  Component,
} from 'lib/preact';
import { logger } from 'lib/decorator';
import styles from './styles.scss';
import Feed from './Feed';
@logger('Feeds')
export default class Feeds extends Component {
	render() {
		return (
			<main className={styles.feeds_main}>
				<Feed/>
				<Feed/>
				<Feed/>
      </main>
		);
	}
}
