'use strict';

import { h, Component } from 'lib/preact';
import { cxBind } from 'lib/helper';
import { logger, pure } from 'lib/decorator';
import LinkBtn from 'components/Link';
import styles from './styles';

const cx = cxBind(styles);

@pure
@logger('App Video Component')
export default class Video extends Component {
  componentDidMount() {
    const { monitors, source } = this.props.data || {};
    if (monitors) {
      this.callMonitorOnce(monitors);
    }
    if (!this.video) return;
    this.video.src = '';
    if (source) {
      this.video.src = source;
      this.video.autoplay = this.props.autoplay;
    }
    if (this.props.volume > -1) {
      this.video.volume = parseFloat(this.props.volume / 100);
    }
    this.video.addEventListener('ended', this.onPlayEnd);
    this.video.addEventListener('error', this.onPlayError);
  }
  onPlayError = () => {
    this.props.onPlayError && this.props.onPlayError();
  }
  onPlayEnd = () => {
    const { onPlayEnd } = this.props;
    onPlayEnd && onPlayEnd();
  }
  callMonitorOnce = (monitors) => {
    if (this.hasCalled) return;
    this.hasCalled = true;
    this.context.triggerMonitorCall('show', monitors);
  }
  onTimeUpdate = () => {
    this.props.onTimeUpdate &&
      this.video &&
      this.video.duration &&
      this.video.currentTime &&
      this.props.onTimeUpdate(this.video);
  }
  componentWillUnmount() {
    if (!this.video) return;
    this.video.removeEventListener('ended', this.onPlayEnd);
    this.video.removeEventListener('error', this.onPlayError);
    this.video.pause();
    this.video.src = '';
    this.video.load();
  }
  componentWillReceiveProps(props) {
    if (!this.video || !this.video.duration) return;

    if ((props.paused && !this.props.paused) || (props.stop && !this.props.stop)) {
      !this.video.paused && this.video.pause();
      return;
    }
    if (props.volume !== this.props.volume) {
      this.video.volume = props.volume;
    }
    if (props.muted !== this.props.muted) {
      this.video.muted = props.muted;
    }
    if (!props.paused && this.props.paused) {
      this.video.paused && this.video.play();
      return;
    }
  }
  render(props) {
    const { data } = props;
    const link = data ? data.link : null;
    return (
      <LinkBtn
        link={link}
        className={cx(styles.videoRoot, props.className)}
      >
        <video
          webkit-playsinline="true"
          playsinline="true"
          ref={dom => { this.video = dom; }}
          loop={props.loop}
          className={styles.video}
          style={props.videoStyle}
          preload={props.preload}
          autoplay={false}
          x5-video-player-type="h5"
          onTimeUpdate={this.onTimeUpdate}
        />
      </LinkBtn>
    );
  }
}