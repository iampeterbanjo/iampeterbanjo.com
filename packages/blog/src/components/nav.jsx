import React from 'react';

import classNames from 'classnames';
import slugs from '../../pages/slugs';

export default function Nav(props) {
	const { className } = props;

	return (
		<nav
			className={classNames('db flex justify-center w-100 mt0-ns', className)}
			role="navigation"
			aria-label="main navigation"
		>
			<a className="f6 fw6 mr2 mr3-m mr4-l dib" href={slugs.home}>
				{`Home`}
			</a>
			<a className="f6 fw6 mr2 mr3-m mr4-l dib" href={slugs['blog.posts']}>
				{`Blog`}
			</a>
			<a className="f6 fw6 mr2 mr3-m mr4-l dib" href={slugs['korin.tracks']}>
				{`Projects`}
			</a>
			<span className="f6 fw6 mr2 mr3-m mr4-l dib">About</span>
			<span className="f6 fw6 mr2 mr3-m mr4-l dib">Credits</span>
		</nav>
	);
}
