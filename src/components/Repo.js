import React, { PropTypes } from 'react'

export default class {
  static displayName = 'Repo'

  static PropTypes = {
    repo: PropTypes.obj
  }

  render () {
    const { repo } = this.props

    return (
      <li>{this.props.repo.name} <input type='checkbox' /></li>
    )
  }

}
