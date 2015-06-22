import React, { PropTypes } from 'react'

export default class Login {

  render() {
    const { login, loggedIn } = this.props
    const loggedInMsg = loggedIn ? 'Log Out' : 'Log In'
    return (
      <section>
        <a href='#' onClick={login}>{loggedInMsg}</a>
      </section>
    )
  }

}
