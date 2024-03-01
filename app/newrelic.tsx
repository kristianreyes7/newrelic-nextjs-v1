import Script from "next/script";
import newrelic from "newrelic";
import React, { Fragment } from "react";
import { newrelicScript } from "./script";

export function NewrelicBrowserScript() {
  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
    // @ts-ignore
    allowTransactionlessInjection: true,
  });
  return (
    <Fragment>
      {/*script must be after any position-sensitive META tags (X-UA-Compatible and charset).*/}
      <meta httpEquiv="x-ua-compatible" content="ie=edge"></meta>
      <Script
        id="newrelic-browser-timing-header"
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: browserTimingHeader }}
      />
    </Fragment>
  );
}
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
