import { Blog } from '@iampeterbanjo/types';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import React from 'react';
import Nav from '../components/nav';
import { API_URL } from '../config';

const Blogs = ({ blogs }: { blogs: any }) => (
	<div>
		<Head>
			<title>Home</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Nav />

		<div className="hero">
			<h1 className="title">Blogs</h1>
			{blogs.posts.map(blog => (
				<article key={blog.title}>
					<h1>{blog.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: blog.content }} />
				</article>
			))}
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

Blogs.getInitialProps = async ({ req }) => {
	const res = await fetch(`${API_URL}/api/blogs`);
	const json = await res.json();

	return { blogs: json };
};

export default Blogs;
