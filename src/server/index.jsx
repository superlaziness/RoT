import Express from "express";
import React from "react";
import { Provider } from "react-redux";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import path from "path";

import configureStore from "store";

import Maco from "components/maco";
import Html from 'components/html';

const app = new Express();
const store = configureStore();

let children = '<div>empty</div>';

const renderApp = () => {
  children = renderToString(
    <Provider store={store}>
      <Maco/>
    </Provider>
  );
};

const isDev = process.env.NODE_ENV === 'development';
const scriptUrl = isDev ? 'http://localhost:8080/dist/client.js' : '/static/client.js';

store.subscribe(renderApp);

app.use("/static", Express.static('./dist'));

app.get("*", (req, res) => {
	const markup = renderToStaticMarkup(
		<Html 
      children={children}
      script={scriptUrl}
      state={store.getState()}
    />		
	);

	res.status(200).send(`<!doctype html>${markup}`);
});

renderApp();

app.listen(10000, () => {console.log("server is running!")});