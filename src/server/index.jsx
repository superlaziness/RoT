import Express from 'express';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import path from 'path';
import { jsdom } from 'jsdom';

import configureStore from 'store';

import Maco from 'components/maco';
import Html from 'components/html';

// Configure Redux store
const store = configureStore();

// Prepare jsdom env
const htmlString = '<html><body><div id="app"></div></body></html>';
global.document = jsdom(htmlString);
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js',
};

// Require React after window & document defined
const React = require('react');
const ReactDOM = require('react-dom');

// Run app
ReactDOM.render(
  <Provider store={store}>
    <Maco />
  </Provider>,
  document.getElementById('app'),
);

// Run webserver
const app = new Express();
const isDev = process.env.NODE_ENV === 'development';
const scriptUrl = isDev ? 'http://localhost:8080/dist/client.js' : '/static/client.js';

app.use('/static', Express.static('./dist'));

app.get('*', (req, res) => {
  const children = renderToString(
    <Provider store={store}>
      <Maco />
    </Provider>,
  );
  const markup = renderToStaticMarkup(
    <Html
      children={children}
      script={scriptUrl}
      state={store.getState()}
    />,
	);

  res.status(200).send(`<!doctype html>${markup}`);
});

app.listen(10000, () => { console.log('server is running!'); });
