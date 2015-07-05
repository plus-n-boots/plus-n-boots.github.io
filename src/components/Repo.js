import React, { PropTypes } from 'react'

export default class {
  static displayName = 'Repo'

  static PropTypes = {
    actions: PropTypes.object,
    repo: PropTypes.object.isRequired
  }

  componentWillMount () {
    // this.props.actions.hookExists()
  }

  render () {
    const { actions, repo } = this.props
    const action = repo.hookAdded ? actions.removeHook : actions.addHook
    const actionMsg = repo.hookAdded ? `Remove` : `Add`
    return (
      <li><a href='javascript:void(0)' onClick={() => action(repo)}>{actionMsg}</a> {repo.name}</li>
    )
  }
}
