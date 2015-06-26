import React, { PropTypes } from 'react'
import Repo from './Repo'

export default class Repos {

  render () {
    const { repos } = this.props
    const userRepos = this.props.repos

    return (
      <section>
        <ul>
          {userRepos.map(repo =>
            <Repo repo={repo.name} />
          )}
        </ul>
      </section>
    )
  }

}
