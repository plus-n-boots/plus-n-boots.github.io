import React, { PropTypes } from 'react'

export default class {
  static displayName = 'Repo'

  static PropTypes = {
    actions: PropTypes.object,
    repo: PropTypes.object.isRequired
  }

  render () {
    const { actions, repo } = this.props
    const actionMsg = `Add`

    return (
      <li><a href='javascript:void(0)' onClick={() => actions.addHook(repo)}>{actionMsg}</a> {repo.name}</li>
    )
  }
}
