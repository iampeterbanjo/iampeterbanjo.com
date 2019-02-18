const { blog, assets } = require('./plugins/gatsby-source-filesystem');
const remark = require('./plugins/gatsby-transformer-remark');
const manifest = require('./plugins/gatsby-plugin-manifest');

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: `Kyle Mathews`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `kylemathews`
    }
  },
  plugins: [
    blog,
    assets,
    remark,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    manifest,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`
  ]
};
