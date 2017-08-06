import Donations from './Donations';
import Home from './Home';

const routes = [{
  key: 'root.home',
  path: '/',
  exact: true,
  component: Home,
  title: 'Home',
}, {
  key: 'root.donations',
  path: '/donations',
  component: Donations,
  title: 'Donations',
}];

export default routes;
