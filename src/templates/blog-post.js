import React, { Fragment } from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";

export default function BlogPostTemplate({ data }) {
  const post = data.markdownRemark;
  return (
    <Fragment>
      <SEO
        title={`Today I Learned: ${post.frontmatter.title}`}
        slug={post.fields.slug}
      />
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Fragment>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`;