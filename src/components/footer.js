import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import SocialButtons from "./social/social-follow"

const Footer = ({ siteAuthor }) => {
  return (
    <footer className="bg-black bottom-0 w-100 pa3" role="contentinfo">
      <div className="flex justify-between">
        <Link to="/" className="f4 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
          &copy; {new Date().getFullYear()} {siteAuthor}
        </Link>
        <Link to="/rss.xml" className="f4 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
          RSS feed
        </Link>
        <div>
          <SocialButtons />
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  siteAuthor: PropTypes.string,
}

Footer.defaultProps = {
  siteAuthor: ``,
}

export default Footer
