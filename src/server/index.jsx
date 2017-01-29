import Express from 'express';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import path from 'path';
import { jsdom } from 'jsdom';
import fs from 'fs';

import configureStore from 'store';

import Maco from 'components/maco';
import Html from 'components/html';

const savedStorePath = './dist/savedstore.json';

const readStore = () => {
  let storeState;
  try {
    const data = fs.readFileSync(savedStorePath, 'utf8');
    console.log('asdfas');
    storeState = JSON.parse(data);
  } catch (err) {
    console.log ("Can't read savedstore.json \n" + err);
    storeState = {};
  } ;
  return storeState;
}

const initialState = readStore();

console.log('initial', initialState);

// Configure Redux store
const store = configureStore(initialState);

const writeStore = () => {
  const storeState = store.getState();
  fs.writeFile(savedStorePath, JSON.stringify(storeState), (err) => {
    if (err) throw (err);
  })
}

// Save store state to file in case of restart
store.subscribe(writeStore);

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
