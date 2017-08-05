import React from 'react';
import PropTypes from 'prop-types';

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

const Donations = ({ classes }) => (
  <div className={classes.root}>
    <Grid container>
      <Grid item xs={12}>
        {[1, 2, 3].map(item => (
          <Card key={item} className={classes.card}>
            <CardContent>
              <Typography type="headline">John Smith</Typography>
              <Typography type="subheading" paragraph>£10.00</Typography>
              <Typography type="body2">So we can hit the ground running, we will be dynamically reusing every standard setter in our space.</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  </div>
);

Donations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Donations);
