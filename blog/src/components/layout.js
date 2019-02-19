import React from 'react';
import { Link } from 'gatsby';

import 'css/build/main.css';
import classNames from 'classnames';
class Layout extends React.Component {
  render() {
    return (
      <div>
        <section
          className={classNames('is-medium is-bold', {
            [this.isRoot()]: 'hero'
          })}
        >
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

  isRoot = () => this.props.location.pathname === `${__PATH_PREFIX__}/`;

  getHeader = classes => {
    const { title } = this.props;

    if (this.isRoot()) {
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
