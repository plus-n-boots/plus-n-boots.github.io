import 'babel-runtime/regenerator/runtime'
import React from 'react'
import AppWrapper from './containers/AppWrapper'

React.render(
  <AppWrapper />,
  document.querySelector('main')
)

export const __hotReload = true
