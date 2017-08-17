import { h, Component } from 'lib/preact';

export default class extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      src: props.src,
    };
  }
  componentWillReceiveProps(props) {
    if (this.props.src !== props.src) {
      this.setState({ 'src': props.src });
    }
  }
  componentWillUnmount() {
    this.setState({ 'src': '' });
  }
  render({ ...props }, { src }) {
    return (
      <img {...props} src={src} />
    );
  }
}
