const path = require(`path`)
const matter = require(`gray-matter`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    )
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result
  }, {}) // empty object is the initial value for result object
}

const date = new Date();
const getMonthName = (monthNumber) => {
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'long' });
}

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Asciidoc`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const isBlog = slug.startsWith("/blog");
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
    createNodeField({
      node,
      name: `blog`,
      value: isBlog
    })
  } else if (node.internal.type === `MarkdownRemark`) {
    const filePath = createFilePath({ node, getNode, basePath: `pages` })
    const isTwitter = filePath.startsWith("/twitter");
    const slug = filePath.substring(0, filePath.indexOf("-Tweet") - 3);
    const year = slug.substring(9, 13);
    const month = slug.substring(14);
    const monthName = getMonthName(month);
    const title = "Twitter - " + monthName + " " + year;
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
    createNodeField({
      node,
      name: `year`,
      value: year
    })
    createNodeField({
      node,
      name: `month`,
      value: month
    })
    createNodeField({
      node,
      name: `monthName`,
      value: monthName
    })
    createNodeField({
      node,
      name: `title`,
      value: title
    })
    createNodeField({
      node,
      name: `twitter`,
      value: isTwitter
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`src/templates/page-template.js`)
  const blogTemplate = path.resolve(`src/templates/blog-template.js`)
  const blogListTemplate = path.resolve(`src/templates/blog-list-template.js`)
  const twitterMthTemplate = path.resolve(`src/templates/twitter-mth-template.js`)
  const twitterListTemplate = path.resolve(`src/templates/twitter-list-template.js`)

  const adocResult = await graphql(`
    {
      pages: allAsciidoc(
        filter: { fields: { blog: { eq: false } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      posts: allAsciidoc(
        filter: { fields: { blog: { eq: true } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const mdResult = await graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { twitter: { eq: true } } }
        sort: [ { fields: { year: ASC } }, { fields: { month: ASC } } ]
      ) {
        edges {
          node {
            fields {
              slug
              year
              monthName
              title
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (adocResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  if (mdResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create Twitter Archive pages
  const twitterPosts = mdResult.data.allMarkdownRemark.edges
  twitterPosts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: twitterMthTemplate,
      context: {
        slug: node.fields.slug,
      }
    })
  })

  // Create Twitter Archive list
  const twitterPostsByYear = twitterPosts.map(({ node }) => {
    return {
      year: node.fields.year,
      monthName: node.fields.monthName,
      slug: node.fields.slug,
      title: node.fields.title,
    }
  })

  const twitterList = groupBy(twitterPostsByYear, "year")
  createPage({
    path: `/twitter`,
    component: twitterListTemplate,
    context: {
      twitterListByYear: twitterList
    }
  })

  // Create Asciidoc regular pages
  adocResult.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: pageTemplate,
      context: {
        slug: node.fields.slug,
      }
    })
  })

  // Create Asciidoc blog posts
  const posts = adocResult.data.posts.edges
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogTemplate,
      context: {
        slug: node.fields.slug,
      }
    })
  })

  // Create Blog Post list
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
      component: blogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      }
    })
  })
}