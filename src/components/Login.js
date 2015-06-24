import React, { PropTypes } from 'react'

export default class Login {

  render() {
    const { login, logout, user } = this.props
    const username = user.username ? user.username : ``
    const loggedInMsg = username ? `Log Out` : `Log In`
    const action = username ? logout : login
    return (
      <section>
        <a href='javascript:void(0)' onClick={action}>{loggedInMsg}</a>
        <p>{username}</p>
      </section>
    )
  }

}
