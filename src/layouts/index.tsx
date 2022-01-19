import { PropsWithChildren, useContext, useEffect } from "react";
import styled from "styled-components";
import twemoji from "twemoji";

import { Navigation } from "../components/navigation";
import { RoutingProvider, RoutingContext } from "../context/routing";
import { GlobalStyles, BREAKPOINTS, COLORS } from "../theme";

const Container = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  background: ${(p) => p.background};
  padding: 5rem;
  display: flex;
  transition: background 0.4s;
  position: relative;

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

const GalleryContainer = styled.main`
  width: 100%;
  height: 100%;
  background: yellow;
`;

type InnerProps = PropsWithChildren<Record<never, any>>;

function Inner({ children }: InnerProps) {
  const context = useContext(RoutingContext);
  return (
    <Container background={context.currentGridColor}>
      <Stage id="stage" invert={context.currentGrid === "blm"} tabIndex={0}>
        <Navigation />
        <Content id="content">{children}</Content>
      </Stage>
    </Container>
  );
}

function InnerGallery({ children }: InnerProps) {
  return <GalleryContainer>{children}</GalleryContainer>;
}

type LayoutProps = PropsWithChildren<{ location: any }>;

export default function Layout({ location, children }: LayoutProps) {
  useEffect(() => {
    twemoji.parse(window.document.body, {
      ext: ".svg",
      size: "svg",
    });
  }, [location.pathname]);

  const isGallery =
    location.pathname?.startsWith("/around-the-world/") &&
    location.pathname !== "/around-the-world/";

  return (
    <RoutingProvider location={location}>
      <GlobalStyles />
      {isGallery ? (
        <InnerGallery>{children}</InnerGallery>
      ) : (
        <Inner>{children}</Inner>
      )}
    </RoutingProvider>
  );
}
