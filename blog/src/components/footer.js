import React from 'react';
import Nav from './nav';

export default function Footer() {
  return (
    <footer class="bg-white black-70 ph3 ph3-ns pv3 pv5-ns bt b--black-10">
      <div class="mw9 center">
        <div class="mb5 lh-copy">
          <Nav />
        </div>
        <div class="mt4">
          <a
            class="ba br2 black-70 no-underline grow b inline-flex items-center mb3 pv2 ph3"
            href="https://github.com/iampeterbanjo/iampeterbanjo.com"
            title="Peter Banjo on GitHub"
          >
            <div class="w2 pv1 pr2">
              <span>GitHub</span>
            </div>
          </a>
        </div>
        <p class="f6 measure copy lh-copy">
          © {new Date().getFullYear()}, Made with
          {` `}
          sleep
        </p>
      </div>
    </footer>
  );
}
