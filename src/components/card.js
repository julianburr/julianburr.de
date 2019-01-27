import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { COLORS } from "../theme";

const Container = styled(p => <Link {...p} />)`
  width: 100%;
  padding: 2.5rem;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  font-weight: inherit;
  color: inherit;
  text-decoration: inherit;
  transition: box-shadow 0.3s;
  background: ${COLORS.GREY.LIGHT};

  &:hover {
    color: inherit;
    text-decoration: inherit;
    box-shadow: 0 0.4rem 3.5rem -0.4rem rgba(0, 0, 0, 0.2);
  }
`;

export default function Card({ children, linkTo }) {
  return <Container to={linkTo}>{children}</Container>;
}
