import React, { Component } from 'react'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { devTools, persistState } from 'redux-devtools'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import App from './App'
import * as reducers from '../reducers'

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
)

const reducer = combineReducers(reducers)
const store = finalCreateStore(reducer)

export default class AppWrapper extends Component {

  constructor (props) {
    super(props)
    this.history = new BrowserHistory()
  }

  render () {
    return (
      <div>
        <Provider store={store}>
          {() =>
            <Router history={this.history}>
              <Route path='/' component={App} />
            </Router>
          }
        </Provider>
        <DebugPanel top bottom>
          <DevTools store={store}
                    monitor={LogMonitor} />
        </DebugPanel>
      </div>
    )
  }
}
