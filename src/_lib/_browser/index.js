export * from 'detector';

let image = new Image();
let webpSupport = false;
image.onload = image.onerror = () => {
	webpSupport = image.height === 1;
};
image.src = 'data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoBAAEAAAAMJaQAA3AA/v89WAAAAA==';

export { webpSupport };