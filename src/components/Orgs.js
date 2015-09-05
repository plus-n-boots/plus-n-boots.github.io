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
          <section style={{margin: '2em 10%'}} className={classnames('section--center mdl-grid mdl-grid--no-spacing mdl-shadow--4dp')}>
          <div style={{padding: '1em'}} className={classnames('mdl-card mdl-cell mdl-cell--12-col')}>
            <div style={{marginLeft: '1em'}} className={classnames('mdl-card__supporting-text mdl-grid mdl-grid--no-spacing')}>
              <h4 className={classnames('mdl-cell mdl-cell--12-col')}>{org.name}</h4>
              <Repos key={org.name} repos={org.repos} actions={actions} />
            </div>
          </div>
          </section>
        )}
      </section>
    )
  }
}
