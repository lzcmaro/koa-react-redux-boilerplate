import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/todos/Header'
import MainSection from '../components/todos/MainSection'
import { actions as todoActions } from '../redux/modules/todos'

import 'todomvc-app-css/index.css'

class Todos extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  render() {
    const { todos, actions } = this.props

    return (
      <div className="todoapp">
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  }
}

//绑定到Component，向Todos注入todos, actions属性
export default connect(mapStateToProps, mapDispatchToProps)(Todos)
