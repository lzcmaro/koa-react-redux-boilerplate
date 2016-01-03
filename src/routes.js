import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Todos from './containers/Todos';

export default (
  <Route path="/" component="div">
    <IndexRoute component={ Todos } />
  </Route>
)