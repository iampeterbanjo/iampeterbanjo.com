import React from 'react';
import Header from '../../components/header';
import { Link } from 'gatsby';

export default () => (
  <div style={{ color: `teal` }}>
    <Header />
    <Link to="/contact/">Contact</Link>
    <h1>About Gatsby</h1>
    <p>Such wow. Very React.</p>
  </div>
);
