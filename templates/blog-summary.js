const { escapeHtml } = require("./partials")

const blogSummary = ({ title, slug, date, summary }) => `
  <div class="relative w-100 w-30-l mb4 bg-white">
    <div class="relative w-100 mb4 bg-white nested-copy-line-height">
      <div class="bg-white mb3 pa4 gray overflow-hidden">
        <h1 class="f3 near-black">
          <a href="${slug}" class="link black dim">${escapeHtml(title)}</a>
        </h1>
        <div class="f6 lh-copy db pb2">${escapeHtml(date)}</div>
        <div class="f5 lh-copy">${escapeHtml(summary)}</div>
      </div>
    </div>
  </div>`

module.exports = { blogSummary }
