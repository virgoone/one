const h5 = {};
h5.init = () => {
	const doc = window.document;
	const docEl = doc.documentElement;
	let metaEl = doc.querySelector('meta[name="viewport"]');
	let flexibleEl = doc.querySelector('meta[name="flexible"]');
	let dpr = 0;
	let scale = 0;
	let tid;
	let flexible = {};

	if (metaEl) {
		console.warn('将根据已有的meta标签来设置缩放比例');
		var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
		if (match) {
			scale = parseFloat(match[1]);
			dpr = parseInt(1 / scale);
		}
	} else if (flexibleEl) {
		var content = flexibleEl.getAttribute('content');
		if (content) {
			var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
			var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
			if (initialDpr) {
				dpr = parseFloat(initialDpr[1]);
				scale = parseFloat((1 / dpr).toFixed(2));
			}
			if (maximumDpr) {
				dpr = parseFloat(maximumDpr[1]);
				scale = parseFloat((1 / dpr).toFixed(2));
			}
		}
	}

	if (!dpr && !scale) {
		const isIPhone = window.navigator.appVersion.match(/iphone/gi);
		const devicePixelRatio = window.devicePixelRatio;
		if (isIPhone) {
			// iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
			if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
				dpr = 3;
			} else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
				dpr = 2;
			} else {
				dpr = 1;
			}
		} else {
			// 其他设备下，仍旧使用1倍的方案
			dpr = 1;
		}
		scale = 1 / dpr;
	}

	docEl.setAttribute('data-dpr', dpr);
	if (!metaEl) {
		metaEl = doc.createElement('meta');
		metaEl.setAttribute('name', 'viewport');
		metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
		if (docEl.firstElementChild) {
			docEl.firstElementChild.appendChild(metaEl);
		} else {
			var wrap = doc.createElement('div');
			wrap.appendChild(metaEl);
			doc.write(wrap.innerHTML);
		}
	}

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		if (width / dpr > 540) {
			width = 540 * dpr;
		}
		var rem = width / 10;
		docEl.style.fontSize = rem + 'px';
		flexible.rem = window.rem = rem;
	}

	function bootstrap(evt) {
		if (evt.target.readyState === 'complete') {
			doc.body.style.fontSize = 12 * dpr + 'px';
		}
	}
	window.addEventListener('resize', () => {
		clearTimeout(tid);
		tid = setTimeout(refreshRem, 300);
	}, false);
	window.addEventListener('pageshow', (e) => {
		if (e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);
	if (doc.readyState === 'complete') {
		doc.body.style.fontSize = 12 * dpr + 'px';
	} else {
		doc.addEventListener('readystatechange', bootstrap, false);
	}


	refreshRem();

	flexible.dpr = window.dpr = dpr;
	flexible.refreshRem = refreshRem;
	flexible.rem2px = (d) => {
		var val = parseFloat(d) * flexible.rem;
		if (typeof d === 'string' && d.match(/rem$/)) {
			val += 'px';
		}
		return val;
	};
	flexible.px2rem = (d) => {
		var val = parseFloat(d) / flexible.rem;
		if (typeof d === 'string' && d.match(/px$/)) {
			val += 'rem';
		}
		return val;
	};
	return flexible;
};
export default h5;