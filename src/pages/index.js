import React, { Fragment } from "react";
import dayjs from "dayjs";
import SEO from "../components/seo";

export default function IndexPage() {
  const age = dayjs().diff(dayjs("1990-11-16"), "years");
  return (
    <Fragment>
      <SEO title="Hi." keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi.</h1>
      <p style={{ maxWidth: "35rem" }}>
        My name is Julian Burr, I'm {age} years old and originally from Germany.
        I'm a software developer, always looking for new things to learn and
        experiment with. I also like kittens.
      </p>
    </Fragment>
  );
}
