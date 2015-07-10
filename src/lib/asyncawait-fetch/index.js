import 'fetch'

async function req (request) {
  return await fetch(request)
}

async function post (request) {

}

async function del (request) {

}

export async function get (request) {
  const response = await req(request)
  return response.json()
}

export async function asyncawaitFetch (request, type = 'get') {
  if (type === 'delete') {
    return await del(request)
  }

  if (type === 'post') {
    return await post(request)
  }

  return await get(request)
}
