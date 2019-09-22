import React, { Fragment } from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import dayjs from "dayjs";
import SEO from "../components/seo";
import Card from "../components/card";
import { List, Item } from "../components/list";

const Container = styled.div`
  width: 100%;
  max-width: 50rem;

  p {
    margin: 0;
    padding: 0.2rem 0 0.6rem;
    line-height: 1.2;
  }
`;

const WrapHeading = styled.div`
  display: inline-block;
  word-wrap: break-word;
  padding: 0.4rem 0;
  font-size: 2.2rem;
  font-family: Staatliches;
  line-height: 1.2;
`;

const RoleDate = styled.span`
  color: var(--main-bg-color);
  display: inline-block;
  padding: 0 0.8rem 0 0;
  font-size: 75%;
`;

export default function CurriculumVitaePage({ data }) {
  const roles = data.allMarkdownRemark.edges;
  return (
    <Container>
      <SEO title="Curriculum Vitae" />
      <h1>Curriculum Vitae</h1>
      <p>
        Below is a history of emplyers I worked for. Click through to see more
        details about what my roles were and what responsibilities were
        involved, as well as most importantly what I think I learned at each of
        them. Every single role made me grow professionally and personally.
      </p>
      <List mt="3rem">
        {roles.map(role => {
          const { frontmatter } = role.node;
          const current = dayjs(frontmatter.toFmt).isAfter(dayjs());
          return (
            <Item key={role.node.fields.slug} pb=".8rem">
              <Card linkTo={role.node.fields.slug}>
                <WrapHeading>
                  <RoleDate>
                    {current
                      ? `since ${frontmatter.from} — `
                      : `${frontmatter.from} to ${frontmatter.to} — `}
                  </RoleDate>
                  <span role="heading" aria-level="2">
                    {role.node.frontmatter.title}
                  </span>
                </WrapHeading>
                <p>{role.node.frontmatter.role}</p>
              </Card>
            </Item>
          );
        })}
      </List>
    </Container>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___from] }
      filter: { fileAbsolutePath: { regex: "/pages/curriculum-vitae/.*$/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            title
            role
            from(formatString: "MM/YYYY")
            to(formatString: "MM/YYYY")
            toFmt: to(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`;
