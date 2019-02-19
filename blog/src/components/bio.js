import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

function Bio(props) {
  const { isRoot } = props;

  return (
    <StaticQuery
      query={isRoot ? bigAvatar : smallAvatar}
      render={data => avatar(data, props)}
    />
  );
}

const avatar = (data, props) => {
  const { isRoot } = props;
  const { author, social } = data.site.siteMetadata;

  if (isRoot) {
    return (
      <header className="hero">
        <div className="hero-body">
          <Image fixed={data.avatar.childImageSharp.fixed} alt={author} />
          <h2 className="title">{author}</h2>
          <h3 className="subtitle">Building on and for the web</h3>
        </div>
      </header>
    );
  }

  return (
    <div>
      <Image fixed={data.avatar.childImageSharp.fixed} alt={author} />
      <p>
        Written by <strong>{author}</strong> who lives in the United Kingdom.
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          You should follow him on Twitter
        </a>
      </p>
    </div>
  );
};

const smallAvatar = graphql`
  query SmallAvatar {
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

const bigAvatar = graphql`
  query BigAvatar {
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
