import React, { Fragment } from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import Card from "../components/card";
import { List, Item } from "../components/list";

const WrapHeading = styled.div`
  display: inline-block;
  word-wrap: break-word;
  padding: 0.4rem 0;
  font-size: 2.2rem;
  font-family: Staatliches;
  line-height: 1.2;
`;

const PostDate = styled.span`
  color: var(--main-bg-color);
  display: inline-block;
  padding: 0 0.8rem 0 0;
  font-size: 75%;
`;

export default function TILPage({ data }) {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Fragment>
      <SEO title="Today I Learned" />
      <h1>Today I Learned</h1>
      <p>
        This is not a blog, just a collection of small bits and pieces of
        knowledge I picked up on my way. We learn something new every day, so I
        wanted to keep that gained knowledge accessible for later. It also makes
        sharing easier. Most of it is just random thoughts and code snippets,
        with links to further resources.
      </p>
      {posts.length ? (
        <List mt="3rem">
          {posts.map(p => (
            <Item key={p.node.fields.slug} pb=".8rem">
              <Card linkTo={p.node.fields.slug}>
                <WrapHeading>
                  <PostDate>{p.node.frontmatter.date} —</PostDate>
                  <span role="heading" aria-level="2">
                    {p.node.frontmatter.title}
                  </span>
                </WrapHeading>
                <p>{p.node.frontmatter.description}</p>
              </Card>
            </Item>
          ))}
        </List>
      ) : (
        <p>No posts found.</p>
      )}
    </Fragment>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/pages/til/.*$/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
