export default (args, callback) => {
	const images = [];
	if (null == args || "object" != typeof args) return; // eslint-disable-line
	if ('string' === typeof args) {
		args = [args];
	}
	if (!(args instanceof Array)) {
		return;
	}

	for (let i = 0; i < args.length; i++) {
		const img = new Image();
		img.src = args[i];
		if (callback && typeof callback === 'function') {
			img.onload = () => {
				callback(i, img);
			};
		}
		images.push(img);
	}
};