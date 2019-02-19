import React from 'react';
import { graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { hasRoot } from '../utils';
class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const isRoot = hasRoot(location, __PATH_PREFIX__);
    const props = { isRoot, location };

    return (
      <Layout {...props} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `portfolio`, `javascript`, `react`]}
        />

        <Bio {...props} />
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
  }
`;
