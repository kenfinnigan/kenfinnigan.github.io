import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import BlogSummary from "../components/blog-summary"

const BlogList = ({ data, location /*, pageContext */ }) => {
  const posts = data.allAsciidoc.edges
//  const { currentPage, numPages } = pageContext
//  const isFirst = currentPage === 1
//  const isLast = currentPage === numPages

  return (
    <Layout location={location} pageTitle="Blog" pageDescription="musings for sharing">
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
        {/* TODO Page buttons _internal/pagination.html */}
      </article>
    </Layout>
  );
}

export default BlogList

BlogList.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
  pageContext: PropTypes.object,
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allAsciidoc(
      filter: { fields: { blog: { eq: true } } }
      sort: { fields: [pageAttributes___date], order: DESC }
      limit: $limit
      skip: $skip
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
