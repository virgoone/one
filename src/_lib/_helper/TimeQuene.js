'use strict';

import { logger } from 'lib/_decorator';

@logger('TimeQuene Instance Helper')
export default class TimeQuene {

	constructor() {
		this.timerIds = [];
	}
	/**
	 * timer delay emit
	 * @param time
	 * @param fn
	 * @returns {Timer}
	 */
	after(time, fn) {

		let timer = setTimeout(() => {
			this.cancel(timer);
			fn(time);
		}, time);

		this.timerIds.push({
			type: 'after',
			timer,
			time,
		});

		return this;
	}
	/**
	 * cancel timer by timer id
	 * @param timerId
	 * @private
	 */
	cancel(timerId) {
		this.timerIds.forEach((item, index) => {
			if (item.timer === timerId) {
				clearTimeout(item);
				this.timerIds.splice(index, 1);
				return true;
			}
			return false;
		});

	}
	destroy() {
		this.timerIds.forEach(item => clearTimeout(item));
		this.timerIds = [];
	}
}