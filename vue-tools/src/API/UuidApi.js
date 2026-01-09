import axios from 'axios'

const BASE_URL = 'https://www.uuidgenerator.net/api'

export async function getUuids(version, count) {
  let endpoint = ''

  switch (version) {
    case 'v1':
      endpoint = `${BASE_URL}/version1/${count}`
      break
    case 'v4':
      endpoint = `${BASE_URL}/version4/${count}`
      break
    case 'v7':
      endpoint = `${BASE_URL}/version7/${count}`
      break
    case 'guid':
      endpoint = `${BASE_URL}/guid/${count}`
      break
    default:
      throw new Error('Unknown UUID version')
  }

  const response = await axios.get(endpoint)

  return response.data.split('\n').filter(Boolean)
}
