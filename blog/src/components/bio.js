import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

function Bio(props) {
  return <StaticQuery query={bioQuery} render={data => avatar(data, props)} />;
}

const avatar = (data, props) => {
  const { className } = props;
  const { author } = data.site.siteMetadata;

  return (
    <header className={`hero ${className}`}>
      <div className="hero-body">
        <Image
          className="image is-128x128 avatar"
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
        />
        <h2 className="title">{author}</h2>
        <h3 className="subtitle">Building on and for the web</h3>
      </div>
    </header>
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
