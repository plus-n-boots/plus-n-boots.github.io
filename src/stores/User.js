import * as constants from '../constants/ActionTypes'

const initialState = {
  details: null,
  repos: []
}

export default function user (state = initialState, action) {
  switch (action.type) {
  case constants.USER_LOGGED_IN:
    state = {
      details: action.details,
      repos: action.repos
    }
    return state
  case constants.USER_LOGGED_OUT:
    state = initialState
    return state
  case constants.HOOK_ADDED:
    return state
  default:
    return state
  }
}
