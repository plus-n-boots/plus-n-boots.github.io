import url from 'url'

const parsedUrl = url.parse(window.location.href, true)
const code = parsedUrl.query.code ? parsedUrl.query.code : false

window.opener.postMessage(code, '*')
window.close()

// function sendMessage (event) {
//   return event.source.postMessage(code, event.origin)
// }
//
// window.addEventListener('message', sendMessage, false)
