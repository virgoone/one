/* eslint-disable no-console */

export function groupStartLog(name) {
	if (console.group) {
		console.group(name);
		return;
	}
	console.log('=== GroupStart ===> ', name);
}

export function groupEndLog(name) {
	if (console.groupEnd) {
		console.groupEnd(name);
		return;
	}
	console.log('=== GroupEnd ===> ', name);
}
