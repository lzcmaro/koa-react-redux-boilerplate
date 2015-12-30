import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import createRoutes from './routes';


const store = configureStore();
const routes = createRoutes();

render(
  <Provider store={store}>
    { routes }
  </Provider>,
  document.getElementById('root')
)
