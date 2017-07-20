import detector from 'detector';
import h5 from './h5';
import injectTapEventPlugin from './TapEventPlugin';

let image = new Image();
let webpSupport = false;
image.onload = image.onerror = () => {
	webpSupport = image.height === 1;
};
image.src = 'data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoBAAEAAAAMJaQAA3AA/v89WAAAAA==';

export default detector;
export { webpSupport, injectTapEventPlugin, h5 };