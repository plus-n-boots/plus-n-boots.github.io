import React from 'react'
import { Router, Route } from 'react-router'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import { createRedux } from 'redux'
import { Provider } from 'redux/react'
import App from './App'
import * as stores from '../stores/index'

const redux = createRedux(stores)

export default class AppWrapper {
  render () {
    return (
      <Provider redux={redux}>
        {() =>
          <Router history={BrowserHistory}>
            <Route path='/' component={App} />
          </Router>
        }
      </Provider>
    )
  }
}

export const __hotReload = true
