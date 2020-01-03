import React, { Fragment } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import qs from "query-string";
import { graphql, Link } from "gatsby";
import SEO from "../components/seo";
import Card from "../components/card";
import { List, Item } from "../components/list";
import Pagination from "../components/pagination";

import { ReactComponent as BookSvg } from "../images/icons/book.svg";

dayjs.extend(customParseFormat);

const WrapHeading = styled.div`
  display: inline-block;
  word-wrap: break-word;
  padding: 0.4rem 0 0;
  font-size: 2.2rem;
  font-family: Staatliches;
  line-height: 1.1;
`;

const PostDate = styled.span`
  color: var(--main-bg-color);
  display: inline-block;
  padding: 0 0.8rem 0 0;
  font-size: 75%;
`;

const Description = styled.p`
  margin: 0;
  padding: 0.2rem 0 0.6rem;
  line-height: 1.2;
`;

const BookIcon = styled(BookSvg)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  height: 6rem;
  width: auto;
  opacity: 0.05;
`;

const WrapTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.8rem;
`;

const Tag = styled(Link)`
  display: inline-flex;
  padding: 0.8rem 1.2rem;
  margin: 0 0.4rem 0.4rem 0;
  background: ${p => (p.active ? "var(--main-bg-color)" : "#f7f4ee")};
  color: ${p => (p.active ? "#fff" : "#333")};
  font-family: Staatliches;
  transition: color 0.2s, background 0.2s;
  line-height: 1.1;

  &:hover {
    text-decoration: none;
    background: var(--main-bg-color);
    color: #fff;
  }
`;

export default function TILPage({ data, location }) {
  const posts = data.allMarkdownRemark.edges.filter(e =>
    dayjs(e.node.frontmatter.date, "DD/MM/YYYY").isBefore(dayjs())
  );

  const tags = posts
    .reduce((all, e) => {
      e.node.frontmatter.tags
        .split(",")
        .map(tag => tag.trim())
        .forEach(tag => {
          if (!all.includes(tag)) {
            all = [...all, tag];
          }
        });
      return all;
    }, [])
    .sort();

  const selectedTags = (qs.parse(location.search).tags || "")
    .split(",")
    .map(tag => tag.trim())
    .filter(Boolean);

  // Filter by selected tags
  const filteredPosts = posts.filter(e => {
    if (!selectedTags.length) {
      return true;
    }
    const tags = e.node.frontmatter.tags.split(",").map(tag => tag.trim());
    for (let i = 0; i < selectedTags.length; i++) {
      if (tags.includes(selectedTags[i])) {
        return true;
      }
    }
  });

  return (
    <Fragment>
      <SEO title="Today I Learned" image="preview-til.png" />
      <h1>Today I Learned</h1>
      <p>
        This is not a blog, just a collection of small bits and pieces of
        knowledge I picked up on my way. We learn something new every day, so I
        wanted to keep that gained knowledge accessible for later. It also makes
        sharing easier. Most of it is just random thoughts and code snippets,
        with links to further resources.
      </p>

      {!!tags.length && (
        <WrapTags>
          {tags.map(tag => {
            const active = selectedTags.includes(tag);
            const newTags = active
              ? selectedTags.filter(t => t !== tag).filter(Boolean)
              : [...selectedTags, tag].filter(Boolean);

            const to = newTags.length
              ? `/til?tags=${newTags.join(",")}`
              : "/til";

            return (
              <Tag active={active} to={to}>
                {tag}
              </Tag>
            );
          })}
        </WrapTags>
      )}

      {filteredPosts.length ? (
        <Fragment>
          <List mt="3rem">
            {filteredPosts.map(p => {
              const ttr =
                p.node.timeToRead === 1
                  ? "1 min read"
                  : `${p.node.timeToRead} mins read`;

              const isBook = p.node.frontmatter.tags
                .split(",")
                .find(tag => tag.trim() === "books");

              return (
                <Item key={p.node.fields.slug} pb=".8rem">
                  <Card
                    linkTo={p.node.fields.slug}
                    linkState={{ fromList: true }}
                  >
                    <WrapHeading>
                      <PostDate>{p.node.frontmatter.dateFormatted} —</PostDate>
                      <span role="heading" aria-level="2">
                        {p.node.frontmatter.title}
                      </span>
                    </WrapHeading>
                    <Description>
                      {p.node.frontmatter.description} — {ttr}
                    </Description>
                    {isBook && <BookIcon />}
                  </Card>
                </Item>
              );
            })}
          </List>
        </Fragment>
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
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            dateFormatted: date(formatString: "MMMM D, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`;
