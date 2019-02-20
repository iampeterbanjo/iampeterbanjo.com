import React from 'react';

export default function Nav() {
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-start container space-evenly">
        <a class="navbar-item" href="/">
          Home
        </a>
        <a class="navbar-item" href="/list">
          Blog
        </a>
        <a class="navbar-item">Projects</a>
        <a class="navbar-item">About</a>
        <a class="navbar-item">Credits</a>
      </div>
    </nav>
  );
}
