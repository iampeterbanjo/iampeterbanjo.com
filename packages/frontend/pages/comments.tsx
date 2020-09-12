import { Comment } from '@iampeterbanjo/types';
import Head from 'next/head';
import React from 'react';
import Nav from '../components/nav';
import { API_URL } from '../config';

const Comments = ({ comments }: { comments: Comment[] }) => (
	<div>
		<Head>
			<title>Home</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Nav />

		<div className="hero">
			<h1 className="title">Comments</h1>
			<ul>
				{comments.map(comment => (
					<li key={comment.content}>
						<span>{comment.content}</span>--<span>{comment.author}</span>
					</li>
				))}
			</ul>
		</div>

		<style jsx>{`
			.hero {
				width: 100%;
				color: #333;
			}
			.title {
				margin: 0;
				width: 100%;
				padding-top: 80px;
				line-height: 1.15;
				font-size: 48px;
			}
			.title,
			.description {
				text-align: center;
			}
		`}</style>
	</div>
);

Comments.getInitialProps = async ({ req }) => {
	const res = await fetch(`${API_URL}/api/comments`);
	const json = await res.json();
	return { comments: json };
};

export default Comments;
