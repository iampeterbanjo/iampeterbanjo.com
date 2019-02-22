import React from 'react';

import 'css/build/main.css';
import Nav from '../components/nav';
import Header from './header';
import Footer from './footer';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="w-100 sans-serif">
        <Header>
          <Nav className="fr" />
        </Header>

        <main className="ph3 ph3-ns pv3 pv5-ns">{children}</main>

        <Footer />
      </div>
    );
  }
}

export default Layout;
