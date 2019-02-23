import React from 'react';
import Nav from './nav';
import feather from 'feather-icons';
import { StaticQuery, graphql } from 'gatsby';

export default function Footer() {
  return <StaticQuery query={footerQuery} render={content} />;
}

const content = data => {
  const { author, social } = data.site.siteMetadata;

  return (
    <footer class="bg-white black-70 ph3 ph3-ns pv3 pv5-ns bt b--black-10">
      <div class="mw9 center">
        <div class="lh-copy">
          <Nav />
        </div>
        <div class="mt4 mb4">
          <a
            class="ba br2 black-70 no-underline grow b inline-flex items-center mr3 pv2 ph3"
            href={`https://github.com/${social.github}`}
            title={`${author} on GitHub`}
          >
            <div
              class="w2 pv1 pr2"
              dangerouslySetInnerHTML={{
                __html: feather.icons.github.toSvg({ class: 'github svg-icon' })
              }}
            />

            <span>GitHub</span>
          </a>
          <a
            class="ba br2 black-70 no-underline grow b inline-flex items-center mr3 pv2 ph3"
            href={`https://github.com/${social.twitter}`}
            title={`${author} on Twitter`}
          >
            <div
              class="w2 pv1 pr2"
              dangerouslySetInnerHTML={{
                __html: feather.icons.twitter.toSvg({
                  class: 'twitter svg-icon'
                })
              }}
            />

            <span>Twitter</span>
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
};

const footerQuery = graphql`
  query FooterQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;
