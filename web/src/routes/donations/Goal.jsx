import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DonationStream, DonationTotal } from 'components';

const DonationsGoal = ({ target, total }) => (
  <DonationStream>
    <DonationTotal target={target} total={total} />
  </DonationStream>
);

DonationsGoal.propTypes = {
  target: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  target: 1000,
  total: state.donations.total,
});

export default connect(mapStateToProps)(DonationsGoal);
