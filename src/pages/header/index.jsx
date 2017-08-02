'use strict';
import {
  h,
  Component,
} from 'lib/preact';
import { Link } from 'lib/router';
import styles from './header.scss';

export default class Header extends Component {
	render() {
		return (
			<header className={styles.header}>
				<Link className={styles.logo} href="/"/>
				<nav>
					<Link href="/">Home</Link>
					<Link href="/profile">Me</Link>
					<Link href="/profile/john">John</Link>
				</nav>
			</header>
		);
	}
}
