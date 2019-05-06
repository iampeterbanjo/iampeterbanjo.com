/* eslint-disable camelcase */
/**
 * @typedef Route
 * @property { GET | POST | PUT | DELETE } method REST verbs
 * @property {string} path server path
 * @property {string} url request url
 */

const { slugger } = require('../utils');

const get_korin_tracks = () => {
	const url = '/korin/tracks';
	return {
		method: 'GET',
		path: url,
		url,
	};
};

const get_korin_profiles = (options = {}) => {
	const { artist = '', track = '' } = options;
	const artistParam = slugger.parse(artist);
	const trackParam = slugger.parse(track);
	return {
		method: 'GET',
		path: '/korin/profiles/{artist}/{track}',
		url: `/korin/profiles/${artistParam}/${trackParam}`,
	};
};

const get_blog_posts = () => {
	const url = '/blog/posts';

	return {
		method: 'GET',
		path: url,
		url,
	};
};

/**
 * Get route for blog details
 * @param {string} [post] Post markdown filename
 */
const get_blog_details = post => {
	return {
		method: 'GET',
		path: '/blog/posts/{post}',
		url: `/blog/posts/${post}`,
	};
};

/**
 * Get home page routes
 * @return Route
 */
const get_home = () => {
	return {
		method: 'GET',
		path: '/',
		url: '/',
	};
};

module.exports = {
	get_korin_tracks,
	get_korin_profiles,
	get_blog_posts,
	get_blog_details,
	get_home,
};
