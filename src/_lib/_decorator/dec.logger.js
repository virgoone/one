'use strict';

import debugPolyfill from 'lib/_debug';

export default (tag) => {
	const debug = debugPolyfill(`${tag}`);
	const err = console.error.bind(console);
	return (target) => {
		target.prototype.logger = {
			i(name, ...msg) {
				debug(name, ...msg);
			},
			e(name, ...msg) {
				err(`${name}`, ...msg);
			},
		};
	};
};