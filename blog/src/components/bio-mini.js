import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

function BioMini() {
  return <StaticQuery query={bioQuery} render={avatar} />;
}

const avatar = data => {
  const { author, social } = data.site.siteMetadata;

  return (
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <Image fixed={data.avatar.childImageSharp.fixed} alt={author} />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
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
