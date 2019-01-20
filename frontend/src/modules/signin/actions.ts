export const SIGNIN_STARTED = "SIGNIN_STARTED"
export const SIGNIN_DONE = "SIGNIN_DONE"
export const SIGNIN_FAILED = "SIGNIN_FAILED"

export const signinStarted = (payload: { code: string; state: string }) => ({
  type: SIGNIN_STARTED as typeof SIGNIN_STARTED,
  payload
})

export const signinDone = (payload: { accessToken: string }) => ({
  type: SIGNIN_DONE as typeof SIGNIN_DONE,
  payload
})

export const signinFailed = (payload: { error: Error }) => ({
  type: SIGNIN_FAILED as typeof SIGNIN_FAILED,
  payload
})
