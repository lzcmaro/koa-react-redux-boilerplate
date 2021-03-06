import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants (Action Types)
// ------------------------------------
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const COMPLETE_ALL = 'COMPLETE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

// ------------------------------------
// Actions (Action Creator)
// ------------------------------------

// This is a thunk. see the redux-thunk
export const addTodo = text => dispatch => {
  //{type, payload} 为redux-actions.createAction所返回对象，这里和它保持一致，方便在reducers中使用
  setTimeout(() => dispatch({ type: ADD_TODO, payload: text }), 500)
}

/**
 * createAction(type, actionCreator, metaCreator), actionCreator缺省为：
 * function identity(t) {
 *  return t;
 * }
 */
export const deleteTodo = createAction(DELETE_TODO/*, id => id*/)

export const editTodo = createAction(EDIT_TODO, (id, text) => ({id, text}))

export const completeTodo = createAction(COMPLETE_TODO/*, id => id*/)

export const completeAll = createAction(COMPLETE_ALL)

export const clearCompleted = createAction(CLEAR_COMPLETED)

/**
 * 暴露actions到外面，方便使用react-redux connect绑定到Container Component
 */
export const actions = {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAll,
  clearCompleted
}

// ------------------------------------
// Reducers
// ------------------------------------
const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default handleActions({
  
  [ADD_TODO] (state, action) {
    return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.payload
        }, 
        ...state
      ]
  },

  [DELETE_TODO] (state, action) {
    return state.filter(todo => todo.id !== action.payload)
  },

  [EDIT_TODO] (state, action) {
    return state.map(todo => {
      return todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo
    })
  },

  [COMPLETE_TODO] (state, action) { 
    return state.map(todo => {
      return todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    })
  },

  [COMPLETE_ALL] (state, action) {
    const areAllMarked = state.every(todo => todo.completed)
    return state.map(todo => {
      return {
        ...todo,
        completed: !areAllMarked
      }
    }) 
  },

  [CLEAR_COMPLETED] (state, action) {
    return state.filter(todo => todo.completed === false)
  }

}, initialState)
