import 'fetch'

/**
 * wrapper around fetch polyfill
 */
async function f (request, options) {
  return await fetch(request, options)
}

/**
 * return json by default
 * @todo add option to return other data types
 */
async function req (request, options) {
  const res = await f(request, options)
  return res.json()
}

/**
 * public api
 */
export async function asyncawaitFetch (request, options = null) {
  return await req(request, options)
}
