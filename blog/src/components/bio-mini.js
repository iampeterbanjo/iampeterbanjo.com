import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

function BioMini() {
  return <StaticQuery query={bioQuery} render={avatar} />;
}

const avatar = data => {
  const { author, social } = data.site.siteMetadata;

  return (
    <article className="container">
      <div className="columns">
        <div className="column is-half">
          <div className="media">
            <figure className="media-left">
              <p className="image is-64x64 avatar">
                <Image fixed={data.avatar.childImageSharp.fixed} alt={author} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  Written by <strong>{author}</strong> who lives in the United
                  Kingdom.
                  {` `}
                  <a href={`https://twitter.com/${social.twitter}`}>
                    You should follow him on Twitter
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
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
