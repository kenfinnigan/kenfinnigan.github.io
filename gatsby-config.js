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
    description: `Personal blog of Ken Finnigan, stationary nomad in Pembroke, Massachusetts.`,
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
      mastodon: `https://fosstodon.org/@kenfinnigan`,
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
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                author
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allAsciidoc } }) => {
              return allAsciidoc.edges.map(edge => {
                return Object.assign({}, edge.node.document, {
                  description: edge.node.pageAttributes.summary,
                  date: edge.node.pageAttributes.date,
                  author: site.siteMetadata.author,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allAsciidoc(
                  sort: { pageAttributes: { date: DESC } }
                  filter: { fields: { blog: { eq: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields { slug }
                      document {
                        title
                      }
                      pageAttributes {
                        summary
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Musings of a stationary nomad - RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
  ],
}
