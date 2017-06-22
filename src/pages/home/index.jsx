'use strict';
import {
  h,
  Component,
} from 'lib/preact';
import styles from './style.scss';
import Tooltip from 'components/tooltip';

export default class Home extends Component {
	render() {
		return (
			<div className={styles.home}>
				<h1>Home</h1>
				<Tooltip data-position="top-right"><span>测试</span></Tooltip>
				<p>This is the Home component.sdf</p>
			</div>
		);
	}
}
