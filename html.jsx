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

        <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '115784778919403');fbq('track', 'PageView');` }} />
        <noscript>
          <img alt="" height="1" width="1" src="https://www.facebook.com/tr?id=115784778919403&ev=PageView&noscript=1" />
        </noscript>

      </body>
    </html>
  );
}

Html.propTypes = {
 // style: PropTypes.string.isRequired,
 // script: PropTypes.string,
  children: PropTypes.string,
 // state: PropTypes.object.isRequired,
};

export default Html;
