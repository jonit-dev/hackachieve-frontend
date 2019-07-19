import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//Redux specific
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
// import logger from 'redux-logger'
import thunk from "redux-thunk";
import { Helmet } from "react-helmet";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  // composeEnhancers(applyMiddleware(thunk, logger))
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Helmet>
      <meta charSet="utf-8"></meta>

      <link rel="canonical" href="https://www.hackachieve.com" />

      <meta
        name="keywords"
        content="smart goals, productivity, kanban, scrum, personal productivity, business productivity"
      />
      <meta name="language" content="English" />

      <meta
        itemProp="name"
        content="Hackachive - Double your productivity with Goal Setting Software"
      />
      <meta
        itemProp="description"
        content="se Hackachieve to apply smart goals in your business or personal life"
      />
      <meta
        itemProp="image"
        content="https://www.hackachieve.com/landing_resources/images/dashboard.webp"
      />

      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content="Hackachive - Double your productivity with Goal Setting Software"
      />
      <meta
        name="twitter:description"
        content="se Hackachieve to apply smart goals in your business or personal life"
      />

      <meta
        name="og:title"
        content="Hackachive - Double your productivity with Goal Setting Software"
      />
      <meta
        name="og:description"
        content="se Hackachieve to apply smart goals in your business or personal life"
      />
      <meta
        name="og:image"
        content="https://www.hackachieve.com/landing_resources/images/landing_1.png"
      />
      <meta name="og:url" content="https://www.hackachieve.com" />
      <meta name="og:site_name" content="Hackachieve" />
      <meta name="og:locale" content="en_US" />
      <meta name="og:type" content="website" />
    </Helmet>
    <App />
  </Provider>,
  document.querySelector("#root")
);
