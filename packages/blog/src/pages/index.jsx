import React from 'react';
import { graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { hasRoot } from '../utils';

const BlogIndex = props => {
	const { data, location } = props;
	const siteTitle = data.site.siteMetadata.title;
	const isRoot = hasRoot(location, __PATH_PREFIX__);
	const childProps = { isRoot, location };

	return (
		<Layout {...childProps} title={siteTitle}>
			<SEO
				title="Home"
				keywords={[
					'blog',
					'portfolio',
					'javascript',
					'full-stack',
					'developer',
				]}
			/>

			<div className="cf mw9 center tc-m justify-center">
				<Bio />
			</div>
		</Layout>
	);
};

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
