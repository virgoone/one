'use strict';

import init from 'src/init';
init('Project');

import { h5, injectTapEventPlugin } from 'lib/browser';
import { groupStartLog, groupEndLog, uid, getElement, setRelateveStyle } from 'lib/helper';
import * as renderer from './renderer';
import config from 'lib/config';

class OneHub {
	constructor(containerId) {
		this.__containerId = containerId;
	}

	start() {
		if (this.loaded) {
			throw new Error('请不要重复启动OneHub');
		}
		if (config.debug) groupStartLog('ONE HUB START');

		injectTapEventPlugin();
		this.flexible = h5.init();
		this.config = config;
		this.renderer = renderer;
		this.$container = this.getContainer(this.__containerId);
		this.rootId = `${config.name}-${uid()}`;
		// register ServiceWorker via OfflinePlugin, for prod only:
		if (process.env.NODE_ENV === 'production') {
			require('./pwa');
		}
		this.bootstrap();
		if (config.debug) groupEndLog('ONE HUB END');
	}
	bootstrap() {
		if (!this.loaded) {
			return Promise.reject('Destroyed');
		}
		this.renderer.start(this);
		return Promise.resolve('Done');
	}
	getContainer(containerId) {
		const container = getElement(containerId);
		setRelateveStyle(container);
		if (!container) {
			throw new Error(`[AssertError] ${containerId}容器未找到`);
		}
		return container;
	}
	get version() {
		return config.version;
	}
	get loaded() {
		return Boolean(this.rootId);
	}
}
const __ONE_HUB__ = new OneHub(document.body);
__ONE_HUB__.start();
window.__ONE_HUB__ = __ONE_HUB__;