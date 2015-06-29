import React, { PropTypes } from 'react'

export default class {
  static displayName = 'Repo'

  static PropTypes = {
    actions: PropTypes.object,
    repo: PropTypes.object.isRequired
  }

  render () {
    const { actions, repo } = this.props

    return (
      <li><input type='checkbox' /> {repo.name}</li>
    )
  }
}
