import React, { PropTypes } from 'react'

export default class {
  static displayName = 'Repo'

  static PropTypes = {
    actions: PropTypes.object,
    repo: PropTypes.object.isRequired
  }

  render () {
    const { actions, repo } = this.props
    const hookAction = repo.hookAdded ? actions.removeHook : actions.addHook
    const actionMsg = repo.hookAdded ? `Remove` : `Add`
    return (
      <li>{repo.name} <a onClick={() => hookAction(repo)}>{actionMsg}</a></li>
    )
  }
}
