import React from 'react';

import classNames from 'classnames';

export default function Nav(props) {
  return (
    <nav
      className={classNames(
        'db flex justify-center w-100 tl tr-ns mt0-ns',
        props.className
      )}
      role="navigation"
      aria-label="main navigation"
    >
      <a className="f6 fw6 black-70 mr2 mr3-m mr4-l dib" href="/">
        Home
      </a>
      <a className="f6 fw6 black-70 mr2 mr3-m mr4-l dib" href="/list">
        Blog
      </a>
      <span className="f6 fw6 black-70 mr2 mr3-m mr4-l dib">Projects</span>
      <span className="f6 fw6 black-70 mr2 mr3-m mr4-l dib">About</span>
      <span className="f6 fw6 black-70 mr2 mr3-m mr4-l dib">Credits</span>
    </nav>
  );
}
