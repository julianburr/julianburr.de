import React, { Fragment } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import SEO from "../components/seo";
import { BREAKPOINTS } from "../theme";

import MovingIn from "../components/graphics/moving-in";

const WrapContent = styled.div`
  position: relative;
  z-index: 2;
`;

const WrapGraphic = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
`;

const Graphic = styled(MovingIn)`
  position: absolute;
  top: 5rem;
  left: 10%;
  height: 70%;
  width: auto;

  ${BREAKPOINTS.MOBILE} {
    left: -20rem;
  }
`;

export default function IndexPage() {
  return (
    <Fragment>
      <SEO title="Hi." keywords={[`gatsby`, `application`, `react`]} />
      <WrapContent>
        <h1>Hi.</h1>
        <p style={{ maxWidth: "35rem" }}>
          My name is Julian Burr, I'm originally from Germany but currently
          living and working in Australia. I'm a software developer, always
          looking for new things to learn and experiment with. I also like
          kittens.
        </p>
      </WrapContent>
      <WrapGraphic>
        <Graphic />
      </WrapGraphic>
    </Fragment>
  );
}
