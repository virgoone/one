'use strict';

import init from 'src/init';
init('project');
import App from './app';
class OneHub {
	constructor() {
		return this.start();
	}
	start() {
		let root = App();
		// register ServiceWorker via OfflinePlugin, for prod only:
		if (process.env.NODE_ENV === 'production') {
			require('./pwa');
		}

		// in development, set up HMR:
		if (module.hot) {
			require('preact/devtools'); // turn this on if you want to enable React DevTools!
			module.hot.accept('./pages/app', () => requestAnimationFrame(App));
		}
		return root;
	}
}
window.__ONE_HUB__ = new OneHub();