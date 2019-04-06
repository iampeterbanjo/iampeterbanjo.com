import React from 'react';
import feather from 'feather-icons';
import { StaticQuery, graphql } from 'gatsby';
import Nav from './nav';

export default function Footer() {
	return <StaticQuery query={footerQuery} render={content} />;
}

const content = data => {
	const { author, social } = data.site.siteMetadata;

	return (
		<footer className="bg-white ph3 ph5-ns pv3 pv5-ns bt b--black-10">
			<div className="mw9 center">
				<div>
					<Nav />
				</div>
				<div className="mt4 mb4">
					<a
						className="btn ba br2 no-underline grow b inline-flex items-center mr3 pv2 ph3"
						href={`https://github.com/${social.github}`}
						title={`${author} on GitHub`}
					>
						<div
							className="w2 pv1 pr2"
							dangerouslySetInnerHTML={{
								__html: feather.icons.github.toSvg({
									class: 'github svg-icon',
								}),
							}}
						/>

						<span>GitHub</span>
					</a>
					<a
						className="btn ba br2 no-underline grow b inline-flex items-center mr3 pv2 ph3"
						href={`https://github.com/${social.twitter}`}
						title={`${author} on Twitter`}
					>
						<div
							className="w2 pv1 pr2"
							dangerouslySetInnerHTML={{
								__html: feather.icons.twitter.toSvg({
									class: 'twitter svg-icon',
								}),
							}}
						/>

						<span>Twitter</span>
					</a>
				</div>
				<p className="f6 measure copy lh-copy">
					© 
{' '}
{new Date().getFullYear()}, Made with sleep
				</p>
			</div>
		</footer>
	);
};

const footerQuery = graphql`
	query FooterQuery {
		site {
			siteMetadata {
				author
				social {
					twitter
					github
				}
			}
		}
	}
`;
