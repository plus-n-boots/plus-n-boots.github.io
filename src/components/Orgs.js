import React, { PropTypes } from 'react'
import Repos from './Repos'

export default class {
  static displayName = 'Repos'

  static PropTypes = {
    actions: PropTypes.object,
    orgs: PropTypes.array.isRequired
  }

  render () {
    const { actions, orgs } = this.props
    return (
      <section>
        <ul>
          {orgs.map(org =>
            <section>
              <p>{org.name}</p>
              <Repos key={org.name} repos={org.repos} actions={actions} />
            </section>
          )}
        </ul>
      </section>
    )
  }
}
