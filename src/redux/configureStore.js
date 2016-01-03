import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './rootReducer'
import DevTools from '../containers/DevTools'


export default function configureStore(initialState) {
  let createStoreWithMiddleware;

  if( __DEV__ ){
	createStoreWithMiddleware = compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  }else{
  	createStoreWithMiddleware = applyMiddleware(thunk)
  }

  const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
