import React from 'react'

let github = `https://github.com/login/oauth/authorize`
let client = `client_id=d07ba9157a9cd18b5f0d`
let redirect = `redirect_uri=http://localhost:8080/account.html`
let state = `state=cbd8c10443696bbf430e2dc97a64951d`
let loginUrl = `${github}?${client}&${redirect}&${state}`

export default React.createClass({
  displayName: 'LoginComponent',
  render () {
    return (
      <section>
        <a href='#'>Login</a>
      </section>
    )
  }
})
