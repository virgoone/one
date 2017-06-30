'use strict';
import {
	h,
	Component,
} from 'lib/preact';
import styles from './style.scss';
import { HamalFx } from 'components/anime';

export default class Home extends Component {
	render() {
		return (
			<div className={styles.home}>
				<div className='content'>
					<div className="grid">
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
						<HamalFx>
							<img class="stack__img" src="https://tympanus.net/Development/StackMotionHoverEffects/img/1.png" alt="Image" />
						</HamalFx>
					</div>
				</div>

			</div>
		);
	}
}
