import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    padding: 8,
  },
  paper: {
    padding: 24,
  },
};

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

export default withStyles(styles)(Home);
