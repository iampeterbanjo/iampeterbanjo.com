const { blog, assets } = require('./plugins/gatsby-source-filesystem');
const remark = require('./plugins/gatsby-transformer-remark');
const manifest = require('./plugins/gatsby-plugin-manifest');

module.exports = {
  siteMetadata: {
    title: `Personal portfolio and blog`,
    author: `Peter Banjo`,
    description: `Building on and for the web.`,
    siteUrl: `https://iampeterbanjo.com/`,
    social: {
      twitter: `dayosuperstar`
    }
  },
  plugins: [
    assets,
    blog,
    manifest,
    remark,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`
  ]
};
