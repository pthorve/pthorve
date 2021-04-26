import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HeadProvider } from 'react-head';
import { ConnectedRouter } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import './index.css';

import createStore from './modules';
import App from './App';

const history = createBrowserHistory();

// Create Redux store with initial state
export const store = createStore(
  history,
  // eslint-disable-next-line no-underscore-dangle
  window.__INITIAL_STATE__
);

ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HeadProvider>
        <App />
      </HeadProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
