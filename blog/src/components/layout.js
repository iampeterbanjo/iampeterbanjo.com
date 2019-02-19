import React from 'react';
import { Link } from 'gatsby';

import 'css/build/main.css';
import classNames from 'classnames';

class Layout extends React.Component {
  render() {
    const { children, location, isRoot } = this.props;

    return (
      <div>
        <section
          className={classNames('is-medium is-bold', {
            [isRoot]: 'hero'
          })}
        >
          <header className="hero-body">
            {this.getHeader('container has-text-centered')}
          </header>
        </section>

        <main>{children}</main>

        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    );
  }

  getHeader = classes => {
    const { title, isRoot } = this.props;

    if (isRoot) return null;

    return (
      <h3 className={classes}>
        <Link to={`/`}>{title}</Link>
      </h3>
    );
  };
}

export default Layout;
