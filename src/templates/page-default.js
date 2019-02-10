import React, { Fragment } from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";

export default function PageDefaultTemplate({ data }) {
  const post = data.markdownRemark;
  return (
    <Fragment>
      <SEO title={post.frontmatter.title} slug={post.fields.slug} />
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Fragment>
  );
}

export const pageQuery = graphql`
  query ContentsBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`;
