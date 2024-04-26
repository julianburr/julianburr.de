import { Link, graphql } from "gatsby";
import styled from "styled-components";

import { SEO } from "../components/seo";
import { Card } from "../components/card";

import { ReactComponent as MediumLogoSvg } from "../images/icons/medium.svg";
import { ReactComponent as MeetupLogoSvg } from "../images/icons/meetup.svg";
import { ReactComponent as DevToLogoSvg } from "../images/icons/devto.svg";
import { ReactComponent as ConferenceSvg } from "../images/icons/conference.svg";
import { BREAKPOINTS } from "../theme";

const Icons = {
  Medium: MediumLogoSvg,
  Meetup: MeetupLogoSvg,
  DevTo: DevToLogoSvg,
  Conference: ConferenceSvg,
};

type Platform = keyof typeof Icons;

const Group = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;

  ${BREAKPOINTS.TABLET} {
    grid-template-columns: 1fr 1fr;
  }

  ${BREAKPOINTS.MOBILE} {
    grid-template-columns: 1fr;
  }
`;

const GroupItem = styled.div`
  & > * {
    width: 100%;
    height: 100%;
  }
`;

const WrapHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
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
    return (e: any) =>
      e.node.fields.slug.split("/").filter(Boolean)?.[1] === type;
  }

  const projects = work.filter(createFilter("projects"));
  const sideProjects = work.filter(createFilter("side-projects"));
  const talks = work.filter(createFilter("talks"));
  const blogs = work.filter(createFilter("blog"));
  const oss = work.filter(createFilter("open-source"));

  return (
    <>
      <SEO title="My Work" />
      <h1>My Work</h1>

      <h2>Talks</h2>
      <p>
        Even though I wouldn't consider public speaking one of my strongest
        skills (yet), being out of my comfort zone, I always try to share my
        experience and the things I learn with others. The following are some of
        the talks I've given at meetups and conferences:
      </p>
      <Group>
        {talks.map((talk: any) => {
          const platform: Platform = talk.node.frontmatter.platform;
          const Icon = Icons[platform];
          return (
            <GroupItem
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
                  <WorkYear>
                    {talk.node.frontmatter.date} — @{" "}
                    {talk.node.frontmatter.event}
                  </WorkYear>
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
        Besides contributions to open source libraries, I created{" "}
        <a
          href="https://github.com/julianburr"
          target="_blank"
          rel="noreferrer"
        >
          a few of my own
        </a>
        .
      </p>
      <Group>
        {oss.map((project: any) => (
          <GroupItem
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

      <h2>Interesting Side Projects</h2>
      <p>
        I usually use side projects more with learning in mind than anything
        else, but every now and then I actually do finish one 😅
      </p>
      <Group>
        {sideProjects.map((project: any) => (
          <GroupItem
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

      <h2>Work Projects</h2>
      <p>
        A selection of interesting projects I worked on during my employments.
      </p>
      <Group>
        {projects.map((project: any) => (
          <GroupItem
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
            event
            externalUrl
          }
        }
      }
    }
  }
`;
