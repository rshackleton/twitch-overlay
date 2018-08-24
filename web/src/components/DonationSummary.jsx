import React from 'react';
import styled from 'react-emotion';
import numeral from 'numeral';
import 'numeral/locales/en-gb';
import PropTypes from 'prop-types';

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
`;

const Symbol = styled('span')`
  margin-right: 4px;
`;

const DonationSummary = ({ donation }) => (
  <Widget>
    {donation ? (
      <div>
        <Heading>Top donation!</Heading>
        <Message>
          {donation.donorDisplayName}
          :&nbsp;
          <Symbol>£</Symbol>
          {numeral(donation.amount).format('0.00')}
        </Message>
      </div>
    ) : null}
  </Widget>
);

DonationSummary.defaultProps = {
  donation: null,
};

DonationSummary.propTypes = {
  donation: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    donorDisplayName: PropTypes.string.isRequired,
  }),
};

export default DonationSummary;
