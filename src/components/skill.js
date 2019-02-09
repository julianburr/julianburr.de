import React from "react";
import styled from "styled-components";
import { COLORS, BREAKPOINTS } from "../theme";

import { ReactComponent as Happy } from "../images/icons/smiley-happy.svg";
import { ReactComponent as Neutral } from "../images/icons/smiley-neutral.svg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  alignitems: center;
  padding: 0.2rem 0;
  font-weight: inherit;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

const Rating = styled.div`
  flex-shrink: 0;
  width: 10rem;
  margin-right: 2rem;

  ${BREAKPOINTS.MOBILE} {
    width: 8rem;
    margin-right: 1.4rem;
  }

  & svg {
    width: 20%;
    height: auto;
    color: ${COLORS.GREY.MEDIUM};

    &.active {
      color: var(--main-bg-color);
    }
  }
`;

const Title = styled.div`
  flex: 1;
`;

export default function Skill({ data }) {
  return (
    <Container>
      <Rating>
        {Array.from(Array(5)).map((_, i) => {
          const active = i + 1 <= parseInt(data.frontmatter.rating);
          const className = active ? "active" : undefined;
          const Icon = active ? Happy : Neutral;
          return <Icon className={className} />;
        })}
      </Rating>
      <Title>{data.frontmatter.title}</Title>
    </Container>
  );
}
