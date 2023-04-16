import React from "react";
import ReactDOM from 'react-dom';
// import * as ReactDOMClient from 'react-dom/client';
import { Provider } from "react-redux";

import { legacy_createStore as createStore } from "redux";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";
import App from "./App";
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));


const root = document.getElementById('root');
ReactDOM.render(
  <Provider store = {store}>
  <App />
</Provider>
, root
);

// const container = document.getElementById("root");
// const root = ReactDOMClient.createRoot(container);
// root.render( ;
