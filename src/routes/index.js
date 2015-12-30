import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';

import Todos from '../containers/Todos';

export default function() {
	const history = createHistory();
	return (
		<Router history={ history }>
            <Route path="/" component="div">
                <IndexRoute component={ Todos } />
            </Route>
        </Router>
	)
}