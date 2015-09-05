import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Orgs from './Orgs'
import {componentHandler} from 'exports?componentHandler&MaterialRipple!material-design-lite/material.js'

export default class {
  static displayName = 'User'

  static PropTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  runLogin () {
    !this.props.user.details.login ? this.props.actions.login() : this.props.actions.logout()
    !this.props.user.details.login ? this.props.actions.initiateLogin() : null
  }

  componentDidMount () {
    componentHandler.upgradeDom()
  }

  componentDidUpdate () {
    componentHandler.upgradeDom()
  }

  render () {
    const { actions, user } = this.props
    const username = user.details ? user.details.login : ``
    const orgs = user ? user.orgs : []
    const loggedInMsg = username ? `Log Out` : `Login with GitHub`

    return (
      <div className={classnames('mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base')}>
        <div className={classnames('mdl-layout mdl-js-layout mdl-layout--fixed-header')}>
          <header className={classnames('mdl-layout__header')}>
            <div style={{'paddingLeft': '16px'}} className={classnames('mdl-layout__header-row')}>
              <span className={classnames('mdl-layout-title')}>plus-n-boots</span>
              <div className={classnames('mdl-layout-spacer')}></div>
              <nav className={classnames('mdl-navigation')}>
                <button onClick={this.runLogin.bind(this)} href="#" className={classnames('mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent')}>
                  {loggedInMsg}
                </button>
              </nav>
            </div>
          </header>
          <main style={{'backgroundColor': '#fafafa'}} className={classnames('mdl-layout__content')}>
            <div className={classnames('mdl-layout__tab-panel is-active')} id="overview">
              {!username && !user.isFetching &&
                <div style={{width: '80%', margin: '2em 10%'}} className={classnames("mdl-typography--display-1-color-contrast")}>
                  Homepage content goes here
                </div>
              }
              {user.isFetching &&
                <div style={{width: '80%', margin: '2em 10%'}} id="p2" className={classnames('mdl-progress mdl-js-progress mdl-progress__indeterminate')}></div>
              }
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
