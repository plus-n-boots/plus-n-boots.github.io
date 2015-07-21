import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Connector } from 'react-redux'
import User from '../components/User'
import * as UserActions from '../actions/UserActions'

export default class App extends Component {
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
