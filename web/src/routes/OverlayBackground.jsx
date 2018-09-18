import React, { Fragment } from 'react';
import styled from 'react-emotion';

import Goal from './donations/Goal';
import Latest from './donations/Latest';
import Top from './donations/Top';

import RandomAnimation from '../components/RandomAnimation';

import bgImg from '../img/bg.jpg';

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
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr;
  width: 100%;
  height: 180px;
  background: #000000;
`;

const StyledRandomAnimation = styled(RandomAnimation)`
  display: block;
`;

const StyledGoal = styled(Goal)`
  display: block;
`;

const StyledLatest = styled(Latest)`
  display: block;
`;

const StyledTop = styled(Top)`
  display: block;
`;

export default () => (
  <Fragment>
    <Container>
      <Background />
      <BottomBar>
        <StyledRandomAnimation name="amit" />
        <StyledGoal />
        <StyledLatest />
        <StyledTop />
      </BottomBar>
    </Container>
  </Fragment>
);
