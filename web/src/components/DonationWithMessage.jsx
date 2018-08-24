import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import numeral from 'numeral';
import 'numeral/locales/en-gb';

import { Marquee } from 'components';

const width = 460 - 6 * 2;
const height = 111 - 6 * 2;

const Widget = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: ${width}px;
  height: ${height}px;
  padding: 8px;
  background: #323232;
  font-family: 'Monkey Island 1990';
  overflow: hidden;
`;

const Heading = styled('h1')`
  color: #00dfff;
  font-size: 12px;
  font-weight: normal;
  line-height: 14px;
  margin: 0 0 16px;
  padding: 0;
  text-transform: uppercase;
  vertical-align: middle;
`;

const Message = styled('p')`
  color: #ffff65;
  font-size: 16px;
  font-weight: normal;
  line-height: 22px;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;
`;

const Symbol = styled('span')`
  margin-right: 4px;
`;

const Separator = styled('span')`
  margin: 0 12px;
`;

/** Calculate speed from donation message length. */
function getSpeed(donation) {
  const name = donation.donorDisplayName;
  const amount = numeral(donation.amount).format('0.00');
  const { message } = donation;
  const contents = name + amount + message;
  return `${contents.length / 4}s`;
}

const DonationWithMessage = ({ title, donation }) => (
  <Widget>
    <Heading>{title}</Heading>
    <Marquee delay="0.5s" height="22px" speed={getSpeed(donation)}>
      <Message>
        {donation.donorDisplayName}
        <Separator>&mdash;</Separator>
        <Symbol>£</Symbol>
        {numeral(donation.amount).format('0.00')}
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
