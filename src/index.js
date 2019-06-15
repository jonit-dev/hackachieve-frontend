import React from "react";
import ReactDOM from 'react-dom';
import App from './components/App';

//Redux specific
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    // composeEnhancers(applyMiddleware(thunk, logger))
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,

    document.querySelector("#root"));




