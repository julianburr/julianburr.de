import React, { useContext } from "react";
import styled from "styled-components";
import Navigation from "../components/navigation";
import { RoutingProvider, RoutingContext } from "../context/routing";
import { GlobalStyles, BREAKPOINTS, COLORS } from "../theme";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${p => p.background};
  padding: 5rem;
  display: flex;
  transition: background 0.4s;

  ${BREAKPOINTS.MOBILE} {
    padding: 0.5rem;
  }
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${COLORS.WHITE};
  box-shadow: 0 0.5rem 3.5rem -1rem rgba(0, 0, 0, 0.2);
  position: relative;
  padding: 4rem 4rem 4rem 25rem;
  overflow: auto;

  ${BREAKPOINTS.MOBILE} {
    padding: 2.5rem 2.5rem 2.5rem 7.5rem;
  }
`;

const Content = styled.main`
  width: 100%;
  max-width: 70rem;
`;

function Layout({ children }) {
  const context = useContext(RoutingContext);
  return (
    <Container background={context.currentGridColor}>
      <GlobalStyles />
      <Stage id="stage">
        <Navigation />
        <Content>{children}</Content>
      </Stage>
    </Container>
  );
}

export default ({ location, children }) => (
  <RoutingProvider location={location}>
    <Layout>{children}</Layout>
  </RoutingProvider>
);
