'use strict';

import { h, render, Component } from 'lib/preact';
import { debounce, resizeDetector } from 'lib/helper';
import Loading from 'components/loading';
import { Router } from 'lib/router';

import Header from 'pages/header';
import Home from 'pages/home';
import Profile from 'pages/profile';
import 'style';
export const RootComponent = hub => class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getChildContext() {
    return {
      config: hub.config,
      api: hub.api,
      rootElement: hub.$container,
      rootId: hub.rootId,
      flexible: hub.flexible,
      getBaseDimension: this.getBaseDimension,
    };
  }
  componentDidMount() {
    if (!hub.$container) return;
    this.setupDimension();
    this.detector = resizeDetector(hub.$container, this.onResize);
  }
  componentWillUnmount() {
    this.detector.destroy();
  }
  setupDimension = () => {
    if (!hub.$container) return;

    // hub.session.setDPI(this.getBaseDimension());
  }
  onResize = () => {
    const resizeFunc = () => {
      this.setupDimension();
      this.forceUpdate();
    };
    this.baseDebounced && this.baseDebounced.cancel();
    this.baseDebounced = debounce(resizeFunc, 300);
    this.baseDebounced();
  }
  renderLoading() {
    const { config } = hub;
    const { loading = {} } = config;
    if (loading.enable) {
      return (
        <Loading ref={l => { this.$loading = l; }} loadingImg={loading.img} />
      );
    }
    return (<div className='loading-box'></div>);
  }
  getBaseDimension = () => {
    return hub.$container.getBoundingClientRect();
  }
  handleRoute = e => {
    this.currentUrl = e.url;
  };
  render() {
    return (
      <div className='koya-one' id={hub.rootId}>
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Profile path="/profile/" user="me" />
          <Profile path="/profile/:user" />
        </Router>
        {this.renderLoading()}

      </div>
    );
  }
};
const renderMap = {
  Root: undefined,
  rootInstance: undefined,
};
export function refresh(hub) {
  const map = renderMap[hub.rootId];
  map.rootInstance = render((
    <map.Root
      key={hub.rootId}
    />
  ), hub.$container, map.rootInstance);
}
/**
 * render Root
 * @param {Object} hub
 * @return {void}
 */
export function start(hub) {
  renderMap[hub.rootId] = {
    Root: RootComponent(hub),
  };
  refresh(hub);
}
export function destroy(hub) {
  const map = renderMap[hub.rootId];

  if (!map) return;

  render(<span id={hub.rootId} />, hub.$container, map.rootInstance);

  const root = document.getElementById(hub.rootId);

  setTimeout(() => {
    if (root.parentElement) {
      root.parentElement.removeChild(root);
    }
    renderMap[hub.rootId] = undefined;
  });
}