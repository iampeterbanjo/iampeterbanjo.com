import React from 'react';

import BioMini from '../../components/bio-mini';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

export default props => {
	const { pageContext } = props;
	const { title, description, data = {} } = pageContext;

	const { tracks = {} } = data;
	const { songs = [] } = tracks;
	console.log(tracks);

	return (
		<Layout>
			<SEO title={title} description={description} />

			<div className="cf mw9 center">
				<h1 className="f2">Songs</h1>
				<ul>
					{songs.map(s => {
						return <li>{s.name}</li>;
					})}
				</ul>
			</div>

			<BioMini />
		</Layout>
	);
};
