import { PropsWithChildren } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { COLORS } from "../theme";

const Container = styled((p) =>
  p.href ? <a target="_blank" {...p} /> : <Link {...p} />
)`
  width: 100%;
  padding: 2.5rem 4.5rem 2.5rem 2.5rem;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  font-weight: inherit;
  color: inherit;
  text-decoration: inherit;
  transition: box-shadow 0.3s;
  background: ${COLORS.GREY.LIGHT};
  position: relative;

  &:hover {
    color: inherit;
    text-decoration: inherit;
    box-shadow: 0 0.4rem 3.5rem -0.4rem rgba(0, 0, 0, 0.2);
  }
`;

type CardProps = PropsWithChildren<{
  linkTo?: string;
  linkState?: { [key: string]: any };
  href?: string;
  onClick?: (event: MouseEvent) => void;
}>;

export function Card({
  children,
  linkTo,
  linkState,
  href,
  onClick,
}: CardProps) {
  return (
    <Container to={linkTo} href={href} state={linkState} onClick={onClick}>
      {children}
    </Container>
  );
}
