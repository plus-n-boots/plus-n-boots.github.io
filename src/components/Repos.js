import React, { PropTypes } from 'react'
import Repo from './Repo'

export default class {
  static displayName = 'Repos'

  static PropTypes = {
    actions: PropTypes.object,
    repos: PropTypes.array.isRequired
  }

  render () {
    const { actions, repos } = this.props
    return (
      <section>
        <ul>
          {repos.map(repo =>
            <Repo key={repo.id} repo={repo} actions={actions} />
          )}
        </ul>
        {this.renderSubmit(repos)}
      </section>
    )
  }

  renderSubmit(repos) {
    if (repos.length) {
      return (
        <button>activate</button>
      )
    }
  }
}

export const __hotReload = true
