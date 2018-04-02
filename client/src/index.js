import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './_helpers/configureStore';
import configureMockBackend from './_helpers/configureMockBackend';
import App from './app.jsx';

// setup fake backend
configureMockBackend();

const providerForApp = (
  <Provider store={configureStore(undefined, true)}>
    <App />
  </Provider>
);

const appDiv = document.getElementById('app');

render(providerForApp, appDiv);
