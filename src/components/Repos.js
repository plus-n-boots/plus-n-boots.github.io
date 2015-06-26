import React, { PropTypes } from 'react'
import Repo from './Repo'

export default class Repos {

  render () {
    const { repos } = this.props

    return (
      <section>
        <ul>
          {this.props.repos.map(repo =>
            <Repo key={repo.id} repo={repo} />
          )}
        </ul>
      </section>
    )
  }

}
