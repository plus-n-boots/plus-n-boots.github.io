import React from 'react'
import { bindActionCreators } from 'redux'
import { Connector } from 'redux/react'
import Login from '../components/Login'
import * as LoginActions from '../actions/LoginActions'

export default class LoginApp {
  render() {
    return (
      <Connector select={state => ({ user: state.user })}>
        {this.renderChild}
      </Connector>
    )
  }

  renderChild({ user, dispatch }) {
    const actions = bindActionCreators(LoginActions, dispatch)
    return (
      <div>
        <Login user={user} actions={actions} />
      </div>
    )
  }
}
