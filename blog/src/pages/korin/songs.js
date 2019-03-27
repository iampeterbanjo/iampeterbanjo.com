import React from 'react';

export default props => {
	const { pageContext } = props;
	console.log(pageContext);

	return (
		<div>
			<h1>{pageContext.test}</h1>
			<p>Another two</p>
		</div>
	);
};
