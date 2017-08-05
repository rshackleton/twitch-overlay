/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import 'numeral/locales/en-gb';

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from 'material-ui';

import {
  createStyleSheet,
  withStyles,
} from 'material-ui/styles';

import spacing from 'material-ui/styles/spacing';

const styleSheet = createStyleSheet({
  root: {
    padding: spacing.unit,
  },
  card: {
    marginBottom: spacing.unit,
  },
});

numeral.locale('en-gb');

const DonationList = ({ classes, donations }) => (
  <div className={classes.root}>
    <Grid container>
      <Grid item xs={12}>
        {donations.map(item => (
          <Card key={item._id} className={classes.card}>
            <CardContent>
              <Typography type="headline">{item.donorDisplayName}</Typography>
              <Typography type="subheading" paragraph>{numeral(item.amount).format('$0.00')}</Typography>
              <Typography type="body2">{item.message || 'No message'}</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  </div>
);

DonationList.propTypes = {
  classes: PropTypes.object.isRequired,
  donations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styleSheet)(DonationList);
