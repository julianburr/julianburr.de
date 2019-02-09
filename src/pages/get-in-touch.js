import React, { Fragment } from "react";
import styled from "styled-components";
import SEO from "../components/seo";
import Box from "../components/box";

import { ReactComponent as TwitterIconSvg } from "../images/icons/twitter.svg";

const TwitterIcon = styled(TwitterIconSvg)`
  height: 2.2rem;
  width: auto;
  margin-right: 0.4rem;
`;

const Container = styled.div`
  max-width: 50rem;
`;

const GetInTouchPage = () => (
  <Fragment>
    <SEO title="Get In Touch" />
    <h1>Get In Touch</h1>
    <Container>
      <p>
        Hi there, you want to get in touch with me? That's great. I could give
        you my personal email here, but I don't check my inbox very frequently
        and would probabbly miss your message.
      </p>
      <p>
        So if you want to say hello or have a chat, just get in touch with me
        via twitter.
      </p>

      <Box
        as="a"
        mt="1.5rem"
        alignItems="center"
        href="https://twitter.com/jburr90"
        target="_blank"
        rel="noreferrer"
      >
        <TwitterIcon /> @jburr90 on Twitter
      </Box>
    </Container>
  </Fragment>
);

export default GetInTouchPage;
