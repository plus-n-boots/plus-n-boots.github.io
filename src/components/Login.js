import React, { PropTypes } from 'react'
import Repos from './Repos'

export default class {
  static displayName = 'Login'

  static PropTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  render () {
    const { actions, user } = this.props
    const loggedInUser = this.props.user
    const username = loggedInUser.details ? loggedInUser.details.login : ``
    const repos = loggedInUser ? loggedInUser.repos : null
    const loggedInMsg = username ? `Log Out` : `Log In`
    const action = username ? actions.logout : actions.login
    return (
      <section>
        <a href='javascript:void(0)' onClick={action}>{loggedInMsg}</a>
        <p>{username}</p>
        <Repos repos={repos} actions={actions} />
      </section>
    )
  }

}
