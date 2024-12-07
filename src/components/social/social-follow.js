import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import NewWindowSVG from "./new-window"
import MastodonIconSVG from "./mastodon-icon"
import BlueSkyIconSVG from "./bluesky-icon"
import LinkedinIconSVG from "./linkedin-icon"
import GithubIconSVG from "./github-icon"

const SocialButtons = () => {
  const data = useStaticQuery(
    graphql`
      query SocialLinks {
        site {
          siteMetadata {
            socialLinks {
              mastodon
              blueSky
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
      <a href={socialLinks.mastodon} target="_blank" className="link-transition mastodon link dib z-999 pt3 pt0-l mr1" title="Mastodon link" rel="noopener noreferrer me" aria-label="follow on Mastodon——Opens in a new window">
        <MastodonIconSVG />
        <NewWindowSVG />
      </a>
      <a href={socialLinks.blueSky} target="_blank" className="link-transition bluesky link dib z-999 pt3 pt0-l mr1" title="Bluesky link" rel="noopener noreferrer" aria-label="follow on Bluesky——Opens in a new window">
        <BlueSkyIconSVG />
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
