import React from 'react';

export default function Header(props) {
  return (
    <header class="w-100 pa3 pa5-ns bg-white mb4">
      <div class="dib dt-ns mw9 center w-100">
        <div class="dn dib-ns flex justify-center tl w-50-ns w-25">
          <a href="/" class="f5 f4-ns fw6 mt0 mb1 code" title="Home">
            iam
          </a>
        </div>
        <div class="dib tl w-50-ns w-100">{props.children}</div>
      </div>
    </header>
  );
}
