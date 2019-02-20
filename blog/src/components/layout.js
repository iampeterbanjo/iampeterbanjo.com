import React from 'react';
import { Link } from 'gatsby';

import 'css/build/main.css';
import classNames from 'classnames';
import Nav from '../components/nav';

class Layout extends React.Component {
  render() {
    const { children, isRoot } = this.props;

    return (
      <div className="h-100 is-flex-column space-between">
        <Nav />

        <main>{children}</main>

        <footer>
          © {new Date().getFullYear()}, Made with
          {` `}
          sleep
        </footer>
      </div>
    );
  }
}

export default Layout;
