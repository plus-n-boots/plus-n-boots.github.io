import 'fetch'
import * as types from '../constants/ActionTypes'

const GITHUB_OAUTH = `https://github.com/login/oauth/authorize`
const GITHUB_API = `https://api.github.com/`
const CLIENT_ID = `d07ba9157a9cd18b5f0d`
const REDIRECT_URI = `http://localhost:8080/logged-in.html`
const STATE = `cbd8c10443696bbf430e2dc97a64951d`
const GITHUB_LOGIN = `${GITHUB_OAUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=repo,write:repo_hook`
const AUTH_URI = `http://localhost:9999/authenticate/`
let accessToken
let username

async function getCode () {
  return await new Promise((resolve, reject) => {
    window.open(GITHUB_LOGIN, '_blank', 'width=1200,height=600,menubar=0')
    window.onmessage = oauth => {
      if (oauth.data.length) {
        resolve(oauth.data)
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

async function getUserDetails (auth) {
  accessToken = auth.token
  return fetch(`${GITHUB_API}user?access_token=${accessToken}`).then(
    data => data.json()
  ).then((response) => {
    username = response.login
    return response
  }
  )
}

async function getRepos (auth) {
  return fetch(`${GITHUB_API}user/repos?access_token=${auth.token}`).then((data) => {
    return data.json()
  }).then((data) => {
    return data.filter(repo => {
      return !repo.fork && repo.owner.login === username
    })
  })
}

async function requestHook (repoName) {
  const config = {
    name: 'web',
    active: true,
    events: ['issues', 'issue_comment'],
    config: {
      url: 'http://fa4bb0f6.ngrok.io/postreceive',
      content_type: 'json'
    }
  }

  return fetch(`${GITHUB_API}repos/${username}/${repoName}/hooks?access_token=${accessToken}`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(config)
  }).then(
    data => data.json()
  ).then((response) => {
    return response
  }
  )
}


async function processLogin () {
  const code = await getCode()
  const auth = await getAuth(code)
  const details = await getUserDetails(auth)
  const repos = await getRepos(auth)
  return {
    type: types.USER_LOGGED_IN,
    details,
    repos
  }
}

async function processHook (repoName) {
  await requestHook(repoName)
  return {
    type: types.HOOK_ADDED
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

export function addHook (repo) {
  return dispatch => {
    processHook(repo.name).then(
      data => {
        dispatch(data)
      }
    )
  }
}

export function logout () {
  return {
    type: types.USER_LOGGED_OUT
  }
}
