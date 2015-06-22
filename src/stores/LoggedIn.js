import { USER_LOGGED_IN } from '../constants/ActionTypes'

export default function loggedIn(state = false, action) {
  switch (action.type) {
  case USER_LOGGED_IN:
    return state = !state
  default:
    return state
  }
}
