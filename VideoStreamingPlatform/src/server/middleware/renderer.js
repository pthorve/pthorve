/* eslint-disable prettier/prettier */
import path from 'path';
import fs from 'fs-extra';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import { HeadProvider } from 'react-head';
import uuid from 'uuid/v4';

import App from '../../browser/App';
import createStore from '../../browser/modules';
import { getRoutes } from '../../browser/routes';

import loadGetInitialProps from '../services/loadGetInitialProps';
import {fetchCategories} from '../../browser/modules/content/content.actions'
import { fetchCountries , fetchLocationDetails, fetchCountryConfig} from '../../browser/modules/config/config.actions';

const filePath = path.resolve(process.cwd(), 'build', 'client', 'app.html');
const htmlTemplate = fs.readFileSync(filePath, 'utf8');
const htmlHeader = htmlTemplate.substring(0, htmlTemplate.indexOf('</head>'));

const assetManifest = fs.readJsonSync(path.resolve(process.cwd(), 'build', 'client', 'asset-manifest.json'));

export const prepareHTML = ({
  head,
  styles,
  scripts,
  body,
  state
}) => {
  return `${htmlHeader}${head}${styles}</head><body><script>window.__INITIAL_STATE__=${JSON.stringify(
    state
  ).replace(/</g, '\\u003c')};</script><div id="root">${body}</div>${scripts}</body></html>`;
};


// renderer request handler
export default async function(req, res) {
  const memoryHistory = createMemoryHistory({ initialEntries: [req.url] });
  const store = createStore(memoryHistory);

  const sessionId = uuid();

  try {
    const routes = getRoutes();
    const context = {};

    await store.dispatch(fetchCountries());
    const country = await store.dispatch(fetchLocationDetails());

    await store.dispatch(fetchCountryConfig(country.id));
    await store.dispatch(fetchCategories());

    await loadGetInitialProps(routes, req, res, store);

    const headTags = [];
    const app = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <HeadProvider headTags={headTags}>
              <App />
            </HeadProvider>
          </StaticRouter>
        </Provider>
    );
    const appMarkup = renderToString(app);

    const styles = `<link rel="preload" href="${
      assetManifest['main.css']
    }" rel="stylesheet"/>`;

    const scripts = [];
    scripts.push(
      `<script src="${assetManifest['main.js']}" defer></script>`
    );

    const state = store.getState();

    const headTagsString = renderToStaticMarkup(headTags);

    const html = prepareHTML({
      head: `${headTagsString}`,
      styles,
      scripts: scripts.join(''),
      body: appMarkup,
      state,
      sessionId,
      req
    });

    res.send(html);
  } catch (error) {
    res.status(500).send(error);
  }
}
