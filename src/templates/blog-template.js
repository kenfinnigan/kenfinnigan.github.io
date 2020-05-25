import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const AdocPostTemplate = ({ data, location }) => {
  return (
    <Layout location={location}
      pageTitle={data.asciidoc.document.title}
      pageDescription={data.asciidoc.pageAttributes.date}
      pathName={data.asciidoc.fields.slug}>

      <article className="pa3 pa4-ns nested-copy-line-height nested-img">
        <section className="cf ph3 ph5-l pv3 pv4-l f4 tc-l center measure-wide lh-copy mid-gray">
          <div dangerouslySetInnerHTML={{ __html: data.asciidoc.html }} />
        </section>
      </article>
    </Layout>
  );
}

export default AdocPostTemplate

AdocPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export const query = graphql`
  query($slug: String!) {
    asciidoc(fields: { slug: { eq: $slug } }) {
      html
      document {
        title
      }
      fields {
        slug
      }
      pageAttributes {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
