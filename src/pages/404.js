import React, { Fragment } from "react";
import SEO from "../components/seo";

export default function NotFoundPage() {
  return (
    <Fragment>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Fragment>
  );
}
