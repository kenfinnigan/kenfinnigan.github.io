# kenfinnigan.me

Personal site and blog, built as plain static HTML/CSS by a small custom Node
build script — no client-side framework, no SSG plugin ecosystem to keep up
with.

## How it works

- Content is authored in AsciiDoc (`src/blog`, `src/poetry`, `src/pages/about.adoc`)
  and Markdown (`src/twitter`, an archive of old tweets).
- `scripts/build.js` reads that content, renders it through the plain
  JS-template-literal templates in `templates/`, and writes static HTML to
  `public/`.
- `site.config.js` holds site-wide metadata (title, author, nav links, social
  links) — the equivalent of the old `gatsby-config.js` siteMetadata.
- `static/` holds files copied to the site root as-is (images, `CNAME`, `robots.txt`).

## Commands

```shell
npm run build   # generate the site into public/
npm run serve   # serve public/ locally for preview
npm start        # build then serve
```

## Deploying

`.github/workflows/deploy.yml` runs `npm run build` on push to `develop` and
publishes the contents of `public/` to the `gh-pages` branch, which GitHub
Pages serves at the custom domain in `static/CNAME`.

## Adding content

- **Blog post**: add `src/blog/<slug>.adoc` with `:page-date:` and
  `:page-summary:` attributes and a `= Title` heading.
- **Poem**: add `src/poetry/<slug>.adoc` with `:page-title:`/`:page-description:`
  attributes, and link to it from `src/poetry/index.adoc`.
- **Twitter archive month**: add `src/twitter/<YYYY-MM-DD>-Tweet-Archive-<YYYY-MM>.md`.

Run `npm run build` afterwards to regenerate `public/`.
