import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

const animation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const MarqueeContainer = styled('div')`
  display: block;
  width: 100%;
  height: ${({ height }) => height};
  position: relative;
  overflow: hidden;
`;

const MarqueeInner = styled('div')`
  display: block;
  position: absolute;
  height: 100%;
  white-space: nowrap;
  animation: ${({ speed }) => `${animation} ${speed} linear infinite`};
  animation-delay: ${({ delay }) => delay};
`;

const MarqueeItem = styled('div')`
  display: inline-block;
  margin-right: 50px;
  white-space: nowrap;
`;

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
