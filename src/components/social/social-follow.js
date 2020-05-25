import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import NewWindowSVG from "./new-window"
import TwitterIconSVG from "./twitter-icon"
import LinkedinIconSVG from "./linkedin-icon"
import GithubIconSVG from "./github-icon"

const SocialButtons = () => {
  const data = useStaticQuery(
    graphql`
      query SocialLinks {
        site {
          siteMetadata {
            socialLinks {
              twitter
              linkedin
              github
            }
          }
        }
      }
    `
  )

  const socialLinks = data.site.siteMetadata.socialLinks

  return (
    <>
      <a href={socialLinks.twitter} target="_blank" className="link-transition twitter link dib z-999 pt3 pt0-l mr1" title="Twitter link" rel="noopener noreferrer" aria-label="follow on Twitter——Opens in a new window">
        <TwitterIconSVG />
        <NewWindowSVG />
      </a>
      <a href={socialLinks.linkedin} target="_blank" className="link-transition linkedin link dib z-999 pt3 pt0-l mr1" title="LinkedIn link" rel="noopener noreferrer" aria-label="follow on LinkedIn——Opens in a new window">
        <LinkedinIconSVG />
        <NewWindowSVG />
      </a>
      <a href={socialLinks.github} target="_blank" className="link-transition github link dib z-999 pt3 pt0-l mr1" title="Github link" rel="noopener noreferrer" aria-label="follow on Github——Opens in a new window">
        <GithubIconSVG />
        <NewWindowSVG />
      </a>
    </>
  )
}

export default SocialButtons
