import React, { PropTypes } from 'react'
import classnames from 'classnames'
import {componentHandler} from 'exports?componentHandler&MaterialRipple!material-design-lite/material.js'

export default class {
  static displayName = 'Repo'

  static PropTypes = {
    actions: PropTypes.object,
    repo: PropTypes.object.isRequired
  }

  componentDidMount () {
    componentHandler.upgradeDom()
  }

  render () {
    const { actions, repo } = this.props
    const hookAction = repo.hookAdded ? actions.removeHook : actions.addHook
    const actionMsg = repo.hookAdded ? `Remove` : `Add`

    return (
      <section onClick={() => hookAction(repo)}>
        <h4 style={{paddingLeft: '1em'}} className={classnames('section__text')}>
          <label style={{width: 0}} className={classnames("mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect")} htmlFor="checkbox-1">
            <input type="checkbox" id="checkbox-1" className={classnames("mdl-checkbox__input")} defaultChecked={repo.hookAdded} />
          </label>
          {repo.name}
        </h4>
      </section>
    )
  }
}
