import 'fetch'
import * as constants from '../constants/ActionTypes'

const GITHUB_OAUTH = `https://github.com/login/oauth/authorize`
const GITHUB_API = `https://api.github.com/`
const CLIENT_ID = `d07ba9157a9cd18b5f0d`
const REDIRECT_URI = `http://localhost:8080/logged-in.html`
const STATE = `cbd8c10443696bbf430e2dc97a64951d`
const GITHUB_LOGIN = `${GITHUB_OAUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`
const AUTH_URI = `http://localhost:9999/authenticate/`

async function getCode () {
  return await new Promise((resolve, reject) => {
    window.open(GITHUB_LOGIN, '_blank', 'menubar=0')
    window.onmessage = oauth => {
      if (oauth.data) {
        resolve(oauth.data)
      } else {
        reject('no code returned from github')
      }
    }
  })
}

async function getAuth (code) {
  const authRequest = `${AUTH_URI}${code}`
  return fetch(authRequest).then(
    data => data.json()
  )
}

async function getUsername (auth) {
  return fetch(`${GITHUB_API}user?access_token=${auth.token}`).then(
    data => data.json()
  ).then(
    response => response.login
  )
}

async function processLogin () {
  const code = await getCode()
  const auth = await getAuth(code)
  const username = await getUsername(auth)
  return {
    type: constants.USER_LOGGED_IN,
    username: username
  }
}

export function login () {
  return dispatch => {
    processLogin().then(
      data => {
        dispatch(data)
      }
    )
  }
}

export function logout () {
  return {
    type: constants.USER_LOGGED_OUT
  }
}
