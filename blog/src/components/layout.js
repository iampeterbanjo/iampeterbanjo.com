import React from 'react';

import 'css/build/main.css';
import Nav from '../components/nav';
import Header from './header';
import Footer from './footer';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="w-100 sans-serif near-black bg-lightest-blue">
        <Header>
          <Nav className="tr-ns" />
        </Header>

        <main className="ma5-ns">{children}</main>

        <Footer />
      </div>
    );
  }
}

export default Layout;
