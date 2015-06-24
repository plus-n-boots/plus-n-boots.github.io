import * as constants from '../constants/ActionTypes'

export default function user(state = {username: null}, action) {
  switch (action.type) {
  case constants.USER_LOGGED_IN:
    return state = {
      username: action.username
    }
  case constants.USER_LOGGED_OUT:
    return state = {
      username: null
    }
  default:
    return state
  }
}
