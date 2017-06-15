// import 'promise-polyfill';
// import 'isomorphic-fetch';
import { h, render } from 'lib/preact';
import './style';

let root;
const init = () => {
	let App = require('./components/app').default;
	root = render(<App />, document.body, root);
  return root;
};


export default init;
