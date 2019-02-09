import { createGlobalStyle } from "styled-components";

import "../fonts/montserrat.css";
import "../fonts/staatliches.css";
import "./prismjs-theme.css";

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
  RED: "#DA7A70",

  TWITTER_BLUE: "#1EA1F2",
  MEDIUM_GREEN: "#029E74",
  GITHUB_GREY: "#55554C"
};

export const BREAKPOINTS = {
  MOBILE: "@media (max-width: 600px)",
  TABLET: "@media (max-width: 1024px)",
  DESKTOP: "@media (max-width: 1280px)",
  CUSTOM: maxWidth => `@media (max-width: ${maxWidth})`
};

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700,900|Staatliches');
 
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
    line-height: 1.6;
    font-family: Lato, 'Open Sans', sans-serif;
    font-weight: 400;
    color: ${COLORS.BLACK};
    word-break: break-word;
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

  h3 {
    font-size: 1.8rem;
    margin: 1.5rem 0 1rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    padding: 1rem 0;
  }

  hr {
    margin: 2.5rem 0;
    border: 0 none;
    border-top: .3rem solid ${COLORS.BLACK};
    width: 100%;
    max-width: 4rem;
  }

  a {
    font-weight: 900;
    color: var(--main-bg-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  b, strong {
    font-weight: 900;
  }

  ul, ol {
    margin: 0;
    padding: 1rem 1rem 1rem 3rem;
  }

  ul li,
  ol li {
    padding: .5rem 0;
  }

  code[class*="language-"],
  pre[class*="language-"] {
    margin: 3rem 0;
    border-radius: 0;
  }

  p code.language-text,
  li code.language-text {
    color: ${COLORS.BLACK};
    background: ${COLORS.GREY.MEDIUM};
    display: inline-block;
    padding: .1rem .4rem;
    margin: 0;
    border-radius: 0;
    font-size: 1.2rem;
  }

  pre[class*="language-"] {
    margin: 3rem 1.5rem;
    padding: 1.5rem;
    box-shadow: 0 .4rem 5rem -.4rem rgba(0, 0, 0, .2);
    box-sizing: border-box;
    min-width: calc(100% - 3rem);
  }

  pre[class*="language-"] code {
    font-size: 1.3rem;
    line-height: 1.4;
  }

  .twitter-tweet {
    width: auto !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 3rem 0 !important;
  }

  ${BREAKPOINTS.MOBILE} {
    body {
      font-size: 1.3rem;
    }

    pre[class*="language-"] {
      margin: 3rem 0;
    }
  }
`;
