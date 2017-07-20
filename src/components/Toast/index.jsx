'use strict';
import { h, Component } from 'lib/preact';
import { cxBind } from 'lib/helper';
import styles from './styles';

const cx = cxBind(styles);

const vars = {
	timeout: 500,
};
export default class Toast extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	componentDidMount() {
		setTimeout(() => this.setState({ enter: true }), vars.timeout);

		const { timeout } = this.props;

		if (timeout && timeout > 0) {
			this.timeoutId = setTimeout(this.onRemoveToast, timeout);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId);
	}

	onRemoveToast = () => {
		clearTimeout(this.timeoutId);

		this.setState({
			leave: true,
		});

		setTimeout(() => {
			const { id } = this.props;
			this.context.actions && this.context.actions.toast.remove(id).dispatch();
		}, vars.timeout);
	}

	render({ type, message }, state) {
		const toastClasses = cx(styles.toastRoot, styles[type], {
			[styles.leave]: state.leave,
			[styles.enter]: !state.leave && state.enter,
		});
		return (
			<div className={styles.toastWrapper}>
				<div
					className={toastClasses}
					style={{ animationDuration: `${vars.timeout}ms` }}
					onClick={this.onRemoveToast}
				>
					{message}
				</div>
			</div>
		);
	}
}