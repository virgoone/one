import classNamesBind from 'classnames/bind';
import classNames from 'classnames';

const cxBind = (styles) => {
	return classNamesBind.bind(styles);
};
export {
	classNames,
	cxBind,
};