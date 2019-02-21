import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

function Bio(props) {
  return <StaticQuery query={bioQuery} render={data => avatar(data, props)} />;
}

const avatar = (data, props) => {
  const { className } = props;
  const { author } = data.site.siteMetadata;

  return (
    <Fragment>
      <div class="pb3 pb4-ns pt4 pt5-ns mt4 black-70 fl-l w-50-l">
        <h1 class="f4 fw6 f1-ns lh-title measure mt0">
          Building on and for the web.
        </h1>
        <p class="f5 f4-ns fw4 b measure dib-m lh-copy">{author}</p>
      </div>
      <div class="fl-l w-50-l tl tc-ns pt3 pt4-m pt6-l">
        <Image
          className="image is-128x128 avatar"
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
        />
      </div>
    </Fragment>
  );
};

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/iampeterbanjo-w400.jpg/" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
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

export default Bio;
