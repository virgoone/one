'use strict';

import { h } from 'lib/preact';
import { cxBind } from 'lib/helper';
import styles from './styles';

const cx = cxBind(styles);

export default function LinkBtn(props, context) {
  const { link, className, triggerLink, children, onClick } = props;
  function onLinkClicked(evt) {
    evt && evt.stopPropagation();
    const trigger = context.triggerLink || triggerLink;
    trigger && trigger(link);
    onClick && onClick(evt);
  }
  const classes = cx(className, styles.liveosLink, { 'enable': link });
  return (
    <div
      { ...props }
      className={classes}
      onClick={onLinkClicked}
    >
      {children}
    </div>
  );
}