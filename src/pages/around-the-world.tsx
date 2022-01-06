import { graphql } from "gatsby";
import styled from "styled-components";

import { SEO } from "../components/seo";
import { WorldMap } from "../components/world-map";

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

export default function AroundTheWorldPage({ data }: { data: any }) {
  return (
    <>
      <SEO title="Around the World" />

      <Content>
        <h1>Around the World</h1>
      </Content>

      <WorldMap destinations={data.allMarkdownRemark.edges} />
    </>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/pages/around-the-world/.*$/" } }
    ) {
      edges {
        node {
          html
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            dateFormatted: date(formatString: "MMMM, YYYY")
            country
            place
            type
            latlng
            thumb
            images
          }
        }
      }
    }
  }
`;
