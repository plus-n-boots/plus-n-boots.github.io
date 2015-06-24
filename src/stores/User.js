import * as constants from '../constants/ActionTypes'

export default function user (state = {username: null}, action) {
  switch (action.type) {
  case constants.USER_LOGGED_IN:
    state = {
      username: action.username
    }
    return state
  case constants.USER_LOGGED_OUT:
    state = {
      username: null
    }
    return state
  default:
    return state
  }
}
