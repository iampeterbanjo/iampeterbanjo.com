/* eslint-disable react/no-danger */
import React from 'react';
import { Link, graphql } from 'gatsby';

import feather from 'feather-icons';
import BioMini from '../components/bio-mini';
import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogPostTemplate = props => {
	const { data, location, pageContext } = props;
	const post = data.markdownRemark;
	const siteTitle = data.site.siteMetadata.title;
	const { previous, next } = pageContext;
	const postDate = (type, date) => {
		if (!date) return null;
		return (
			<small className="db lh-copy">
				{type}
				{`:`}
				{date}
			</small>
		);
	};

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title={post.frontmatter.title} description={post.excerpt} />

			<article className="cf mw9 center">
				<header className="measure-wide lh-title">
					<h1 className="f2">{post.frontmatter.title}</h1>
					{postDate('Written', post.frontmatter.date)}
					{postDate('Updated', post.frontmatter.updated)}
				</header>

				<p
					className="f3 lh-copy measure-wide mb5"
					dangerouslySetInnerHTML={{ __html: post.html }}
				/>

				<BioMini />

				<footer className="mb3 mt5">
					<ul className="flex justify-between list pl0">
						<li>
							{previous && (
								<Link
									className="flex items-center"
									to={previous.fields.slug}
									rel="prev"
								>
									<i
										dangerouslySetInnerHTML={{
											__html: feather.icons['arrow-left'].toSvg(),
										}}
									/>
									<span className="ml3 f4">{previous.frontmatter.title}</span>
								</Link>
							)}
						</li>
						<li>
							{next && (
								<Link
									className="flex items-center"
									to={next.fields.slug}
									rel="next"
								>
									<span className="mr3 f4">{next.frontmatter.title}</span>
									<i
										dangerouslySetInnerHTML={{
											__html: feather.icons['arrow-right'].toSvg(),
										}}
									/>
								</Link>
							)}
						</li>
					</ul>
				</footer>
			</article>
		</Layout>
	);
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				updated(formatString: "MMMM DD, YYYY")
			}
		}
	}
`;