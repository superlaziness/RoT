import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from 'store';

import Maco from 'components/maco';

function run() {
  const initialState = JSON.parse(
    document
      .getElementById('source')
      .getAttribute('data-initial-state')
  );

  const store = configureStore(initialState);
  const container = document.getElementById('app');

  ReactDOM.render(
    <Provider store={store}>
      <Maco/>
    </Provider>,
    container
  );
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
