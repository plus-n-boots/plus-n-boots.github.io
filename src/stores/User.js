import * as constants from '../constants/ActionTypes'

const initialState = {
  details: {},
  repos: []
}

export default function user (state = initialState, action) {
  switch (action.type) {
  case constants.CHECK_CACHE:
    return state
  case constants.USER_LOGGED_IN:
    return {
      ...state,
      details: action.details,
      repos: action.repos
    }
  case constants.USER_LOGGED_OUT:
    return initialState
  case constants.HOOK_ADDED:
    return {
      ...state,
      repos: state.repos.map(repo => repo.name === action.repo.name ?
        { ...repo, hookAdded: !repo.hookAdded } :
        repo)
    }
  default:
    return state
  }
}
