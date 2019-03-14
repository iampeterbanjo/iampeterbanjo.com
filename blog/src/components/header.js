import React from 'react'

export default function Header(props) {
	return (
		<header className="w-100 pt3 pt5-ns ph3 pt5-l ph5-ns mb4-l">
			<div className="dib dt-ns mw9 center w-100">
				<div className="dn dib-ns flex justify-center tl w-50-ns w-25">
					<a href="/" className="f5 f4-ns fw6 mt0 mb1 code" title="Home">
						iam
					</a>
				</div>
				<div className="dib tl w-50-ns w-100">{props.children}</div>
			</div>
		</header>
	)
}
