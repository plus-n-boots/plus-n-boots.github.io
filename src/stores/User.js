import * as constants from '../constants/action-types'

const initialState = {
  details: {},
  orgs: []
}

export default function user (state = initialState, action) {
  switch (action.type) {
  case constants.CHECK_CACHE:
    return state
  case constants.USER_LOGGED_IN:
    return {
      ...state,
      details: action.details,
      orgs: action.orgs
    }
  case constants.USER_LOGGED_OUT:
    return initialState
  case constants.HOOK_AMENDED:
    return {
      ...state,
      orgs: [...state.orgs.map(org => {
        return {
          ...org,
          repos: org.repos.map(repo => {
            return repo.id === action.repo.id ?
              { ...repo, hookAdded: !repo.hookAdded } :
              repo
          })
        }
      })]
    }
  default:
    return state
  }
}
