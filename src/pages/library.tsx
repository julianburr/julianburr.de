import styled from "styled-components";
import qs from "query-string";
import { graphql, Link } from "gatsby";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { SEO } from "../components/seo";
import { Card } from "../components/card";
import { List, Item } from "../components/list";

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

const WrapTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.8rem;
`;

const Tag = styled(Link)<{ active: boolean }>`
  display: inline-flex;
  padding: 0.8rem 1.2rem;
  margin: 0 0.4rem 0.4rem 0;
  background-color: ${(p) => (p.active ? "var(--main-bg-color)" : "#f7f4ee")};
  color: ${(p) => (p.active ? "#fff" : "#333")};
  font-family: Staatliches;
  line-height: 1.1;

  && {
    transition: color 0.2s, background-color 0.2s;
  }

  &:hover {
    text-decoration: none;
    background-color: var(--main-bg-color);
    color: #fff;
  }
`;

export default function LibraryPage({
  data,
  location,
}: {
  data: any;
  location: any;
}) {
  const posts = data.allMarkdownRemark.edges.filter((e: any) =>
    dayjs(e.node.frontmatter.date, "DD/MM/YYYY").isBefore(dayjs())
  );

  const tags = posts
    .reduce((all: string[], e: any) => {
      e.node.frontmatter.tags
        .split(",")
        .map((tag: string) => tag.trim())
        .forEach((tag: string) => {
          if (!all.includes(tag)) {
            all = [...all, tag];
          }
        });
      return all;
    }, [])
    .sort();

  const selectedTags = ((qs.parse(location.search).tags as string) || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  // Filter by selected tags
  const filteredPosts = posts.filter((e: any) => {
    if (!selectedTags.length) {
      return true;
    }
    const tags = e.node.frontmatter.tags
      .split(",")
      .map((tag: string) => tag.trim());
    for (let i = 0; i < selectedTags.length; i++) {
      if (tags.includes(selectedTags[i])) {
        return true;
      }
    }
  });

  return (
    <>
      <SEO title="My Library" image="preview-til.png" />
      <h1>My Library</h1>
      <p>
        Just a collection of books I've been reading that I would recommend.
        This is by no means a complete list or anything, and you'll also find
        that it might contain a book or two that have nothing to do with
        programming or business. I just enjoyed reading them.
      </p>

      {!!tags.length && (
        <WrapTags>
          {tags.map((tag: string) => {
            const active = selectedTags.includes(tag);
            const newTags = active
              ? selectedTags.filter((t) => t !== tag).filter(Boolean)
              : [...selectedTags, tag].filter(Boolean);

            const to = newTags.length
              ? `/library?tags=${newTags.join(",")}`
              : "/library";

            return (
              <Tag active={active} to={to} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </WrapTags>
      )}

      {filteredPosts.length ? (
        <>
          <List mt="3rem">
            {filteredPosts.map((p: any) => {
              const ttr =
                p.node.timeToRead === 1
                  ? "1 min read"
                  : `${p.node.timeToRead} mins read`;

              return (
                <Item key={p.node.fields.slug} pb=".8rem">
                  <Card
                    linkTo={p.node.fields.slug}
                    linkState={{ fromList: true }}
                  >
                    <WrapHeading>
                      <PostDate>{p.node.frontmatter.dateFormatted} —</PostDate>
                      <span role="heading" aria-level={2}>
                        {p.node.frontmatter.title}
                      </span>
                    </WrapHeading>
                    <Description>
                      {p.node.frontmatter.description} — {ttr}
                    </Description>
                  </Card>
                </Item>
              );
            })}
          </List>
        </>
      ) : (
        <p>No posts found.</p>
      )}
    </>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/pages/library/.*$/" } }
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
