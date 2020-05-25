import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const BlogSummary = ({ title, slug, date, summary }) => {
  return (
    <div className="relative w-100 w-30-l mb4 bg-white">
      <div className="relative w-100 mb4 bg-white nested-copy-line-height">
        <div className="bg-white mb3 pa4 gray overflow-hidden">
          <h1 className="f3 near-black">
            <Link to={slug} className="link black dim">
              {title}
            </Link>
          </h1>
          <div className="f6 lh-copy db pb2">
            {date}
          </div>
          <div className="f5 lh-copy">
            {summary}
          </div>
        </div>
      </div>
    </div>
  );
}

BlogSummary.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
}

export default BlogSummary
