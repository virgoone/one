'use strict';
import {
  h,
  Component,
} from 'lib/preact';
import styles from './style.scss';

export default class Home extends Component {
	render() {
		return (
			<div className={styles.home}>
				<h1>Home</h1>
				<p>This is the Home component.sdf</p>
			</div>
		);
	}
}
