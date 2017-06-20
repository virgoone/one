'use strict';
import {
  h,
  Component,
} from 'lib/preact';
import { Link } from 'lib/router';
import style from './style.scss';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.sdf</p>
			</div>
		);
	}
}
