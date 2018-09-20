import Callback from './auth/Callback';
import Donations from './Donations';
import Events from './Events';
import Home from './Home';
import Login from './auth/Login';
import Logout from './auth/Logout';

const routes = [
  {
    key: 'root.home',
    path: '/',
    exact: true,
    component: Home,
    title: 'Home',
  },
  {
    key: 'root.donations',
    path: '/donations',
    component: Donations,
    title: 'Donations',
  },
  {
    key: 'root.events',
    path: '/events',
    component: Events,
    title: 'Events',
  },
  {
    key: 'root.auth.login',
    path: '/login',
    component: Login,
    title: 'Login',
  },
  {
    key: 'root.auth.logout',
    path: '/logout',
    component: Logout,
    title: 'Logout',
  },
  {
    key: 'root.auth.callback',
    path: '/oauth/callback',
    component: Callback,
    title: 'OAuth Callback',
  },
];

export default routes;
