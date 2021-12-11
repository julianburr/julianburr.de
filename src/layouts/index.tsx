import { PropsWithChildren, useContext } from "react";
import styled from "styled-components";

import { Navigation } from "../components/navigation";
import { RoutingProvider, RoutingContext } from "../context/routing";
import { GlobalStyles, BREAKPOINTS, COLORS } from "../theme";

const Container = styled.div<{ background: string }>`
  width: 100vw;
  height: 100vh;
  background: ${(p) => p.background};
  padding: 5rem;
  display: flex;
  transition: background 0.4s;

  ${BREAKPOINTS.MOBILE} {
    padding: 0.5rem;
  }
`;

const Stage = styled.div<{ invert: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${(p) => (p.invert ? "#111" : COLORS.WHITE)};
  color: ${(p) => (p.invert ? "#ddd" : undefined)};
  box-shadow: 0 0.5rem 3.5rem -1rem rgba(0, 0, 0, 0.2);
  position: relative;
  padding: 4rem 4rem 4rem 25rem;
  overflow: auto;
  transition: background 0.4s, color 0.4s;

  & a {
    color: ${(p) => (p.invert ? "#999" : undefined)};
    transition: color 0.4s;
  }

  ${BREAKPOINTS.MOBILE} {
    padding: 2.5rem 2.5rem 2.5rem 7.5rem;
  }
`;

const Content = styled.main`
  width: 100%;
  max-width: 70rem;
`;

type InnerProps = PropsWithChildren<Record<never, any>>;

function Inner({ children }: InnerProps) {
  const context = useContext(RoutingContext);
  return (
    <Container background={context.currentGridColor}>
      <GlobalStyles />
      <Stage id="stage" invert={context.currentGrid === "blm"}>
        <Navigation />
        <Content>{children}</Content>
      </Stage>
    </Container>
  );
}

type LayoutProps = PropsWithChildren<{ location: any }>;

export default function Layout({ location, children }: LayoutProps) {
  return (
    <RoutingProvider location={location}>
      <Inner>{children}</Inner>
    </RoutingProvider>
  );
}
