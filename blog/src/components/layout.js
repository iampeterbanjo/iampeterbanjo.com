import React from 'react';

import 'css/build/main.css';
import Nav from '../components/nav';
import Header from './header';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="w-100 sans-serif">
        <Header>
          <Nav />
        </Header>

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
