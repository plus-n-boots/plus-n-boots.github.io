const GITHUB_OAUTH = `https://github.com/login/oauth/authorize`
const CLIENT_ID = `d07ba9157a9cd18b5f0d`
const REDIRECT_URI = `http://localhost:8080/logged-in.html`
const STATE = `cbd8c10443696bbf430e2dc97a64951d`

export const GITHUB_API = `https://api.github.com/`
export const GITHUB_LOGIN = `${GITHUB_OAUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=repo,write:repo_hook`
export const AUTH_URI = `http://localhost:9999/authenticate/`
