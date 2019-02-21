import React from 'react';

export default function Nav() {
  return (
    <nav
      className="db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns"
      role="navigation"
      aria-label="main navigation"
    >
      <a
        className="f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib"
        href="/list"
      >
        Blog
      </a>
      <span className="f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib">
        Projects
      </span>
      <span className="f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib">
        About
      </span>
      <span className="f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib">
        Credits
      </span>
    </nav>
  );
}
