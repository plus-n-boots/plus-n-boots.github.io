import PouchDB from 'pouchdb'
import _ from 'lodash'
import * as types from '../constants/action-types'
import * as github from '../constants/github'
import { asyncawaitFetch as fetch } from '../lib/asyncawait-fetch/index'

const db = new PouchDB('https://plus-n-boots-users.iriscouch.com/users')

let accessToken
let username

async function getCode () {
  return await new Promise((resolve) => {
    window.open(github.GITHUB_LOGIN, '_blank', 'width=1200,height=600,menubar=0')
    window.onmessage = oauth => {
      if (oauth.data.length) {
        resolve(oauth.data)
      }
    }
  })
}

async function getAuth (code) {
  const authRequest = `${github.AUTH_URI}${code}`
  return await fetch(authRequest)
}

async function orgInit (orgname) {
  const scaffold = {
    _id: orgname,
    repos: []
  }

  try {
    await db.get(orgname)
  } catch (err) {
    console.info(`${orgname} not found, adding to db`)
    await db.put(scaffold)
  }
}

async function getUserDetails (auth) {
  accessToken = auth.token
  const response = await fetch(`${github.GITHUB_API}user?access_token=${accessToken}`)
  // set username globally
  username = response.login
  return response
}

async function getOrgs (auth) {
  const orgs = await fetch(`${github.GITHUB_API}user/orgs?access_token=${auth.token}`)
  const orgNames = orgs.map(org => org.login)
  // add username as top level org, for users own repos
  orgNames.unshift(username)
  return orgNames
}

async function buildOrgs (auth) {
  const orgNames = await getOrgs(auth)

  return orgNames.map(org => {
    return {
      'name': org,
      'repos': []
    }
  })
}

async function checkRepos (repos) {
  const doc = await db.get(username)
  const saved = doc.repos.map(repo => repo.name)
  return repos.map(repo => {
    if (_.includes(saved, repo.name)) {
      repo.hookAdded = true
    }
    return repo
  })
}

async function getRepos () {
  const data = await fetch(`${github.GITHUB_API}user/repos?per_page=100&access_token=${accessToken}`)
  const repos = await checkRepos(data)
  return repos.filter(repo => {
    return !repo.fork && repo.owner.login === username
  })
}

async function requestHook (repoName) {
  const config = {
    name: 'web',
    active: true,
    events: ['issues', 'issue_comment'],
    config: {
      url: 'http://fa4bb0f6.ngrok.io/postreceive',
      'content_type': 'json'
    }
  }
  const data = await fetch(`${github.GITHUB_API}repos/${username}/${repoName}/hooks?access_token=${accessToken}`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(config)
  })
  return data.id
}

async function mapRepos (org) {
  if (org.name === username) {
    const repos = await getRepos()
    org.repos = repos
  }

  return org
}

async function processLogin () {
  const code = await getCode()
  const auth = await getAuth(code)
  const details = await getUserDetails(auth)
  const orgsScaffold = await buildOrgs(auth)
  let orgs = []
  for (const org of orgsScaffold) {
    await orgInit(org.name)
    orgs.push(await mapRepos(org))
  }

  return {
    type: types.USER_LOGGED_IN,
    details,
    orgs
  }
}

async function requestCollab (repoName, type) {
  const data = await fetch(`${github.GITHUB_API}repos/${username}/${repoName}/collaborators/plus-n-boots-official?access_token=${accessToken}`, {
    method: type === 'add' ? 'put' : 'delete',
    headers: {
      'Content-Length': 0
    }
  })
  return data
}

async function requestPersist (repoName, hookId, type) {
  if (type === 'add') {
    const doc = await db.get(username)
    doc.repos.push({
      name: repoName,
      hook: hookId
    })
    db.put(doc)
  } else {
    const doc = await db.get(username)
    const matching = doc.repos.map(repo => repo.name).indexOf(repoName)
    if (matching > -1) {
      deleteHook(repoName, doc.repos[matching].hook)
      doc.repos.splice(matching, 1)
    }
    db.put(doc)
  }
}

async function deleteHook (repoName, hookId) {
  await fetch(`${github.GITHUB_API}repos/${username}/${repoName}/hooks/${hookId}?access_token=${accessToken}`, {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

async function processHook (repo, type) {
  let hookId = null
  if (type === 'add') {
    hookId = await requestHook(repo.name, type)
  }
  await requestCollab(repo.name, type)
  await requestPersist(repo.name, hookId, type)
  return {
    type: types.HOOK_AMENDED,
    repo
  }
}

export function checkCache () {
  return {
    type: types.CHECK_CACHE,
    username
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
  processHook(repo, 'add')
  return {
    type: types.HOOK_AMENDED,
    repo
  }
}

export function removeHook (repo) {
  processHook(repo, 'remove')
  return {
    type: types.HOOK_AMENDED,
    repo
  }
}

export function logout () {
  return {
    type: types.USER_LOGGED_OUT
  }
}
