import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import { SEO } from "../components/seo";
import { BREAKPOINTS } from "../theme";

const HeroImage = styled.img`
  width: 120%;
  margin-bottom: 2.4rem;

  ${BREAKPOINTS.DESKTOP} {
    width: 100%;
  }
`;

const ExternalLink = styled.a`
  display: block;
  margin: 2.4rem 0;
`;

export default function PageDefaultTemplate({ data }: { data: any }) {
  const post = data.markdownRemark;
  return (
    <>
      <SEO title={post.frontmatter.title} slug={post.fields.slug} />

      {post.frontmatter.heroUrl && <HeroImage src={post.frontmatter.heroUrl} />}

      {post.frontmatter.url && (
        <ExternalLink href={post.frontmatter.url} target="_blank">
          Also published here: {post.frontmatter.url}
        </ExternalLink>
      )}

      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  );
}

export const pageQuery = graphql`
  query ContentsBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        url
        heroUrl
      }
      fields {
        slug
      }
    }
  }
`;
