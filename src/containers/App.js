import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'redux/react'
import Login from '../components/Login'
import * as LoginActions from '../actions/LoginActions'

@connect(state => ({
  user: state.user
}))

export default class LoginApp {
  render () {
    const { user, dispatch } = this.props
    return (
      <Login user={user}
               {...bindActionCreators(LoginActions, dispatch)} />
    )
  }
}
