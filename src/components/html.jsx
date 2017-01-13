import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

function Html({ script, style, children, state }) {
  const head = Helmet.rewind();
  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="stylesheet" href={style} />
        {/* <style id="css" dangerouslySetInnerHTML={{ __html: style }} /> */}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {script && (
          <script
            id="source"
            src={script}
            data-initial-state={JSON.stringify(state)}
          />
        )}
      </body>
    </html>
  );
}

Html.propTypes = {
  // style: PropTypes.string.isRequired,
  script: PropTypes.string,
  children: PropTypes.string,
  state: PropTypes.object.isRequired,
};

export default Html;
