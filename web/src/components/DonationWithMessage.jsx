import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import numeral from 'numeral';
import 'numeral/locales/en-gb';

import { Marquee } from 'components';

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
  overflow: 'hidden',
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
  whiteSpace: 'nowrap',
});

const Symbol = glamorous.span({
  marginRight: '4px',
});

const Separator = glamorous.span({
  margin: '0 12px',
});

/** Calculate speed from donation message length. */
function getSpeed(donation) {
  const name = donation.donorDisplayName;
  const amount = numeral(donation.amount).format('0.00');
  const message = donation.message;
  const contents = name + amount + message;
  return `${contents.length / 4}s`;
}

const DonationWithMessage = ({ title, donation }) => (
  <Widget>
    <Heading>{title}</Heading>
    <Marquee height="22px" speed={getSpeed(donation)}>
      <Message>
        {donation.donorDisplayName}
        <Separator>&mdash;</Separator>
        <Symbol>£</Symbol>{numeral(donation.amount).format('0.00')}
        <Separator>&mdash;</Separator>
        {donation.message}
      </Message>
    </Marquee>
  </Widget>
);

DonationWithMessage.propTypes = {
  title: PropTypes.string.isRequired,
  donation: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    donorDisplayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default DonationWithMessage;
