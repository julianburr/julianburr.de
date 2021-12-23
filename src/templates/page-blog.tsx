import { graphql, Link } from "gatsby";
import styled from "styled-components";

import { SEO } from "../components/seo";
import { Box } from "../components/box";
import { BookPreview } from "../components/book-preview";

const BackLink = styled(Link)`
  color: var(--main-bg-color);
  font-family: Staatliches;
  font-size: 1.5rem;
  font-weight: 500;
`;

const WrapDate = styled.span`
  color: var(--main-bg-color);
  font-family: Staatliches;
  font-size: 1.5rem;
  margin-left: 0.4rem;
`;

const WrapTimeToRead = styled.span`
  font-family: Staatliches;
  display: inline-block;
  margin-left: 0.4rem;
  font-size: 1.5rem;
`;

export default function PageBlogTemplate({
  data,
  location,
}: {
  data: any;
  location: any;
}) {
  const isBook = location.pathname?.startsWith("/library");
  const post = data.markdownRemark;

  return (
    <>
      <SEO
        title={
          isBook
            ? `My Library: ${post.frontmatter.title}`
            : `Today I Learned: ${post.frontmatter.title}`
        }
        slug={post.fields.slug}
        image="preview-til.png"
      />
      <Box flexDirection="row" alignItems="center" mt="1rem">
        <BackLink
          to={isBook ? "/library" : "/til"}
          onClick={(e) => {
            if (location.state.fromList) {
              e.preventDefault();
              if (window.history) {
                window.history.go(-1);
              }
            }
          }}
        >
          ← Back to the list
        </BackLink>
        <WrapDate> — {post.frontmatter.date} — </WrapDate>
        <WrapTimeToRead>
          {post.timeToRead === 1 ? "1 min" : `${post.timeToRead} mins`} read
          {post.frontmatter.tags ? ` — ${post.frontmatter.tags}` : ""}
        </WrapTimeToRead>
      </Box>
      <h1 style={{ paddingTop: "1rem" }}>{post.frontmatter.title}</h1>
      {isBook && (
        <BookPreview
          cover={post.frontmatter.cover}
          author={post.frontmatter.author}
          title={post.frontmatter.title}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
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
        date(formatString: "MMMM D, YYYY")
        tags
        author
        cover
      }
      fields {
        slug
      }
    }
  }
`;
