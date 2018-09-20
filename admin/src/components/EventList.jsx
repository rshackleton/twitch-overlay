import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import 'numeral/locales/en-gb';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';

import spacing from 'material-ui/styles/spacing';

const styles = {
  root: {
    padding: spacing.unit,
  },
  card: {
    marginBottom: spacing.unit,
  },
};

numeral.locale('en-gb');

const EventList = ({ classes, events }) => (
  <div className={classes.root}>
    <Grid container>
      <Grid item xs={12}>
        {events.map(event => {
          const message = event.message[0];

          return (
            // eslint-disable-next-line no-underscore-dangle
            <Card key={message._id} className={classes.card}>
              <CardContent>
                <Typography type="headline">{message.name}</Typography>
                {event.type === 'bits' || event.type === 'subscription' ? (
                  <Typography type="subheading" paragraph>
                    {message.message}
                  </Typography>
                ) : null}
                {event.type === 'follow' ? (
                  <Typography type="subheading" paragraph>
                    New follow from {message.name}!
                  </Typography>
                ) : null}
                {event.type === 'host' ? (
                  <Typography type="subheading" paragraph>
                    Hosting with {message.viewers} viewers!
                  </Typography>
                ) : null}
                {event.type === 'raid' ? (
                  <Typography type="subheading" paragraph>
                    Raiding with {message.raiders} viewers!
                  </Typography>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  </div>
);

EventList.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(EventList);
