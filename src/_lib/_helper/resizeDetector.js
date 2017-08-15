import initConfig from 'lib/_config';

const CSS = 'position:absolute;left:0;top:0;width:100%;height:100%;margin:0;border:none;opacity:0;visibility:hidden;pointer-events:none;z-index:-9999';

export default (element, handler) => {
  if (!element || !element.nodeName) {
    throw new Error('非法的element: ' + element);
  }
  const frame = document.createElement('iframe');

  frame.style.cssText = CSS;
  frame.className = initConfig.name + '-resize-detector';
  element.appendChild(frame);
  frame.contentWindow.onresize = () => handler(element);

  return {
    destroy() {
      frame.contentWindow.onresize = undefined;
      frame.parentNode && frame.parentNode.removeChild(frame);
    },
  };
};
