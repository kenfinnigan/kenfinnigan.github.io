import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const AdocPageTemplate = ({ data, location }) => {
  return (
    <Layout location={location}
      pageTitle={data.asciidoc.pageAttributes.title}
      pageDescription={data.asciidoc.pageAttributes.description}>

      <article className="pa3 pa4-ns nested-copy-line-height nested-img">
        <section className="cf ph3 ph5-l pv3 pv4-l f4 tc-l center lh-copy mid-gray" style={{maxWidth: 750}}>
          <div dangerouslySetInnerHTML={{ __html: data.asciidoc.html }} />
        </section>
      </article>
    </Layout>
  );
}

export default AdocPageTemplate

AdocPageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export const query = graphql`
  query($slug: String!) {
    asciidoc(fields: { slug: { eq: $slug } }) {
      html
      pageAttributes {
        title
        description
      }
    }
  }
`
