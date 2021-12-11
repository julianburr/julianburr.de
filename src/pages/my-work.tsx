import { Link, graphql } from "gatsby";
import styled from "styled-components";

import { SEO } from "../components/seo";
import { Grid, Column } from "../components/grid";
import { Card } from "../components/card";

import { ReactComponent as MediumLogoSvg } from "../images/icons/medium.svg";
import { ReactComponent as MeetupLogoSvg } from "../images/icons/meetup.svg";
import { ReactComponent as DevToLogoSvg } from "../images/icons/devto.svg";

const Icons = {
  Medium: MediumLogoSvg,
  Meetup: MeetupLogoSvg,
  DevTo: DevToLogoSvg,
};

type Platform = keyof typeof Icons;

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

const Desc = styled.p`
  font-size: 1.2rem;
  line-height: 1.2;
`;

const WrapIcon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;

  & svg {
    color: #000;
    opacity: 0.05;
    height: 2rem;
    width: auto;
  }
`;

export default function MyWorkPage({ data }: { data: any }) {
  const work = data.allMarkdownRemark.edges;

  function createFilter(type: string) {
    return (e: any) => e.node.frontmatter.type === type;
  }

  const projects = work.filter(createFilter("Project"));
  const talks = work.filter(createFilter("Talk"));
  const blogs = work.filter(createFilter("Blog"));
  const oss = work.filter(createFilter("Open Source"));

  return (
    <>
      <SEO title="My Work" />
      <h1>My Work</h1>

      <h2>Talks</h2>
      <p>
        Even though I don't like public speaking, I always try to share my
        experience and the things I learn with others. The following are some of
        the talks I gave at local meetups.
      </p>
      <Group>
        {talks.map((talk: any) => {
          const platform: Platform = talk.node.frontmatter.platform;
          const Icon = Icons[platform];
          return (
            <GroupItem
              width={4}
              key={talk.node.fields.slug || talk.node.frontmatter.externalUrl}
            >
              <Card
                linkTo={talk.node.fields.slug}
                href={talk.node.frontmatter.externalUrl}
              >
                {Icon && (
                  <WrapIcon title={talk.node.frontmatter.platform}>
                    <Icon />
                  </WrapIcon>
                )}
                <WrapHeading>
                  <WorkYear>{talk.node.frontmatter.date} —</WorkYear>
                  <span role="heading" aria-level={3}>
                    {talk.node.frontmatter.title}
                  </span>
                </WrapHeading>
              </Card>
            </GroupItem>
          );
        })}
      </Group>

      <h2>Blog Posts</h2>
      <p>
        On top of the snippets in the <Link to="/til">TIL section</Link>, I also
        published articles on other platforms. My goal is to write more in the
        future, not only sharing my experience with others but also improving my
        own skills at the same time.
      </p>
      <Group>
        {blogs.map((post: any) => {
          const platform: Platform = post.node.frontmatter.platform;
          const Icon = Icons[platform];
          return (
            <GroupItem
              width={4}
              key={post.node.fields.slug || post.node.frontmatter.externalUrl}
            >
              <Card
                linkTo={post.node.fields.slug}
                href={post.node.frontmatter.externalUrl}
              >
                {Icon && (
                  <WrapIcon title={post.node.frontmatter.platform}>
                    <Icon />
                  </WrapIcon>
                )}
                <WrapHeading>
                  <WorkYear>{post.node.frontmatter.date} —</WorkYear>
                  <span role="heading" aria-level={3}>
                    {post.node.frontmatter.title}
                  </span>
                </WrapHeading>
              </Card>
            </GroupItem>
          );
        })}
      </Group>

      <h2>Open Source</h2>
      <p>
        Besides contributions to open source libraries, I created a few of my
        own.
      </p>
      <Group>
        {oss.map((project: any) => (
          <GroupItem
            width={4}
            key={
              project.node.fields.slug || project.node.frontmatter.externalUrl
            }
          >
            <Card
              linkTo={project.node.fields.slug}
              href={project.node.frontmatter.externalUrl}
            >
              <WrapHeading>
                <span role="heading" aria-level={3}>
                  {project.node.frontmatter.title}
                </span>
              </WrapHeading>
            </Card>
          </GroupItem>
        ))}
      </Group>

      <h2>Intesting Projects</h2>
      <p>
        A selection of interesting projects I worked on during my employments or
        as private side projects.
      </p>
      <Group>
        {projects.map((project: any) => (
          <GroupItem
            width={4}
            key={
              project.node.fields.slug || project.node.frontmatter.externalUrl
            }
          >
            <Card
              linkTo={project.node.fields.slug}
              href={project.node.frontmatter.externalUrl}
            >
              <WrapHeading>
                <WorkYear>{project.node.frontmatter.date} —</WorkYear>
                <span role="heading" aria-level={3}>
                  {project.node.frontmatter.title}
                </span>
              </WrapHeading>
              <Desc>{project.node.frontmatter.description}</Desc>
            </Card>
          </GroupItem>
        ))}
      </Group>
    </>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
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
            date(formatString: "YYYY")
            type
            platform
            externalUrl
          }
        }
      }
    }
  }
`;
