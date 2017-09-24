import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { css } from 'glamor';

const animation = css.keyframes({
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(-50%)' },
});

const MarqueeContainer = glamorous.div(({ height }) => ({
  display: 'block',
  width: '100%',
  height,
  position: 'relative',
  overflow: 'hidden',
}));

const MarqueeInner = glamorous.div(({ delay, speed }) => ({
  display: 'block',
  position: 'absolute',
  height: '100%',
  whiteSpace: 'nowrap',
  animation: `${animation} ${speed} linear infinite`,
  animationDelay: delay,
}));

const MarqueeItem = glamorous.div({
  display: 'inline-block',
  marginRight: '50px',
  whiteSpace: 'nowrap',
});

const Marquee = ({ children, delay, height, speed }) => (
  <MarqueeContainer height={height}>
    <MarqueeInner delay={delay} speed={speed}>
      <MarqueeItem>{children}</MarqueeItem>
      <MarqueeItem>{children}</MarqueeItem>
    </MarqueeInner>
  </MarqueeContainer>
);

Marquee.defaultProps = {
  delay: '0s',
};

Marquee.propTypes = {
  children: PropTypes.element.isRequired,
  delay: PropTypes.string,
  height: PropTypes.string.isRequired,
  speed: PropTypes.string.isRequired,
};

export default Marquee;
