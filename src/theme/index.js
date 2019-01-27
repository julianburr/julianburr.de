import { createGlobalStyle } from "styled-components";

import "../fonts/montserrat.css";
import "../fonts/staatliches.css";

export const COLORS = {
  WHITE: "#FAF9F6",
  BLACK: "#222",

  GREY: {
    LIGHT: "#F7F4EE",
    MEDIUM: "#E8E4DE"
  },

  BEIGE: "#C5AC8B",
  GREEN: "#9CCA6C",
  YELLOW: "#F7AD08",
  PURPLE: "#CA85D8",
  BLUE: "#599AE5",
  RED: "#DA7A70"
};

export const BREAKPOINTS = {
  MOBILE: "@media (max-width: 600px)",
  TABLET: "@media (max-width: 1024px)",
  DESKTOP: "@media (max-width: 1280px)",
  CUSTOM: maxWidth => `@media (max-width: ${maxWidth})`
};

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,800|Staatliches');
 
  :root {
    --main-bg-color: ${COLORS.BLACK};
  }

  html {
    font-size: 62.5%;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.4rem;
    line-height: 1.5;
    font-family: Montserrat, 'Open Sans', sans-serif;
    font-weight: 500;
    color: ${COLORS.BLACK};
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  h1, h2 {
    font-family: Staatliches;
  }

  h1 {
    font-size: 4rem;
    margin: 0;
    padding-top: 2.4rem;
    padding-bottom: 2rem;
    line-height: 1.1;
  }

  h2 {
    font-size: 2.2rem;
    margin: 0;
    padding-top: 2.4rem;
    padding-bottom: .4rem;
    line-height: 1.2;
  }

  p {
    margin: 0;
    padding: .4rem 0;
  }

  a {
    font-weight: 800;
    color: var(--main-bg-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ${BREAKPOINTS.MOBILE} {
    body {
      font-size: 1.3rem;
    }
  }
`;
