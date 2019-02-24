import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

function BioMini() {
  return <StaticQuery query={bioQuery} render={avatar} />;
}

const avatar = data => {
  const { author, social } = data.site.siteMetadata;

  return (
    <article className="cf mw9 center flex items-start mt5">
      <div className="">
        <p className="image is-64x64 avatar">
          <Image fixed={data.avatar.childImageSharp.fixed} alt={author} />
        </p>
      </div>

      <div className="content">
        <p className="ml4 f5 measure-wide lh-copy mb1">
          Written by <strong>{author}</strong> who lives in the United Kingdom.
          {` `}
        </p>
        <p className="ml4 f5 measure-wide lh-copy mt1">
          You should follow him on{' '}
          <a href={`https://twitter.com/${social.github}`}>GitHub</a> or on
          <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
        </p>
      </div>
    </article>
  );
};

const bioQuery = graphql`
  query BioMiniQuery {
    avatar: file(absolutePath: { regex: "/iampeterbanjo-w400.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
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

export default BioMini;
