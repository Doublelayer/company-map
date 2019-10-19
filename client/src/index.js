import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { configAppOnStartUp } from "./store/actions/appConfig";

import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./components/app/App";

import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import allReducers from "./store/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];

const store = createStore(allReducers, composeEnhancers(applyMiddleware(...middlewares)));

store.dispatch(configAppOnStartUp());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
