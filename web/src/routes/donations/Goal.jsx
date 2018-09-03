import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DonationStream, DonationTotal } from 'components';

const DonationsGoal = ({ height, target, total, width }) => (
  <DonationStream>
    <DonationTotal height={height} target={target} total={total} width={width} />
  </DonationStream>
);

DonationsGoal.propTypes = {
  height: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  target: 1000,
  total: state.donations.total,
});

export default connect(mapStateToProps)(DonationsGoal);
