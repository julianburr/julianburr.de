import React, { Fragment } from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import { Grid, Column } from "../components/grid";
import { List, Item } from "../components/list";
import Skill from "../components/skill";

export default function SkillsPage({ data }) {
  const skills = data.allMarkdownRemark.edges;

  function createFilter(name) {
    return e => e.node.frontmatter.category === name;
  }

  const languages = skills.filter(createFilter("Programming Languages"));
  const frameworks = skills.filter(createFilter("Frameworks & Libraries"));
  const tools = skills.filter(createFilter("Software & Tools"));
  const professional = skills.filter(createFilter("Professional Skills"));

  function renderSkills(skills) {
    return (
      <List pt=".5rem">
        {skills.map(l => (
          <Item key={l.id}>
            <Skill data={l.node} />
          </Item>
        ))}
      </List>
    );
  }

  return (
    <Fragment>
      <SEO title="Skills" />
      <h1>Skills</h1>
      <p>
        These are some of of the fields I currently work in and the tech I use.
        Click on any of them to find out how I use them and what similar tools I
        might have been working with in the past.
      </p>
      <Grid>
        <Column width={6}>
          <h2>Programming Languages</h2>
          {renderSkills(languages)}

          <h2>Frameworks & Libraries</h2>
          {renderSkills(frameworks)}
        </Column>
        <Column width={6}>
          <h2>Software & Tools</h2>
          {renderSkills(tools)}

          <h2>
            <strike>Soft</strike> Professional Skills
          </h2>
          {renderSkills(professional)}
        </Column>
      </Grid>
    </Fragment>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___rating] }
      filter: { fileAbsolutePath: { regex: "/pages/skills/.*$/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            title
            category
            order
            rating
          }
        }
      }
    }
  }
`;
