const prefix = 'ONE';

const debug = (name) => {
	return require('debug')(`${prefix}:${name}`);
};

debug.enable = () => {
	localStorage.debug = `${prefix}:*`;
};

module.exports = debug;
