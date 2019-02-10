import React, { Fragment } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import SEO from "../components/seo";
import Box from "../components/box";
import { COLORS } from "../theme";

const WrapDate = styled.span`
  color: var(--main-bg-color);
  font-family: Staatliches;
  font-size: 1.5rem;
`;

const WrapTimeToRead = styled.span`
  font-family: Staatliches;
  display: inline-block;
  margin-left: 0.4rem;
  font-size: 1.5rem;
`;

export default function PageDefaultTemplate({ data }) {
  const post = data.markdownRemark;
  return (
    <Fragment>
      <SEO
        title={`Today I Learned: ${post.frontmatter.title}`}
        slug={post.fields.slug}
      />
      <Box flexDirection="row" alignItems="center" mt="1rem">
        <WrapDate>{post.frontmatter.date} — </WrapDate>
        <WrapTimeToRead>
          {post.timeToRead === 1 ? "1 min" : `${post.timeToRead} mins`} read
        </WrapTimeToRead>
      </Box>
      <h1 style={{ paddingTop: "1rem" }}>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Fragment>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
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
