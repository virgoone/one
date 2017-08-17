'use strict';

import {
  h,
  Component,
} from 'lib/preact';
import { logger } from 'lib/decorator';
import { cxBind } from 'lib/helper';
import styles from './styles';

const cx = cxBind(styles);

@logger('App UI Drag')
export default class Drag extends Component {
  constructor(props, context) {
    super(props, context);
    this.x = 0;
    this.y = 0;
    this.Mx = 0;
    this.My = 0;
    this.$container = context.rootElement;
    this.event = {
      onMouseMove: this.__onMouseMove.bind(this),
      onMouseUp: this.__onMouseUp.bind(this),
    };
    this.state = {
      isDrag: false,
    };
  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
  onMouseDown = (event) => {
    if (event.button !== 0) return;
    if (!this.props.draggable) return;
    if (this.startEvent) return;

    const evt = event || window.event;
    evt.preventDefault && evt.preventDefault();
    this.setState({ isDrag: false });
    let ebc = this.$drag.getBoundingClientRect();
    let cbc = this.$container.getBoundingClientRect();
    this.Mx = evt.clientX - (ebc.left - cbc.left);
    this.My = evt.clientY - (ebc.top - cbc.top);

    this.limitX = cbc.width - ebc.width;
    this.limitY = cbc.height - ebc.height;
    document.body.addEventListener('mousemove', this.event.onMouseMove, false);
    document.body.addEventListener('mouseup', this.event.onMouseUp, false);
    this.startEvent = this.moveEvent = evt;
  }
  __onMouseUp() {
    this.startEvent = this.moveEvent = null;
    this.setState({ x: this.x, y: this.y, isDrag: false });
    document.body.removeEventListener('mousemove', this.event.onMouseMove, false);
    document.body.removeEventListener('mouseup', this.event.onMouseUp, false);
  }
  __onMouseMove(event) {
    const evt = event || window.event;
    evt.preventDefault && evt.preventDefault();
    if (this.moveEvent.clientX === evt.clientX && this.moveEvent.clientY === evt.clientY) return;
    let currentX = evt.clientX - this.Mx;
    let currentY = evt.clientY - this.My;
    currentX >= this.limitX && (currentX = this.limitX);
    currentY >= this.limitY && (currentY = this.limitY);
    currentX <= 0 && (currentX = 0);
    currentY <= 0 && (currentY = 0);
    this.x = `${currentX}px`;
    this.y = `${currentY}px`;
    this.setState({ x: this.x, y: this.y, isDrag: true });
  }
  render({ style, className, draggable }, { x, y, isDrag }) {
    const containerStyle = x && y && draggable ? {
      left: x,
      top: y,
    } : {};
    return (
      <div
        className={cx('dragRoot', className, {
          'active': isDrag,
        })}
        style={{
          ...style,
          ...containerStyle,
        }}
        onMouseDown={this.onMouseDown}
        ref={r => { this.$drag = r; }}
      >
        {this.props.children}
      </div>
    );
  }
}