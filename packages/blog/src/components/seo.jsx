import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const detailsQuery = graphql`
	query DefaultSEOQuery {
		site {
			siteMetadata {
				title
				description
				author
			}
		}
	}
`;

function SEO({ description, lang, meta, keywords, title }) {
	return (
		<StaticQuery
			query={detailsQuery}
			render={data => {
				const metaDescription =
					description || data.site.siteMetadata.description;
				const defaultMeta = {
					name: 'keywords',
					content: keywords.join(', '),
				};
				return (
					<Helmet
						htmlAttributes={{
							lang,
						}}
						title={title}
						titleTemplate={`%s | ${data.site.siteMetadata.title}`}
						meta={[
							{
								name: 'google-site-verification',
								content: 'OB-R_RuxLlky1y8Z_LAYn2075JPx9lH1PYVmkVN0g3Q',
							},
							{
								name: 'description',
								content: metaDescription,
							},
							{
								property: 'og:title',
								content: title,
							},
							{
								property: 'og:description',
								content: metaDescription,
							},
							{
								property: 'og:type',
								content: 'website',
							},
							{
								name: 'twitter:card',
								content: 'summary',
							},
							{
								name: 'twitter:creator',
								content: data.site.siteMetadata.author,
							},
							{
								name: 'twitter:title',
								content: title,
							},
							{
								name: 'twitter:description',
								content: metaDescription,
							},
						]
							.concat(keywords.length > 0 ? defaultMeta : [])
							.concat(meta)}
					/>
				);
			}}
		/>
	);
}

SEO.defaultProps = {
	description: '',
	lang: 'en',
	meta: [],
	keywords: [],
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	keywords: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string.isRequired,
};

export default SEO;
