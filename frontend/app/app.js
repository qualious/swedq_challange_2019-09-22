import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import history from "utils/history";
import "sanitize.css/sanitize.css";
import throttle from "lodash/throttle";

import App from "containers/App";

import { loadState, saveState } from "./utils/localStorage";

/* eslint-disable import/no-unresolved, import/extensions */
import "file-loader?name=.htaccess!./.htaccess";
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from "./configureStore";

require("dotenv").config();
const initialState = loadState() || {};

const store = configureStore(initialState, history);
store.subscribe(
  throttle(() => {
    saveState({ state: store.getState(), lastUpdated: new Date() });
  }, 1000),
);
const MOUNT_NODE = document.getElementById("app");

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  module.hot.accept();
  ReactDOM.unmountComponentAtNode(MOUNT_NODE);
  render();
}

if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install(); // eslint-disable-line global-require
}
