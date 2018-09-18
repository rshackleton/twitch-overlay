import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SpriteAnimation from './SpriteAnimation';

class RandomAnimation extends Component {
  static propTypes = {
    timePerSprite: PropTypes.number,
  };

  static defaultProps = {
    timePerSprite: 10000,
  };

  state = { index: 0 };

  sprites = ['amit', 'ash', 'ben', 'iain', 'nick', 'oli', 'rich'];

  componentWillMount() {
    const { timePerSprite } = this.props;
    this.interval = setInterval(this.changeSprite, Math.round(timePerSprite));
  }

  changeSprite = () => {
    const index = this.getNextIndex();
    this.setState({ index });
  };

  getNextIndex = () => {
    const { index } = this.state;

    let nextIndex = index + 1;

    if (nextIndex >= this.sprites.length) {
      nextIndex = 0;
    }

    return nextIndex;
  };

  render() {
    const { index } = this.state;

    const sprite = this.sprites[index];

    // Render animation, use key to force re-mount when sprite changes.
    return <SpriteAnimation key={sprite} name={sprite} />;
  }
}

export default RandomAnimation;
