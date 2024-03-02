import Script from "next/script";
import React, { Fragment } from "react";
import { newrelicScript } from "./script";

export function NewrelicScript() {
  return (
    <Fragment>
      {/*script must be after any position-sensitive META tags (X-UA-Compatible and charset).*/}
      <meta httpEquiv="x-ua-compatible" content="ie=edge"></meta>
      <Script
        id="newrelic-browser-timing-header"
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: newrelicScript }}
      />
    </Fragment>
  );
}
