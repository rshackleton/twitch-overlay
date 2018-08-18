import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <ul>
    <li>
      <Link to="/goal">Donation Goal</Link>
    </li>
    <li>
      <Link to="/notifications">Donation Notifications</Link>
    </li>
  </ul>
);

export default Home;
