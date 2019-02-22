import React from 'react';
import { Link, graphql } from 'gatsby';

import BioMini from '../components/bio-mini';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { hasRoot } from '../utils';
class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    const isRoot = hasRoot(location, __PATH_PREFIX__);
    const props = { isRoot, location };

    return (
      <Layout {...props} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article className="cf mw9 center tc-m flex items-start">
              <div className="measure">
                <h3 className="lh-title f2 mb2">
                  <Link to={node.fields.slug}>{title}</Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </div>

              <div className="">
                <p className="fl ml4 f3 measure-wide lh-copy">
                  <span dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                  <Link className="ml2 f4" to={node.fields.slug}>
                    Read more
                  </Link>
                </p>
                <p />
              </div>
            </article>
          );
        })}

        <BioMini />
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
