import PropTypes from "prop-types"
import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import SocialButtons from "./social/social-follow"

const Navigation = ({ siteAuthor }) => {
  const data = useStaticQuery(
    graphql`
      query MenuData {
        site {
          siteMetadata {
            menuLinks {
              name
              url
            }
          }
        }
      }
    `
  )

  const menuItems = data.site.siteMetadata.menuLinks

  return (
    <nav className="pv3 ph3 ph4-ns" role="navigation">
      <div className="flex-l justify-between items-center center">
        <Link to="/" className="f3 fw2 hover-white no-underline white-90 dib">
          {siteAuthor}
        </Link>
        <div className="flex-l items-center">
          <ul className="pl0 mr3">
            {menuItems.map(link => (
              <li key={link.name} className="list f5 f4-ns fw4 dib pr3">
                <Link to={link.url} className="hover-white no-underline white-90">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <SocialButtons />
        </div>
      </div>
    </nav>
  )
}

Navigation.propTypes = {
  siteAuthor: PropTypes.string.isRequired,
}

export default Navigation
