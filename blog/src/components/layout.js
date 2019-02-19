import React from 'react';
import { Link } from 'gatsby';

import 'css/build/main.css';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <section className="hero is-medium is-bold">
          <header className="hero-body">
            {this.getHeader('container has-text-centered')}
          </header>
        </section>

        <main>{this.props.children}</main>

        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    );
  }

  getHeader = classes => {
    const { location, title } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    if (location.pathname === rootPath) {
      return (
        <h1 className={classes}>
          <Link to={`/`}>{title}</Link>
        </h1>
      );
    }

    return (
      <h3 className={classes}>
        <Link to={`/`}>{title}</Link>
      </h3>
    );
  };
}

export default Layout;
