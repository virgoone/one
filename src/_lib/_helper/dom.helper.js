/**
 * get dom element by id or class
 * @param {String} key ..
 * @return {Element} ..
 */
export function getElement(key) {
	if (key && key.nodeName) { return key; }
	if (typeof key === 'string') {
		//class selector
		if (key.indexOf('.') === 0) {
			return document.getElementsByClassName(key.slice(1))[0];
		}
		//id selector
		if (key.indexOf('#') === 0) {
			return document.getElementById(key.replace('#', ''));
		}
		return document.getElementById(key);
	}
	return null;
}

export function setRelateveStyle(dom) {
	if (!dom) {
		return;
	}
	let position = dom && dom.style ? dom.style.position : '';
	if (!position && window.getComputedStyle && dom) {
		position = window.getComputedStyle(dom, null).getPropertyValue('position');
	}
	if (['fixed', 'absolute', 'relative'].indexOf(position) !== -1) return;

	dom.style.position = 'relative';
}