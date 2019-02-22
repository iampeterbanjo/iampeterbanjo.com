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
      <div class="pb3 pb4-ns pt4 pt5-ns mt4 black-70 fl-l w-50-l">
        <h1 class="f4 fw6 f1-ns lh-title measure mt0">
          Building on and for the web.
        </h1>
        <p class="f5 f4-ns fw4 b measure dib-m lh-copy">
          As a full-stack JavaScript developer based in the UK, I prefer using
          lean and agile approaches to build software that is testable and open
          to change.
        </p>
      </div>

      <div class="fl-l w-50-l tl tc-ns pt3 pt4-m pt5-l">
        <a
          class="fr-l link dt w-75 bb b--black-10 pb2 mt2 dim blue tl"
          href="#0"
        >
          <div class="dtc w3">
            <Image
              className="image is-128x128 avatar"
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
            />
          </div>
          <div class="dtc v-top pl2">
            <p class="f6 f5-ns fw6 lh-title black mv0">{author}</p>
            <p class="f6 fw4 mt2 mb0 black-60">
              Husband, cosmopolitan geek, musically inclined, pursuing ideals.
              Learning to build beautiful things.
            </p>
          </div>
        </a>
        {/*
        <p class="f5 f4-ns fw4 b dib-m lh-copy">{author}</p> */}
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
