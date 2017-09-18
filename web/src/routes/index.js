import Home from './Home';
import DonationsGoal from './DonationsGoal';
import DonationsNotifications from './DonationsNotifications';

const routes = [{
  key: 'root.home',
  path: '/',
  exact: true,
  component: Home,
  title: 'Home',
}, {
  key: 'root.donations.goal',
  path: '/donations/goal',
  component: DonationsGoal,
  title: 'Donations: Goal',
}, {
  key: 'root.donations.notifications',
  path: '/donations/notifications',
  component: DonationsNotifications,
  title: 'Donations: Notifications',
}];

export default routes;
