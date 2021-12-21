import styled, { keyframes } from "styled-components";

import { SEO } from "../components/seo";
import { Box } from "../components/box";
import { BREAKPOINTS } from "../theme";

import { ReactComponent as TwitterIconSvg } from "../images/icons/twitter.svg";
import { ReactComponent as BottleSvg } from "../images/pictures/bottle-message.svg";
import { ReactComponent as PalmTreeSvg } from "../images/pictures/palm-tree.svg";

const TwitterIcon = styled(TwitterIconSvg)`
  height: 2.2rem;
  width: auto;
  margin-right: 0.4rem;
`;

const Container = styled.div`
  max-width: 50rem;
  position: relative;
  z-index: 2;
`;

const Graphics = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  overflow: hidden;
`;

const Ocean = styled.div`
  position: absolute;
  top: 55rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f0f6fc;
  z-index: 1;

  ${BREAKPOINTS.MOBILE} {
    top: auto;
    bottom: 0;
    height: 10rem;
  }
`;

const floating = keyframes`
  0% { transform: translate3d(0, -100%, 0); }
  10% { transform: translate3d(7%, -96%, 0); }
  30% { transform: translate3d(10%, -98%, 0); }
  50% { transform: translate3d(11%, -94%, 0); }
  70% { transform: translate3d(7%, -99%, 0); }
  80% { transform: translate3d(3%, -97%, 0); }
  100% { transform: translate3d(0, -100%, 0); }
`;

const Bottle = styled(BottleSvg)`
  position: absolute;
  top: 60rem;
  left: 22rem;
  width: auto;
  height: 15rem;
  transform: translate3d(0, -100%, 0);
  z-index: 2;
  animation: 12s ${floating} infinite ease-out;
  cursor: pointer;

  ${BREAKPOINTS.MOBILE} {
    left: 4rem;
    top: auto;
    bottom: -10rem;
  }
`;

const PalmTree = styled(PalmTreeSvg)`
  position: absolute;
  right: -57rem;
  bottom: 0;
  height: 130%;
  z-index: 3;
  width: auto;

  ${BREAKPOINTS.CUSTOM("1330px")} {
    display: none;
  }
`;

const GetInTouchPage = () => (
  <>
    <SEO title="Get In Touch" />
    <h1>Get In Touch</h1>
    <Container>
      <p>
        Hi there, you want to get in touch with me? That's great. I could give
        you my personal email here, but I don't check my inbox very frequently
        and would probably miss your message.
      </p>
      <p>
        So if you want to say hello or have a chat, just get in touch with me
        via twitter.
      </p>

      <Box mt="1.5rem" alignItems="center">
        <a href="https://twitter.com/jburr90" target="_blank" rel="noreferrer">
          <TwitterIcon /> @jburr90 on Twitter
        </a>
      </Box>
    </Container>

    <Graphics>
      <Bottle
        onClick={() =>
          window.open(
            "https://twitter.com/messages/compose?recipient_id=866080743834886144",
            "_blank"
          )
        }
      />
      <Ocean />
      <PalmTree />
    </Graphics>
  </>
);

export default GetInTouchPage;
