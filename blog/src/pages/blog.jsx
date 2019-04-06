/* eslint-disable react/no-danger */
import React from 'react';
import * as R from 'ramda';
import { Link, graphql } from 'gatsby';

import BioMini from '../components/bio-mini';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { hasRoot } from '../utils';

const BlogIndex = props => {
	const { data, location } = props;
	const siteTitle = data.site.siteMetadata.title;
	const posts = data.allMarkdownRemark.edges;
	const isRoot = hasRoot(location, __PATH_PREFIX__);
	const childProps = { isRoot, location };

	return (
		<Layout {...childProps} title={siteTitle}>
			<SEO
				title="All posts"
				keywords={['blog', 'gatsby', 'javascript', 'react']}
			/>

			<h1 className="f1 lh-title center cf mw9">Blog</h1>

			{posts.map(({ node }) => {
				const title = node.frontmatter.title || node.fields.slug;
				const key = R.replace(/\s/g, '-', R.toLower(title));
				return (
					<article
						key={`list-${key}`}
						className="cf mw9 center flex-l items-start"
					>
						<div className="w-100 w-25-l">
							<h3 className="lh-title f2 mb2">
								<Link to={node.fields.slug}>{title}</Link>
							</h3>
							<small>{node.frontmatter.date}</small>
						</div>

						<div className="w-100 w-75-l">
							<p className="ml4-l f3 measure-wide lh-copy">
								<span dangerouslySetInnerHTML={{ __html: node.excerpt }} />
								<Link className="ml2 f4" to={node.fields.slug}>
									{`Read more`}
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
};

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
