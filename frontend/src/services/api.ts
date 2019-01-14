import axios from "axios"
import { stringify } from "querystring"
import camelcaseKeys from "camelcase-keys"
import decamelizeKeys from "decamelize-keys"

type AuthResponse = {
  accessToken: string
}

const AUTH_URL = `//${process.env.API_HOST}/auth/slack`

export async function fetchAuth(code: string): Promise<AuthResponse> {
  axios.defaults.withCredentials = true

  const { data: response } = await axios.post(AUTH_URL, stringify({ code }))

  return camelcaseKeys(response, { deep: true })
}

function fetchFactory(token?: string, opts: object = {}) {
  opts = token ? { ...opts, headers: { Authorization: `Bearer ${token}` } } : { ...opts }
  console.log(opts)
  return axios.create({
    baseURL: process.env.API_HOST,
    withCredentials: true,
    ...opts
  })
}

export async function getRequest(endpoint: string, params?: object, token?: string) {
  const request = fetchFactory(token)
  const { data: result } = await request.get(endpoint, params ? { params: decamelizeKeys(params) } : undefined)

  return camelcaseKeys(result, { deep: true })
}

export async function postRequest(endpoint: string, data: object, token: string) {
  const request = fetchFactory(token)
  const { data: result } = await request.post(endpoint, stringify(decamelizeKeys(data)))

  return camelcaseKeys(result, { deep: true })
}
