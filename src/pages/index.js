import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import BlogSummary from "../components/blog-summary"

const IndexPage = ({ data, location }) => {
  const pageTitle = data.site.siteMetadata.title
  const posts = data.allAsciidoc.edges

  return (
    <Layout location={location}
      pageTitle={pageTitle} pageDescription="Welcome to my blog">
      <article className="cf ph3 ph5-l pv3 pv4-l f4 tc-l center measure-wide lh-copy mid-gray">
        <div className="paragraph">
          Welcome to my blog on software, cloud, microservices, programming and other topics of interest to me.
        </div>
      </article>
      <article className="pa3 pa4-ns nested-copy-line-height nested-img">
        <section className="flex-ns flex-wrap justify-around mt5">
          {posts.map(({ node }) => {
            const title = node.document.title || node.fields.slug
            return (
              <BlogSummary key={node.fields.slug} title={title} slug={node.fields.slug}
                date={node.pageAttributes.date} summary={node.pageAttributes.summary} />
            )
          })}
        </section>
      </article>
    </Layout>
  );
}

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export const pageQuery = graphql`
  query SiteHomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allAsciidoc(
      filter: { fields: { blog: { eq: true } } }
      sort: { fields: [pageAttributes___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          document {
            title
          }
          pageAttributes {
            date(formatString: "MMMM DD, YYYY")
            summary
          }
        }
      }
    }
  }
`
