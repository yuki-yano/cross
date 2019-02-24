import axios from "axios"
import { stringify } from "querystring"
import camelcaseKeys from "camelcase-keys"
import snakecaseKeys from "snakecase-keys"

export type AuthResponse =
  | { resolve: { user: { name: string }; accessToken: string }; reject: undefined }
  | { reject: { message: string; error: Error }; resolve: undefined }

const AUTH_URL = `//${process.env.API_HOST}/auth/slack`

export async function fetchAuth(code: string): Promise<AuthResponse> {
  axios.defaults.withCredentials = true

  try {
    const { data: response } = await axios.post(AUTH_URL, stringify({ code }))
    return { resolve: camelcaseKeys(response, { deep: true }), reject: undefined }
  } catch (error) {
    return { reject: { message: "認証に失敗しました", error }, resolve: undefined }
  }
}

function fetchFactory(token?: string, opts: {} = {}) {
  opts = token ? { ...opts, headers: { Authorization: `Bearer ${token}` } } : { ...opts }
  return axios.create({
    baseURL: process.env.API_HOST,
    withCredentials: true,
    ...opts
  })
}

export async function getRequest(endpoint: string, params?: {}, token?: string) {
  const request = fetchFactory(token)
  const { data: result } = await request.get(
    endpoint,
    params ? { params: snakecaseKeys(params, { deep: true }) } : undefined
  )

  return camelcaseKeys(result, { deep: true })
}

export async function postRequest(endpoint: string, data: {}, token: string) {
  const request = fetchFactory(token)
  const { data: result } = await request.post(endpoint, stringify(snakecaseKeys(data, { deep: true })))

  return camelcaseKeys(result, { deep: true })
}
