import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const TwitterYearSummary = ({ year, values }) => {

  return (
    <li>
      <span className="f4 b">{year}</span>
      <ul className="list pl0 ml0 pt2 pb2">
        {values.map(({ month, monthName, slug }) => (
          <li key={month} className="pb1">
            <Link to={slug} className="link black dim">{monthName}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

TwitterYearSummary.propTypes = {
  year: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
}

export default TwitterYearSummary
