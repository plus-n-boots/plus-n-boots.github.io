import React, { PropTypes } from 'react'

export default class Repo {

  render () {
    const { repo } = this.props

    return (
      <li>{this.props.repo}</li>
    )
  }

}
