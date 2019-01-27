module.exports = {
  siteMetadata: {
    title: "Julian Burr",
    description: "My personal website",
    author: "Julian Burr <hello@julianburr.de>"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`
      }
    },
    "gatsby-plugin-layout",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        start_url: "/",
        background_color: "#C5AC8B",
        theme_color: "#C5AC8B",
        icon: "src/images/icon.png"
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        svgoConfig: {
          plugins: {
            removeViewBox: false
          }
        }
      }
    }
  ]
};
