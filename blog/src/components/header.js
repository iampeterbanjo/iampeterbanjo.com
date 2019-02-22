import React from 'react';

export default function Header(props) {
  return (
    <header class="w-100 pa3 ph5-ns bg-white mb4">
      <div class="db dt-ns mw9 center w-100">
        <div class="db dtc-ns v-mid tl w-50">
          <a href="/" class="dib f5 f4-ns fw6 mt0 mb1 code" title="Home">
            iam
          </a>
        </div>
        <div class="db dtc-ns v-mid tl w-50">{props.children}</div>
      </div>
    </header>
  );
}
