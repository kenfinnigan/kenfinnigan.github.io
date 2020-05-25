import PropTypes from "prop-types"
import React from "react"

import Navigation from "./navigation"

const Header = ({ pageTitle, pageDescription, siteAuthor }) => {
  return (
      <header className="cover bg-top">
        <div className="bg-black-60">
          <Navigation siteAuthor={siteAuthor} />
          <div className="tc-l pv4 pv6-l ph3 ph4-ns">
            <h1 className="f-subheadline-l fw2 white-90 mb0 lh-title">
              {pageTitle}
            </h1>
            {pageDescription.length > 0 &&
              <h2 className="fw1 f5 f3-l white-80 measure-wide-l center mt3">
                {pageDescription}
              </h2>
            }
          </div>
        </div>
      </header>
  )
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDescription: PropTypes.string,
  siteAuthor: PropTypes.string,
}

Header.defaultProps = {
  pageDescription: ``,
  siteAuthor: ``,
}

export default Header
