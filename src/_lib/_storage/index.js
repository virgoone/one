import config from 'lib/_config';
import * as pf from 'lib/_polyfills';

const prefix = config.debug ? 'LIVEOS.DEBUG' : 'LIVEOS';

export default {
	get(key) {
		const keyname = `${prefix}.${key}`;
		const value = window.localStorage.getItem(window.btoa(keyname));
		if (!value) {
			return value;
		}
		return JSON.parse(window.atob(value));
	},
	set(key, value) {
		const keyname = `${prefix}.${key}`;
		return window.localStorage.setItem(window.btoa(keyname), window.btoa(JSON.stringify(value)));
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
		storage.push(value);
		return this.set(key, storage);
	},
	remove(key) {
		const keyname = `${prefix}.${key}`;
		return window.localStorage.removeItem(window.btoa(keyname));
	},
	clear() {
		window.localStorage.clear();
	},
};
const sessionStorage = {
	get(key) {
		const keyname = `${prefix}.${key}`;
		const value = window.sessionStorage.getItem(window.btoa(keyname));
		if (!value) {
			return value;
		}
		return JSON.parse(window.atob(value));
	},
	set(key, value) {
		const keyname = `${prefix}.${key}`;
		return window.sessionStorage.setItem(window.btoa(keyname), window.btoa(JSON.stringify(value)));
	},
	update(key, value) {
		let storage = this.get(key);
		if (!storage) {
			storage = [];
		}
		storage.push(value);
		return this.set(key, storage);
	},
	remove(key) {
		const keyname = `${prefix}.${key}`;
		return window.sessionStorage.removeItem(window.btoa(keyname));
	},
	clear() {
		window.sessionStorage.clear();
	},
};
export {
	sessionStorage,
};