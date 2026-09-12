const site = require("../site.config")
const { newWindowIcon, mastodonIcon, blueSkyIcon, linkedinIcon, githubIcon } = require("./icons")

const escapeHtml = (str = "") =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

const socialButtons = () => {
  const { mastodon, blueSky, linkedin, github } = site.socialLinks
  return `
    <a href="${mastodon}" target="_blank" class="link-transition mastodon link dib z-999 pt3 pt0-l mr1" title="Mastodon link" rel="noopener noreferrer me" aria-label="follow on Mastodon——Opens in a new window">
      ${mastodonIcon()}
      ${newWindowIcon()}
    </a>
    <a href="${blueSky}" target="_blank" class="link-transition bluesky link dib z-999 pt3 pt0-l mr1" title="Bluesky link" rel="noopener noreferrer" aria-label="follow on Bluesky——Opens in a new window">
      ${blueSkyIcon()}
      ${newWindowIcon()}
    </a>
    <a href="${linkedin}" target="_blank" class="link-transition linkedin link dib z-999 pt3 pt0-l mr1" title="LinkedIn link" rel="noopener noreferrer" aria-label="follow on LinkedIn——Opens in a new window">
      ${linkedinIcon()}
      ${newWindowIcon()}
    </a>
    <a href="${github}" target="_blank" class="link-transition github link dib z-999 pt3 pt0-l mr1" title="GitHub link" rel="noopener noreferrer" aria-label="follow on GitHub——Opens in a new window">
      ${githubIcon()}
      ${newWindowIcon()}
    </a>`
}

const navigation = () => `
  <nav class="pv3 ph3 ph4-ns" role="navigation">
    <div class="flex-l justify-between items-center center">
      <a href="/" class="f3 fw2 hover-white no-underline white-90 dib">${site.author}</a>
      <div class="flex-l items-center">
        <ul class="pl0 mr3">
          ${site.menuLinks
            .map(
              link => `
          <li class="list f5 f4-ns fw4 dib pr3">
            <a href="${link.url}" class="hover-white no-underline white-90">${link.name}</a>
          </li>`
            )
            .join("")}
        </ul>
        ${socialButtons()}
      </div>
    </div>
  </nav>`

const header = (pageTitle, pageDescription = "") => `
  <header class="cover bg-top">
    <div class="bg-black-60">
      ${navigation()}
      <div class="tc-l pv4 pv6-l ph3 ph4-ns">
        <h1 class="f-subheadline-l fw2 white-90 mb0 lh-title">${escapeHtml(pageTitle)}</h1>
        ${
          pageDescription.length > 0
            ? `<h2 class="fw1 f5 f3-l white-80 measure-wide-l center mt3">${escapeHtml(pageDescription)}</h2>`
            : ""
        }
      </div>
    </div>
  </header>`

const footer = () => `
  <footer class="bg-black bottom-0 w-100 pa3" role="contentinfo">
    <div class="flex justify-between">
      <a href="/" class="f4 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
        &copy; ${new Date().getFullYear()} ${site.author}
      </a>
      <a href="/rss.xml" class="f4 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
        RSS feed
      </a>
      <div>
        ${socialButtons()}
      </div>
    </div>
  </footer>`

const seo = ({ title, description, pathName }) => {
  const metaDescription = description || site.description
  const canonical = pathName ? `${site.siteUrl}${pathName}` : null
  return `
    <title>${escapeHtml(site.author)} | ${escapeHtml(title)}</title>
    ${canonical ? `<link rel="canonical" href="${canonical}" />` : ""}
    <meta name="description" content="${escapeHtml(metaDescription)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(metaDescription)}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content="${escapeHtml(site.author)}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(metaDescription)}" />`
}

module.exports = { header, footer, seo, escapeHtml }
