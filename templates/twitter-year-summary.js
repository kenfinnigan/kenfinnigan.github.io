const twitterYearSummary = ({ year, values }) => `
  <li>
    <span class="f4 b">${year}</span>
    <ul class="list pl0 ml0 pt2 pb2">
      ${values
        .map(
          ({ monthName, slug }) => `
      <li class="pb1"><a href="${slug}" class="link black dim">${monthName}</a></li>`
        )
        .join("")}
    </ul>
  </li>`

module.exports = { twitterYearSummary }
