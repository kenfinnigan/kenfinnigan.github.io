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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-136937470-1",
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    `gatsby-transformer-asciidoc`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-eslint`,
  ],
}
