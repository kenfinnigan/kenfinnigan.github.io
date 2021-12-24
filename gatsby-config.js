const path = require("path");
// Get paths of Gatsby's required rules, which as of writing is located at:
// https://github.com/gatsbyjs/gatsby/tree/fbfe3f63dec23d279a27b54b4057dd611dce74bb/packages/
// gatsby/src/utils/eslint-rules
const gatsbyRequiredRules = path.join(
 process.cwd(),
 "node_modules",
 "gatsby",
 "dist",
 "utils",
 "eslint-rules"
);

module.exports = {
  siteMetadata: {
    title: `Musings of a stationary nomad`,
    description: `Personal blog of Ken Finnigan`,
    author: `Ken Finnigan`,
    menuLinks: [
      {
        name: `About`,
        url: `/about`,
      },
      {
        name: `Blog`,
        url: `/blog`,
      },
    ],
    siteUrl: `https://kenfinnigan.me/`,
    socialLinks: {
      twitter: `https://twitter.com/kenfinnigan`,
      linkedin: `https://linkedin.com/in/kenfinnigan`,
      github: `https://github.com/kenfinnigan`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "UA-136937470-1",
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    `gatsby-transformer-asciidoc`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
  ],
}
