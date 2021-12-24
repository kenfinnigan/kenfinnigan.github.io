import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Seo from "./seo"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ pageTitle, pageDescription, pathName, children }) => {
  const data = useStaticQuery(graphql`
    query AuthorQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} pathName={pathName} />
      <Header pageTitle={pageTitle}
        pageDescription={pageDescription}
        siteAuthor={data.site.siteMetadata.author}
      />
      <main className="pb7" role="main">{children}</main>
      <Footer siteAuthor={data.site.siteMetadata.author} />
    </>
  )
}

Layout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDescription: PropTypes.string,
  pathName: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Layout
