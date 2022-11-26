import React from "react"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import TwitterYearSummary from "../components/twitter-year-summary"

const TwitterList = ({ location, pageContext }) => {
  const keys = Object.keys(pageContext.twitterListByYear);

  return (
    <Layout location={location} pageTitle="Twitter Archive" pageDescription="archive of twitter musings">
      <article className="pa3 pa4-ns nested-copy-line-height nested-img">
        <section className="flex-ns flex-wrap justify-around mt5">
          <ul className="list pl0 ml0">
          {keys.map((year) => (
            <TwitterYearSummary key={year} year={year} values={pageContext.twitterListByYear[year]} />
          ))}
          </ul>
        </section>
      </article>
    </Layout>
  );
}

export default TwitterList

TwitterList.propTypes = {
  location: PropTypes.object,
  pageContext: PropTypes.object.isRequired,
}
