import React from 'react';
import * as R from 'ramda';

import BioMini from '../../components/bio-mini';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

export default props => {
	const { pageContext } = props;
	const { title, description, data = {} } = pageContext;

	const tracks = R.pathOr([], ['tracks', 'track'], data);
	const truncateText = text => {
		const maxLength = 30;
		if (text.length < maxLength) {
			return text;
		}
		return `${text.slice(0, maxLength)}...`;
	};

	return (
		<Layout>
			<SEO title={title} description={description} />

			<article className="cf mw9 center">
				<h1 className="f2">Top 40 tracks from LastFM</h1>

				<ul className="cf pa0 list">
					{tracks.map(track => {
						const image = R.pathOr('', ['image', 3, '#text'], track);
						const artist = R.path(['artist', 'name'], track);
						const title = `${track.name} by ${artist}`;
						const trackName = truncateText(track.name);

						return (
							<li className="fl w-50 w-25-m w-20-l">
								<a
									className="db mw5 black link dim"
									title={title}
									href={track.url}
								>
									<img className="db ba b--black-10" alt={title} src={image} />

									<dl className="mt2 f6 lh-copy">
										<dt className="clip">Title</dt>
										<dd className="ml0 fw9">{trackName}</dd>
										<dt className="clip">Artist</dt>
										<dd className="ml0 gray">{artist}</dd>
									</dl>
								</a>
							</li>
						);
					})}
				</ul>
			</article>

			<BioMini />
		</Layout>
	);
};
