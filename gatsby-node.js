const path = require("path");
const fs = require("fs");
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`);

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark(limit: 1000) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
                fileAbsolutePath
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          // eslint-disable-next-line
          console.log(result.errors);
          return reject(result.errors);
        }

        const defaultTemplate = path.resolve("./src/templates/page-default.js");
        const pagesPath = path.resolve("./src/pages/");

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const type = node.fileAbsolutePath
            .substring(pagesPath.length)
            .split("/")[1];

          const typeTemplate = path.resolve(`./src/templates/page-${type}.js`);
          const template = fs.existsSync(typeTemplate)
            ? typeTemplate
            : defaultTemplate;

          createPage({
            path: node.fields.slug,
            component: template,
            context: {
              slug: node.fields.slug
            } // additional data can be passed via context
          });
        });
        return;
      })
    );
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};
