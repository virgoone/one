/* eslint-disable no-console */
import 'es6-promise/auto';
import preact from 'preact';
import router from 'preact-router';
import debug from 'lib/_debug';
import config from 'lib/_config';
import * as polyfills from 'lib/_polyfills';
import * as decorator from 'lib/_decorator';
import * as storage from 'lib/_storage';
import * as browser from 'lib/_browser';
import * as helper from 'lib/_helper';

if (!window.__ONE_LIB__) {
	const isDebug = config.debug;
	if (config.version === 'local') {
		debug.enable();
	}
	Object.defineProperty(window, '__ONE_LIB__', {
		value: {
      config: { ...config, debug: isDebug },
			preact,
			debug,
			helper,
			polyfills,
			storage,
			decorator,
			browser,
			router,
			instances: {},
		},
	});
}
//清除sessionstorage
storage.sessionStorage.clear();
export default (name, log = true) => {
	if (!log) return;

	const { version, date } = config;

	console.log(`%c🚀 One Hub ${name}@${version} 🚀start at ${new Date(date).toLocaleString()}`, "font-family:'futura', helvetica;font-size:18px;");
};