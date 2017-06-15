export const ua = navigator.userAgent.toLowerCase();

const MOBILE_REGEXP = /android|ios|iphone|ipad|ipod|mobile|blackberry/;

const ie = ua.indexOf('msie') !== -1 && parseInt(ua.split('msie')[1]);

export const notSupport = ie && ie < 9 || /blackberry/.test(ua);

export const isModern = !ie || ie > 9;

export const isMobile = MOBILE_REGEXP.test(ua);

const WECHAT_EXGEXP = /micromessenger/;

export const isWeChat = WECHAT_EXGEXP.test(ua);

const FIREFOX_EXGEXP = /firefox/;

export const isFireFox = FIREFOX_EXGEXP.test(ua);
