/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require('slugify')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `DatabaseJson`) {
    const slug = slugify(node.name)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
};

/**
 *  Create slug pages for videos in JSON
 *  Create archive pages for each tag
 */
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatabaseJson {
          edges {
            node {
              name
              service
              speaker {
                name
                website
              }
              tags
              date
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      /**
       * Create blog posts based on slugs
       */
      result.data.allDatabaseJson.edges.forEach(({ node }) => {
        // Grab random tag to do related posts
        var tag = node.tags[Math.floor(Math.random() * node.tags.length)];

        createPage({
          path: `/v/${node.fields.slug}`,
          component: path.resolve(`./src/templates/video-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            tag: tag,
            slug: node.fields.slug
          }
        });
      });

      /**
       * Create archive pages for tags
       */
        let tags = []
      // Iterate through each post, putting all found tags into `tags`
        result.data.allDatabaseJson.edges.forEach(({ node }) => {
          if ('tags' in node) {
            tags = tags.concat(node.tags)
          }
        })

      // Eliminate duplicate tags
      tags = tags.filter(function (item, i, ar) { return ar.indexOf(item) === i; });

      // Make tag pages 
      tags.forEach(tag => {
          let tagName = tag.replace(/\s+/g, '-').toLowerCase();
          createPage({
              path: `/tag/${tagName}/`,
              component: path.resolve(`./src/templates/tag-archive.js`),
              context: {
                  tag: tag,
              },
          });
      });

      resolve();
    });
  })
};