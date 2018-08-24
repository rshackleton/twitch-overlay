import React from 'react';
import styled from 'react-emotion';
import numeral from 'numeral';
import 'numeral/locales/en-gb';
import PropTypes from 'prop-types';

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

const Value = styled('span')``;

const Symbol = styled('span')`
  margin-right: 4px;
`;

const Separator = styled('span')`
  margin: 0 8px;
`;

const DonationTotal = ({ height, target, total, width }) => (
  <Widget height={height} width={width}>
    <Heading>Total donations!</Heading>
    <Message>
      <Value>
        <Symbol>£</Symbol>
        {numeral(total).format('0.00')}
      </Value>
      <Separator>/</Separator>
      <Value>
        <Symbol>£</Symbol>
        {numeral(target).format('0.00')}
      </Value>
    </Message>
  </Widget>
);

DonationTotal.propTypes = {
  height: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default DonationTotal;
