'use strict';
import {
  h,
  Component,
} from 'lib/preact';
import { anime } from 'lib/helper';
import { logger } from 'lib/decorator';

@logger('OneHub Anime')
export default class Anime extends Component {
  constructor(props, context) {
    super(props, context);
    this.targets = [];
    let { children } = props;
    if (!Array.isArray(children)) children = [children];
    this.state = {
      cur: children,
      prev: [],
      next: [],
    };
  }
  componentDidMount() {
  }
  createAnime = () => {

    let animeProps = { targets: this.targets, ...this.props };

    delete animeProps.children;

    if (typeof this.anime === undefined)
      this.anime = anime(animeProps);
    else {
      this.anime = anime(animeProps);
    }
  };
  addTarget = newTarget => {
    this.targets = [...this.targets, newTarget];
  };
  render({ className, style }, { cur }) {
    return (
      <g className={className} style={style}>
        {
          cur
        }
      </g>
    );
  }
}
