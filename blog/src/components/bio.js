import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

function Bio(props) {
  return <StaticQuery query={bioQuery} render={data => avatar(data, props)} />;
}

const avatar = (data, props) => {
  const { author } = data.site.siteMetadata;

  return (
    <Fragment>
      <div className="tl mt4-m flex-l justify-center">
        <div className="w-100 w-25-l tc mt0-m mv5 flex-l items-center-l">
          <Image
            className="image is-128x128 avatar"
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
          />
        </div>
        <div className="w-100 w-75-l pl5-l ph3">
          <h1 className="f4 fw6 f1-ns lh-title measure mt0">
            Building on and for the web.
          </h1>
          <p className="f5 f4-ns fw4 b measure dib-m lh-copy">
            As a full-stack JavaScript developer based in the UK, I prefer using
            lean and agile approaches to build software that is testable and
            open to change.
          </p>
          <p className="f6 f5-ns fw6 lh-title mv0">{author}</p>
          <p className="f6 fw4 lh-copy mt2 mb0">
            Husband, cosmopolitan geek, musically inclined, pursuing ideals.
            Learning to build beautiful things.
          </p>
        </div>
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
