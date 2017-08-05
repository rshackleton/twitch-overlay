import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchDonations } from 'actions';
import { DonationList } from 'components';

class Donations extends Component {
  static propTypes = {
    donations: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchDonations: PropTypes.func.isRequired,
  }
  static defaultProps = {
    donations: [],
  }
  componentWillMount() {
    this.props.fetchDonations();
  }
  render() {
    const { donations } = this.props;
    return <DonationList donations={donations} />;
  }
}

const mapStateToProps = state => ({
  donations: state.donations,
});

const mapDispatchToProps = dispatch => ({
  fetchDonations: () => dispatch(fetchDonations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Donations);
