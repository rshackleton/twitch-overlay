import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchPath, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import { withStyles } from 'material-ui/styles';

import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  list: {
    minWidth: 250,
  },
  toolbar: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  menuButton: {
    marginRight: 20,
  },
};

class Navigation extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    currentRoute: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    redirectTo: PropTypes.func.isRequired,
  }

  state = {
    open: false,
  }

  openDrawer = () => {
    this.setState({ open: true });
  }

  closeDrawer = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, currentRoute, redirectTo } = this.props;
    const leftDrawerItems = (
      <List className={classes.list} disablePadding>
        <ListItem button onClick={() => redirectTo('/')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => redirectTo('/donations')}>
          <ListItemText primary="Donations" />
        </ListItem>
      </List>
    );
    return (
      <div>
        <AppBar color="primary">
          <Toolbar className={classes.toolbar} disableGutters>
            <IconButton
              className={classes.menuButton}
              color="contrast"
              aria-label="Menu"
              onClick={this.openDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography color="inherit" type="title">
              {currentRoute.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.open}
          onClick={this.closeDrawer}
          onRequestClose={this.closeDrawer}
        >
          {leftDrawerItems}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const match = ownProps.routes
    .map(route => ({ route, match: matchPath(state.router.location.pathname, route) }))
    .find(item => !!item.match && item.match.isExact);

  return {
    currentRoute: match.route,
  };
};

const mapDispatchToProps = dispatch => ({
  redirectTo: path => dispatch(push(path)),
});

const StyledNavigation = withStyles(styles)(Navigation);
const ConnectedNavigation = connect(mapStateToProps, mapDispatchToProps)(StyledNavigation);
export default withRouter(ConnectedNavigation);
