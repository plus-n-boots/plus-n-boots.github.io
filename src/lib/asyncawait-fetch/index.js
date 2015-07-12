import 'fetch'

async function f (request, options) {
  return await fetch(request, options)
}

async function req (request, options) {
  const res = await f(request, options)
  return res.json()
}

export async function asyncawaitFetch (request, options = null) {
  return await req(request, options)
}
