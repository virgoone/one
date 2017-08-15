'use strict';
import {
	h,
	Component,
} from 'lib/preact';
import { anime } from 'lib/helper';
import { logger } from 'lib/decorator';
import styles from './style.scss';
const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

@logger('OneHub Canvas')
export default class Canvas extends Component {
	constructor(props, context) {
		super(props, context);
		this.human = false;
		const { flexible } = context;
		this.dpr = flexible.dpr > 2 ? 1 : 2;
	}
	componentDidMount() {
		this.ctx = this.$canvas.getContext('2d');
		const tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
		window.addEventListener('resize', () => {
			clearTimeout(this.resizeTimer);
			this.resizeTimer = setTimeout(this.onResize, 100);
		});
		const render = anime({
			duration: Infinity,
			update: () => {
				this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
			},
		});
		document.addEventListener(tap, (e) => {
			this.human = true;
			render.play();
			const { pointerX, pointerY } = this.updateCoords(e);
			this.animateParticules(pointerX * this.dpr, pointerY * this.dpr);
		}, false);
		setTimeout(this.onResize);
		this.setState({
			dimension: {
				baseWidth: 0,
				baseHeight: 0,
			},
		});
	}
	updateCoords = (event) => {
		const e = event || window.event;
		const pointerX = e.clientX || e.touches[0].clientX;
		const pointerY = e.clientY || e.touches[0].clientY;
		return { pointerX, pointerY };
	}
	createParticule = (x, y) => {
		const { ctx } = this;
		var p = {};
		p.x = x;
		p.y = y;
		p.color = colors[anime.random(0, colors.length - 1)];
		p.radius = anime.random(16, 32);
		p.endPos = this.setParticuleDirection(p);
		p.draw = () => {
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
			ctx.fillStyle = p.color;
			ctx.fill();
		};
		return p;
	}
	createCircle = (x, y) => {
		const { ctx } = this;
		const p = {};
		p.x = x;
		p.y = y;
		p.color = '#FFF';
		p.radius = 0.1;
		p.alpha = 0.5;
		p.lineWidth = 6;
		p.draw = () => {
			ctx.globalAlpha = p.alpha;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
			ctx.lineWidth = p.lineWidth;
			ctx.strokeStyle = p.color;
			ctx.stroke();
			ctx.globalAlpha = 1;
		};
		return p;
	}
	animateParticules = (x, y) => {
		const numberOfParticules = Number(location.href.split('?')[1]) || 40;
		const circle = this.createCircle(x, y);
		const particules = [];
		for (var i = 0; i < numberOfParticules; i++) {
			particules.push(this.createParticule(x, y));
		}
		const renderParticule = (anim) => {
			for (var i = 0; i < anim.animatables.length; i++) {
				anim.animatables[i].target.draw();
			}
		};
		anime.timeline().add({
			targets: particules,
			x: (p) => { return p.endPos.x; },
			y: (p) => { return p.endPos.y; },
			radius: 0.1,
			duration: anime.random(1200, 1800),
			easing: 'easeOutExpo',
			update: renderParticule,
		})
			.add({
				targets: circle,
				radius: anime.random(80, 160),
				lineWidth: 0,
				alpha: {
					value: 0,
					easing: 'linear',
					duration: anime.random(600, 800),
				},
				duration: anime.random(1200, 1800),
				easing: 'easeOutExpo',
				update: renderParticule,
				offset: 0,
			});
	}
	setParticuleDirection = (p) => {
		var angle = anime.random(0, 360) * Math.PI / 180;
		var value = anime.random(50, 180);
		var radius = [-1, 1][anime.random(0, 1)] * value;
		return {
			x: p.x + radius * Math.cos(angle),
			y: p.y + radius * Math.sin(angle),
		};
	}
	onResize = () => {
		const { getBaseDimension } = this.context;
		const {
      width: baseWidth,
			height: baseHeight,
    } = getBaseDimension();
		this.$canvas.width = `${baseWidth * this.dpr}`;
		this.$canvas.height = `${baseHeight * this.dpr}`;
		this.setState({
			dimension: {
				baseWidth,
				baseHeight,
			},
		});
	}
	render(props, { dimension }) {
		const { baseWidth, baseHeight } = dimension || {};
		const canvasStyle = {
			width: `${baseWidth}px`,
			height: `${baseHeight}px`,
		};
		return (
			<canvas style={canvasStyle} className={styles.canvas} ref={c => { this.$canvas = c; }} />
		);
	}
}
