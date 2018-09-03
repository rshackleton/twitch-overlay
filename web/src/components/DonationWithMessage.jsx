import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import numeral from 'numeral';
import 'numeral/locales/en-gb';

import { Marquee } from 'components';

const Widget = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 32px;
  background: #000000;
  font-family: 'Monkey Island 1990';
  overflow: hidden;
`;

const Heading = styled('h1')`
  color: #eeeb22;
  font-size: 24px;
  font-weight: normal;
  line-height: 1.5em;
  margin: 0 0 16px;
  padding: 0;
  text-transform: uppercase;
  vertical-align: middle;
`;

const Message = styled('p')`
  color: #dc52dc;
  font-size: 30px;
  font-weight: normal;
  line-height: 1.5em;
  margin: 0;
  padding: 0;
  text-shadow: 2px 2px #540254;
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
  const amount = numeral(donation.donorLocalAmount).format('0.00');
  const { message } = donation;
  const contents = name + amount + message;
  return `${contents.length / 4}s`;
}

const DonationWithMessage = ({ donation, height, title, width }) => (
  <Widget height={height} width={width}>
    <Heading>{title}</Heading>
    <Marquee delay="0.5s" height="45px" speed={getSpeed(donation)}>
      <Message>
        {donation.donorDisplayName}
        <Separator>&mdash;</Separator>
        <Symbol>£</Symbol>
        {numeral(donation.donorLocalAmount).format('0.00')}
        <Separator>&mdash;</Separator>
        {donation.message}
      </Message>
    </Marquee>
  </Widget>
);

DonationWithMessage.propTypes = {
  donation: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    donorDisplayName: PropTypes.string.isRequired,
  }).isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default DonationWithMessage;
