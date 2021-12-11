const path = require("path");
const fs = require("fs");
const twemoji = require("twemoji");
const { createFilePath } = require("gatsby-source-filesystem");

function createPages({ actions, graphql }) {
  const { createPage } = actions;

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
      `).then((result) => {
        if (result.errors) {
          // eslint-disable-next-line
          console.log(result.errors);
          return reject(result.errors);
        }

        // Individual blog posts
        const defaultTemplate = path.resolve(
          "./src/templates/page-default.tsx"
        );
        const pagesPath = path.resolve("./src/pages/");

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const type = node.fileAbsolutePath
            .substring(pagesPath.length)
            .split("/")[1];

          const typeTemplate = path.resolve(`./src/templates/page-${type}.tsx`);
          const template = fs.existsSync(typeTemplate)
            ? typeTemplate
            : defaultTemplate;

          createPage({
            path: node.fields.slug,
            component: template,
            context: {
              slug: node.fields.slug,
            }, // additional data can be passed via context
          });
        });
        return;
      })
    );
  });
}

function onCreateNode({ node, getNode, actions }) {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    const content = node.internal.content;
    node.internal.content = twemoji.parse(content, {
      ext: ".svg",
      size: "svg",
    });
  }
}

function onCreateBabelConfig({ actions }) {
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  });
}

module.exports = {
  createPages,
  onCreateNode,
  onCreateBabelConfig,
};
