import React from 'react';
import glamorous from 'glamorous';

const width = (460 - (6 * 2));
const height = (111 - (6 * 2));

const Widget = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width,
  height,
  padding: '8px',
  background: '#323232',
  fontFamily: '\'Press Start 2P\', cursive',
});

const Heading = glamorous.h1({
  color: '#00DFFF',
  fontSize: '12px',
  fontWeight: 'normal',
  lineHeight: '14px',
  margin: '0 0 16px',
  padding: '0',
  textTransform: 'uppercase',
  verticalAlign: 'middle',
});

const Message = glamorous.p({
  color: '#FFFF65',
  fontSize: '16px',
  fontWeight: 'normal',
  lineHeight: '22px',
  margin: '0',
  padding: '0',
  textTransform: 'uppercase',
  verticalAlign: 'middle',
});

const Symbol = glamorous.span({
  marginRight: '4px',
});

const DonationsNotifications = () => (
  <Widget>
    <Heading>Top donation!</Heading>
    <Message>Richard Shackleton: <Symbol>£</Symbol>20.00</Message>
  </Widget>
);

export default DonationsNotifications;
