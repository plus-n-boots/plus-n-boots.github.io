import React, { PropTypes } from 'react'
import classnames from 'classnames'
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
        {orgs.map(org =>
          <section style={{margin: '3em'}} className={classnames('section--center mdl-grid mdl-grid--no-spacing mdl-shadow--4dp')}>
          <div style={{padding: '2em'}} className={classnames('mdl-card mdl-cell mdl-cell--12-col')}>
            <div className={classnames('mdl-card__supporting-text mdl-grid mdl-grid--no-spacing')}>
              <h3 className={classnames('mdl-cell mdl-cell--12-col')}>{org.name}</h3>
              <Repos key={org.name} repos={org.repos} actions={actions} />
            </div>
          </div>
          </section>
        )}
      </section>
    )
  }
}
