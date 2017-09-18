import React from 'react';
import glamorous from 'glamorous';

const width = (327 - (6 * 2));
const height = (87 - (6 * 2));

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

const Value = glamorous.span({});

const Symbol = glamorous.span({
  marginRight: '4px',
});

const Separator = glamorous.span({
  margin: '0 8px',
});

const DonationsGoal = () => (
  <Widget>
    <Heading>Total donations!</Heading>
    <Message>
      <Value><Symbol>£</Symbol>1000.00</Value>
      <Separator>/</Separator>
      <Value><Symbol>£</Symbol>1000.00</Value>
    </Message>
  </Widget>
);

export default DonationsGoal;
