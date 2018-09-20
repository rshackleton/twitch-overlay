import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

const EventNotification = ({ newCount, refresh }) => {
  const action = (
    <Button color="contrast" dense onClick={refresh}>
      Refresh
    </Button>
  );
  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      open={newCount > 0}
      message={`There are ${newCount} new donations.`}
      action={action}
    />
  );
};

EventNotification.propTypes = {
  newCount: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default EventNotification;
