const path = require("path");
const fs = require("fs");
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

        const defaultTemplate = path.resolve(
          "./src/templates/page-default.tsx"
        );
        const blogTemplate = path.resolve("./src/templates/page-blog.tsx");
        const galleryTemplate = path.resolve(
          "./src/templates/page-gallery.tsx"
        );

        const pagesPath = path.resolve("./src/pages/");

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const relPath = node.fileAbsolutePath.substring(pagesPath.length);
          const type = relPath.split("/")[1];

          const baseTemplate = ["til", "library"].includes(type)
            ? blogTemplate
            : ["around-the-world"].includes(type) &&
              relPath.split("/").length > 1
            ? galleryTemplate
            : defaultTemplate;

          const typeTemplate = path.resolve(`./src/templates/page-${type}.tsx`);
          const template = fs.existsSync(typeTemplate)
            ? typeTemplate
            : baseTemplate;

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
