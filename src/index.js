import React from 'react';
import { render } from 'react-dom';

import configureStore from './redux/configureStore';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';

import Root from './containers/Root';


const history = createBrowserHistory();
const store = configureStore();

syncReduxAndRouter(history, store, (state) => state.router);

// Render the React application to the DOM
render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)

