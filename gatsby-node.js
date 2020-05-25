const path = require(`path`)
const matter = require(`gray-matter`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Asciidoc`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const isBlog = slug.startsWith("/blog");
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `blog`,
      value: isBlog
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`src/templates/page-template.js`)
  const blogTemplate = path.resolve(`src/templates/blog-template.js`)
  const blogListTemplate = path.resolve(`src/templates/blog-list-template.js`)

  const result = await graphql(`
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

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create Asciidoc regular pages
  result.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: pageTemplate,
      context: {
        slug: node.fields.slug,
      }
    })
  })

  // Create Asciidoc blog posts
  const posts = result.data.posts.edges
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