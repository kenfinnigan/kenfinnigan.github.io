import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const TwitterMthTemplate = ({ data, location }) => {
  return (
    <Layout location={location}
      pageTitle={data.markdownRemark.fields.title}
      pathName={data.markdownRemark.fields.slug}>

      <article className="pa3 pa4-ns nested-copy-line-height nested-img">
        <section className="cf ph3 ph5-l pv3 pv4-l f4 tc-l center measure-wide lh-copy mid-gray">
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </section>
      </article>
    </Layout>
  );
}

export default TwitterMthTemplate

TwitterMthTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark( fields: { slug: { eq: $slug } } ) {
      fields {
        slug
        title
        month
        year
      }
      html
      fileAbsolutePath
    }
  }
`
