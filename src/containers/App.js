import React from 'react'
import { bindActionCreators } from 'redux'
import { Connector } from 'redux/react'
import User from '../components/User'
import * as UserActions from '../actions/UserActions'

export default class App {
  render() {
    return (
      <Connector select={state => ({ user: state.user })}>
        {this.renderChild}
      </Connector>
    )
  }

  renderChild({ user, dispatch }) {
    const actions = bindActionCreators(UserActions, dispatch)
    return (
      <div>
        <User user={user} actions={actions} />
      </div>
    )
  }
}
