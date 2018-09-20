import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

const assetContext = require.context('../img/sprites', true, /\.png$/);
const assetKeys = assetContext.keys();

const cache = {};

function getSprites(name) {
  return assetKeys.filter(key => new RegExp(`/${name}/.+`).test(key)).map(key => assetContext(key));
}

const Container = styled('div')`
  display: flex;
  padding: 20px 20px 20px 40px;
  align-content: center;
  justify-content: flex-start;
`;

class SpriteAnimation extends React.Component {
  static propTypes = {
    fps: PropTypes.number,
    name: PropTypes.string.isRequired,
  };

  static defaultProps = {
    fps: 2,
  };

  interval = null;

  state = { sprites: [] };

  componentDidMount() {
    const { fps, name } = this.props;

    if (!cache[name]) {
      cache[name] = getSprites(name);
    }

    const sprites = cache[name];

    this.interval = setInterval(this.nextFrame, Math.round(1000 / fps));

    this.setState({ index: 0, sprites });
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  nextFrame = () => {
    const { index, sprites } = this.state;
    let nextIndex = index + 1;

    if (nextIndex >= sprites.length) {
      nextIndex = 0;
    }

    this.setState({ index: nextIndex });
  };

  render() {
    const { index, sprites } = this.state;
    const sprite = sprites[index];

    return (
      <Container>
        <img alt="" src={sprite} />
      </Container>
    );
  }
}

export default SpriteAnimation;
