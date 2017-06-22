import config from 'lib/_config';
import * as pf from 'lib/_polyfills';

const prefix = config.debug ? 'ONE.DEBUG' : 'ONE';

export default {
	get(key) {
		const keyname = `${prefix}.${key}`;
		const value = window.localStorage.getItem(pf.encode(keyname));
		if (!value) {
			return value;
		}
		return JSON.parse(pf.decode(value));
	},
	set(key, value) {
		const keyname = `${prefix}.${key}`;
		return window.localStorage.setItem(pf.encode(keyname), pf.encode(JSON.stringify(value)));
	},
	contains(key, value) {
		const storage = this.get(key);
		if (storage && storage.length) {
			return Boolean(pf.find(storage, (o) => {
				return pf.isEqual(o, value);
			}));
		}
		return false;
	},
	update(key, value) {
		let storage = this.get(key);
		if (!storage) {
			storage = [];
		}
		const isExist = storage.filter(o => pf.isEqual(o, value));
		if (!isExist.length) {
			storage.push(value);
		}
		return this.set(key, storage);
	},
	remove(key) {
		const keyname = `${prefix}.${key}`;
		return window.localStorage.removeItem(pf.encode(keyname));
	},
	clear() {
		window.localStorage.clear();
	},
};
const sessionStorage = {
	get(key) {
		const keyname = `${prefix}.${key}`;
		const value = window.sessionStorage.getItem(pf.encode(keyname));
		if (!value) {
			return value;
		}
		return JSON.parse(pf.decode(value));
	},
	set(key, value) {
		const keyname = `${prefix}.${key}`;
		return window.sessionStorage.setItem(pf.encode(keyname), pf.encode(JSON.stringify(value)));
	},
	update(key, value) {
		let storage = this.get(key);
		if (!storage) {
			storage = [];
		}
		const isExist = storage.filter(o => pf.isEqual(o, value));
		if (!isExist.length) {
			storage.push(value);
		}
		return this.set(key, storage);
	},
	remove(key) {
		const keyname = `${prefix}.${key}`;
		return window.sessionStorage.removeItem(pf.encode(keyname));
	},
	clear() {
		window.sessionStorage.clear();
	},
};
export {
	sessionStorage,
};