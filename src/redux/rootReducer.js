import { combineReducers } from 'redux'
import todos from './modules/todos'
import { routeReducer as router } from 'redux-simple-router'

const rootReducer = combineReducers({
  todos,
  router
})

export default rootReducer
