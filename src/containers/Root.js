import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import DevTools from './DevTools';

class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.element.isRequired,
    store: React.PropTypes.object.isRequired
  }

  get routes () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  get devTools() {
    if (__DEV__) {
  	  return <DevTools/>
    }
  }

  render() {
  	return (
      <Provider store={this.props.store}>
        <div>
          { this.routes }
          { this.devTools }
        </div>
      </Provider>
  	)
  }
}

export default Root;