const fs = require("fs")
const path = require("path")
const Asciidoctor = require("asciidoctor")()
const { marked } = require("marked")

const site = require("../site.config")
const { layout } = require("../templates/layout")
const { blogSummary } = require("../templates/blog-summary")
const { twitterYearSummary } = require("../templates/twitter-year-summary")

const ROOT = path.join(__dirname, "..")
const SRC = path.join(ROOT, "src")
const PUBLIC = path.join(ROOT, "public")

// ---------- helpers ----------

const write = (relPath, contents) => {
  const fullPath = path.join(PUBLIC, relPath)
  fs.mkdirSync(path.dirname(fullPath), { recursive: true })
  fs.writeFileSync(fullPath, contents)
}

const copyRecursive = (from, to) => {
  if (!fs.existsSync(from)) return
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue
    const src = path.join(from, entry.name)
    const dest = path.join(to, entry.name)
    if (entry.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true })
      copyRecursive(src, dest)
    } else {
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.copyFileSync(src, dest)
    }
  }
}

const clean = () => {
  fs.rmSync(PUBLIC, { recursive: true, force: true })
  fs.mkdirSync(PUBLIC, { recursive: true })
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const formatDate = dateStr => {
  const [y, m, d] = dateStr.split("-").map(Number)
  return `${monthNames[m - 1]} ${String(d).padStart(2, "0")}, ${y}`
}

const rfc822 = dateStr => new Date(`${dateStr}T00:00:00Z`).toUTCString()

const extractPageAttributes = allAttributes =>
  Object.entries(allAttributes).reduce((pageAttributes, [key, value]) => {
    if (key.startsWith("page-")) {
      pageAttributes[key.replace(/^page-/, "")] = value
    }
    return pageAttributes
  }, {})

const renderAsciidoc = filePath => {
  const content = fs.readFileSync(filePath, "utf8")
  const doc = Asciidoctor.load(content, {
    base_dir: path.dirname(filePath),
    attributes: { imagesdir: "/images@" },
  })
  const html = doc.convert()
  const titlePart = doc.getDocumentTitle({ partition: true })
  const title = (titlePart && titlePart.getCombined()) || ""
  const pageAttributes = extractPageAttributes(doc.getAttributes())
  return { html, title, pageAttributes }
}

const slugFromFile = filePath => path.basename(filePath, path.extname(filePath))

const escapeXml = (str = "") =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

// ---------- content collection ----------

const blogDir = path.join(SRC, "blog")
const posts = fs
  .readdirSync(blogDir)
  .filter(f => f.endsWith(".adoc"))
  .map(f => {
    const filePath = path.join(blogDir, f)
    const { html, title, pageAttributes } = renderAsciidoc(filePath)
    const slug = `/blog/${slugFromFile(f)}/`
    return {
      slug,
      title: title || slug,
      html,
      date: pageAttributes.date,
      dateFormatted: formatDate(pageAttributes.date),
      summary: pageAttributes.summary,
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

const poetryDir = path.join(SRC, "poetry")
const poems = fs
  .readdirSync(poetryDir)
  .filter(f => f.endsWith(".adoc") && f !== "index.adoc")
  .map(f => {
    const filePath = path.join(poetryDir, f)
    const { html, pageAttributes } = renderAsciidoc(filePath)
    return {
      slug: `/poetry/${slugFromFile(f)}/`,
      title: pageAttributes.title,
      description: pageAttributes.description,
      html,
    }
  })

const twitterDir = path.join(SRC, "twitter")
const twitterMonths = fs
  .readdirSync(twitterDir)
  .filter(f => f.endsWith(".md"))
  .map(f => {
    const match = f.match(/(\d{4})-(\d{2})\.md$/)
    const [, year, month] = match
    const monthName = monthNames[Number(month) - 1]
    const filePath = path.join(twitterDir, f)
    const html = marked.parse(fs.readFileSync(filePath, "utf8"))
    return {
      slug: `/twitter/${year}-${month}/`,
      year,
      month,
      monthName,
      title: `Twitter - ${monthName} ${year}`,
      html,
    }
  })
  .sort((a, b) => (a.year + a.month).localeCompare(b.year + b.month))

// ---------- page renderers ----------

const pageArticle = html => `
  <article class="pa3 pa4-ns nested-copy-line-height nested-img">
    <section class="cf ph3 ph5-l pv3 pv4-l f4 tc-l center lh-copy mid-gray" style="max-width:1000px">
      ${html}
    </section>
  </article>`

const renderAdocPage = ({ title, description, html }, pathName) =>
  layout({
    pageTitle: title,
    pageDescription: description,
    pathName,
    body: pageArticle(html),
  })

const renderBlogPost = post =>
  layout({
    pageTitle: post.title,
    pageDescription: post.dateFormatted,
    seoDescription: post.summary,
    seoType: "article",
    publishedTime: `${post.date}T00:00:00Z`,
    pathName: post.slug,
    body: `
  <article class="pa3 pa4-ns nested-copy-line-height">
    <section class="cf ph3 ph5-l pv3 pv4-l f4 tl-l center lh-copy mid-gray" style="max-width:1000px">
      ${post.html}
    </section>
  </article>`,
  })

const renderBlogSummaries = postsForPage => `
  <article class="pa3 pa4-ns nested-copy-line-height nested-img">
    <section class="flex-ns flex-wrap justify-around mt5">
      ${postsForPage
        .map(p => blogSummary({ title: p.title, slug: p.slug, date: p.dateFormatted, summary: p.summary }))
        .join("")}
    </section>
  </article>`

const renderBlogList = postsForPage =>
  layout({
    pageTitle: "Blog",
    pageDescription: "musings for sharing",
    body: renderBlogSummaries(postsForPage),
  })

const renderHome = latestPosts =>
  layout({
    pageTitle: site.title,
    pageDescription: "Welcome to my blog",
    body: `
  <article class="cf ph3 ph5-l pv3 pv4-l f4 tc-l center measure-wide lh-copy mid-gray">
    <div class="paragraph">
      Welcome to my blog on software, cloud, microservices, programming and other topics of interest to me.
    </div>
  </article>
  ${renderBlogSummaries(latestPosts)}`,
  })

const renderTwitterMonth = month =>
  layout({
    pageTitle: month.title,
    seoDescription: `Ken Finnigan's tweets from ${month.monthName} ${month.year}.`,
    // NB: the deployed site's canonical for twitter pages historically has no
    // trailing slash (an artifact of the old slug-derivation logic) even though
    // the actual URL directory does; preserved here for parity.
    pathName: month.slug.replace(/\/$/, ""),
    body: `
  <article class="pa3 pa4-ns nested-copy-line-height nested-img">
    <section class="cf ph3 ph5-l pv3 pv4-l f4 tc-l center measure-wide lh-copy mid-gray">
      ${month.html}
    </section>
  </article>`,
  })

const renderTwitterList = months => {
  const byYear = months.reduce((acc, m) => {
    (acc[m.year] = acc[m.year] || []).push(m)
    return acc
  }, {})
  const years = Object.keys(byYear)
  return layout({
    pageTitle: "Twitter Archive",
    pageDescription: "archive of twitter musings",
    body: `
  <article class="pa3 pa4-ns nested-copy-line-height nested-img">
    <section class="flex-ns flex-wrap justify-around mt5">
      <ul class="list pl0 ml0">
        ${years.map(year => twitterYearSummary({ year, values: byYear[year] })).join("")}
      </ul>
    </section>
  </article>`,
  })
}

const render404 = () =>
  layout({
    seoTitle: "404: Not found",
    body: `<h1>NOT FOUND</h1><p>You just hit a route that doesn't exist... the sadness.</p>`,
  })

const renderRss = () => {
  const items = posts
    .map(
      p => `<item><title><![CDATA[${p.title}]]></title><description><![CDATA[${p.summary}]]></description><link>${site.siteUrl}${p.slug}</link><guid isPermaLink="false">${site.siteUrl}${p.slug}</guid><dc:creator><![CDATA[${site.author}]]></dc:creator><pubDate>${rfc822(p.date)}</pubDate><content:encoded>${escapeXml(p.html)}</content:encoded></item>`
    )
    .join("")
  return `<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[${site.title} - RSS Feed]]></title><description><![CDATA[${site.description}]]></description><link>${site.siteUrl}</link><generator>custom-build-script</generator><lastBuildDate>${new Date().toUTCString()}</lastBuildDate><author><![CDATA[${site.author}]]></author>${items}</channel></rss>`
}

// ---------- build ----------

clean()
copyRecursive(path.join(ROOT, "static"), PUBLIC)
copyRecursive(path.join(SRC, "images"), path.join(PUBLIC, "images"))
fs.mkdirSync(path.join(PUBLIC, "styles"), { recursive: true })
fs.copyFileSync(path.join(SRC, "styles", "site.css"), path.join(PUBLIC, "styles", "site.css"))

// about
const about = renderAsciidoc(path.join(SRC, "pages", "about.adoc"))
write("about/index.html", renderAdocPage({ title: about.pageAttributes.title, description: about.pageAttributes.description, html: about.html }))

// poetry
const poetryIndex = renderAsciidoc(path.join(poetryDir, "index.adoc"))
write("poetry/index.html", renderAdocPage({ title: poetryIndex.pageAttributes.title, description: poetryIndex.pageAttributes.description, html: poetryIndex.html }))
for (const poem of poems) {
  write(`${poem.slug}index.html`, renderAdocPage(poem))
}

// blog posts
for (const post of posts) {
  write(`${post.slug}index.html`, renderBlogPost(post))
}

// blog list (paginated)
const postsPerPage = 12
const numPages = Math.ceil(posts.length / postsPerPage)
for (let i = 0; i < numPages; i++) {
  const pagePosts = posts.slice(i * postsPerPage, (i + 1) * postsPerPage)
  const relPath = i === 0 ? "blog/index.html" : `blog/page/${i + 1}/index.html`
  write(relPath, renderBlogList(pagePosts))
}

// home
write("index.html", renderHome(posts.slice(0, 6)))

// twitter
for (const month of twitterMonths) {
  write(`${month.slug}index.html`, renderTwitterMonth(month))
}
write("twitter/index.html", renderTwitterList(twitterMonths))

// 404
const notFoundHtml = render404()
write("404.html", notFoundHtml)
write("404/index.html", notFoundHtml)

// rss
write("rss.xml", renderRss())

console.log(`Built ${posts.length} blog posts, ${poems.length} poems, ${twitterMonths.length} twitter months.`)
