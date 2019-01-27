import React, { Fragment } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import SEO from "../components/seo";
import { Grid, Column } from "../components/grid";
import Card from "../components/card";

const Group = styled(Grid)`
  margin-top: 1.6rem;
  margin-bottom: 2.4rem;
`;

const GroupItem = styled(Column)`
  margin-bottom: 0.8rem;
`;

const WrapHeading = styled.div`
  display: inline-block;
  word-wrap: break-word;
  padding: 0.4rem 0;
  font-size: 1.6rem;
  font-family: Staatliches;
  line-height: 1.2;

  & h3 {
    margin: 0;
    padding: 0;
  }
`;

const WorkYear = styled.span`
  color: var(--main-bg-color);
  display: inline-block;
  padding: 0 0.8rem 0 0;
  font-size: 75%;
`;

export default function MyWorkPage({ data }) {
  const work = data.allMarkdownRemark.edges;

  function createFilter(type) {
    return e => e.node.frontmatter.type === type;
  }

  const projects = work.filter(createFilter("Project"));
  const talks = work.filter(createFilter("Talk"));
  const oss = work.filter(createFilter("Open Source"));

  return (
    <Fragment>
      <SEO title="My Work" />
      <h1>My Work</h1>
      <h2>Projects</h2>
      <p>Some examples of the projects I did and am currently working on.</p>
      <Group>
        {projects.map((project, i) => (
          <GroupItem width={4}>
            <Card linkTo={project.node.fields.slug}>
              <WrapHeading>
                <WorkYear>{project.node.frontmatter.year} —</WorkYear>
                <span role="heading" aria-level="3">
                  {project.node.frontmatter.title}
                </span>
              </WrapHeading>
              {i < 3 && <p>{project.node.frontmatter.description}</p>}
            </Card>
          </GroupItem>
        ))}
      </Group>

      <h2>Talks & Blog Posts</h2>
      <p>
        Even though I don't like public speaking, I always try to share my
        experience and the things I learn with others. On top of the snippets in
        the <Link to="/til">TIL section</Link>, I also did some talks at local
        meetups and published some other blog posts on the internet.
      </p>
      <Group>
        {talks.map((talk, i) => (
          <GroupItem width={4}>
            <Card linkTo={talk.node.fields.slug}>
              <WrapHeading>
                <WorkYear>{talk.node.frontmatter.year} —</WorkYear>
                <span role="heading" aria-level="3">
                  {talk.node.frontmatter.title}
                </span>
              </WrapHeading>
            </Card>
          </GroupItem>
        ))}
      </Group>

      <h2>Open Source</h2>
      <p>
        Besides contributions to open source libraries, I created a few of my
        own.
      </p>
      <Group>
        {oss.map((project, i) => (
          <GroupItem width={4}>
            <Card linkTo={project.node.fields.slug}>
              <WrapHeading>
                <span role="heading" aria-level="3">
                  {project.node.frontmatter.title}
                </span>
              </WrapHeading>
            </Card>
          </GroupItem>
        ))}
      </Group>
    </Fragment>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___year] }
      filter: { fileAbsolutePath: { regex: "/pages/my-work/.*$/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            title
            description
            year
            type
          }
        }
      }
    }
  }
`;
