import React, { PropTypes } from 'react'
import Orgs from './Orgs'

export default class {
  static displayName = 'User'

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
    const orgs = user ? user.orgs : []
    const loggedInMsg = username ? `Log Out` : `Log In`
    const loginAction = username ? actions.logout : actions.login
    return (
      <section>
        <a href='javascript:void(0)' onClick={loginAction}>{loggedInMsg}</a>
        <Orgs orgs={orgs} actions={actions} />
      </section>
    )
  }
}
