const { header, footer, seo } = require("./partials")

const layout = ({
  pageTitle = "",
  pageDescription = "",
  seoTitle = pageTitle,
  seoDescription = pageDescription,
  pathName,
  body,
}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${seo({ title: seoTitle, description: seoDescription, pathName })}
  <link rel="stylesheet" href="/styles/site.css" />
</head>
<body class="ma0 avenir bg-near-white">
  ${header(pageTitle, pageDescription)}
  <main class="pb7" role="main">${body}</main>
  ${footer()}
</body>
</html>
`

module.exports = { layout }
