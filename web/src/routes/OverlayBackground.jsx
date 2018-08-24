import React, { Fragment } from 'react';
import styled from 'react-emotion';

import Goal from './donations/Goal';
import Latest from './donations/Latest';
import Top from './donations/Top';

import bgImg from '../img/bg.png';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 1920px;
  height: 1080px;
`;

const Background = styled('div')`
  display: block;
  width: 100%;
  height: 900px;
  background: url('${bgImg}') center right;
  background-size: cover;
`;

const BottomBar = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 180px;
  background: #000000;
`;

export default () => (
  <Fragment>
    <Container>
      <Background />
      <BottomBar>
        <Goal width={1920 / 3} height={180} />
        <Latest width={1920 / 3} height={180} />
        <Top width={1920 / 3} height={180} />
      </BottomBar>
    </Container>
  </Fragment>
);
