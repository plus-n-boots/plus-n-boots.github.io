import React, { PropTypes } from 'react'
import Repos from './Repos'

export default class {
  static displayName = 'Login'

  static PropTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  componentWillMount () {
    this.props.actions.checkCache()
  }

  render () {
    const { actions, user } = this.props
    const username = user.details ? user.details.login : ``
    const repos = user ? user.repos : null
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
