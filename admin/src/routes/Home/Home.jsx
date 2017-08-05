import React from 'react';
import PropTypes from 'prop-types';

import {
  Paper,
  Grid,
  Typography,
} from 'material-ui';

import {
  createStyleSheet,
  withStyles,
} from 'material-ui/styles';

const styleSheet = createStyleSheet({
  root: {
    padding: 8,
  },
  paper: {
    padding: 24,
  },
});

const Home = ({ classes }) => (
  <div className={classes.root}>
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography>
            Select an option from the menu.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </div>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Home);
