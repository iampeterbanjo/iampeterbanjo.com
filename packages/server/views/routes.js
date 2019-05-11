/* eslint-disable camelcase */
/**
 * @typedef { 'GET' | 'POST' | 'PUT' | 'DELETE' } Verbs
 * @typedef Route
 * @property {Verbs} method REST verbs
 * @property {string} path server path
 * @property {string} url request url
 */

const { slugger } = require('../utils');

const baseUrl = '/projects/korin';

/**
 * Get Korin tracks route
 * @return {Route}
 */
const get_korin_tracks = () => {
	const url = `${baseUrl}/tracks`;
	return {
		method: 'GET',
		path: url,
		url,
	};
};

/**
 * Get profile for track
 * @param {object} [options] Artist and track
 * @param {string} options.artist Artist
 * @param {string} options.track Track
 * @return {Route}
 */
const get_korin_profiles = options => {
	const { artist, track } = options || { artist: '', track: '' };
	const artistParam = slugger.parse(artist);
	const trackParam = slugger.parse(track);
	return {
		method: 'GET',
		path: `${baseUrl}/profiles/{artist}/{track}`,
		url: `${baseUrl}/profiles/${artistParam}/${trackParam}`,
	};
};

/**
 * Get blog posts route
 * @return {Route}
 */
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
 * @return {Route}
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
