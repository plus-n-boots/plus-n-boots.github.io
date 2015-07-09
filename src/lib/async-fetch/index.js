import 'fetch'

async function request (api) {
  return await fetch(api)
}

export async function get (api) {
  const response = await request(api)
  return response.json()
}
