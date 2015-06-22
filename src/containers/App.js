import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'redux/react'
import Login from '../components/Login'
import * as LoginActions from '../actions/LoginActions'

@connect(state => ({
  loggedIn: state.loggedIn
}))

export default class LoginApp {
  render() {
    const { loggedIn, dispatch } = this.props
    return (
      <Login loggedIn={loggedIn}
               {...bindActionCreators(LoginActions, dispatch)} />
    )
  }
}
