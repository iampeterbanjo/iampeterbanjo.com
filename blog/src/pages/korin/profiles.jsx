import React from 'react';
import * as R from 'ramda';

import BioMini from '../../components/bio-mini';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

export default props => {
	const { pageContext } = props;
	const { title, description, profile = {} } = pageContext;

	if (R.isEmpty(profile)) {
		return <h2>No profile found</h2>;
	}

	return (
		<Layout>
			<SEO title={title} description={description} />

			<article className="cf mw9 center">
				<h1 className="f2">Profile from IBM</h1>

				<p>{JSON.stringify(profile)}</p>
			</article>

			<BioMini />
		</Layout>
	);
};
