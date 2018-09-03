import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <ul>
    <li>
      <Link to="/overlay-background">Overlay Background</Link>
    </li>
    <li>
      <Link to="/goal">Donation Goal</Link>
    </li>
    <li>
      <Link to="/latest">Latest Donation</Link>
    </li>
    <li>
      <Link to="/top">Top Donation</Link>
    </li>
  </ul>
);

export default Home;
