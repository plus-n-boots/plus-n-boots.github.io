import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Orgs from './Orgs'

export default class {
  static displayName = 'User'

  static PropTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  render () {
    const { actions, user } = this.props
    const username = user.details ? user.details.login : ``
    const orgs = user ? user.orgs : []
    const loggedInMsg = username ? `Log Out` : `Login with GitHub`
    const loginAction = username ? actions.logout : actions.login
    return (
      <div className={classnames('mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base')}>
        <div className={classnames('mdl-layout mdl-js-layout mdl-layout--fixed-header')}>
          <header className={classnames('mdl-layout__header')}>
            <div style={{'paddingLeft': '16px'}} className={classnames('mdl-layout__header-row')}>
              <span className={classnames('mdl-layout-title')}>plus-n-boots</span>
              <div className={classnames('mdl-layout-spacer')}></div>
              <nav className={classnames('mdl-navigation')}>
                <button onClick={loginAction} href="#" className={classnames('mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent')}>
                  {loggedInMsg}
                </button>
              </nav>
            </div>
          </header>
          <main style={{'backgroundColor': '#fafafa'}} className={classnames('mdl-layout__content')}>
            <div className={classnames('mdl-layout__tab-panel is-active')} id="overview">
              <Orgs orgs={orgs} actions={actions} />
            </div>
            <footer className={classnames('mdl-mega-footer')}>
              <div className={classnames('mdl-mega-footer--bottom-section')}>
                <ul className={classnames('mdl-mega-footer--link-list')}>
                  <li><a href="#">GitHub</a></li>
                </ul>
              </div>
            </footer>
          </main>
        </div>
      </div>
    )
  }
}
