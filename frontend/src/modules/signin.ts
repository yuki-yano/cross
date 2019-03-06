import { Dispatch, Reducer } from "redux"
import produce from "immer"

import { fetchAuth } from "../services/api"

export type State = {
  userName: string | null
  accessToken: string | null
  stateCode: string | null
  isLogin: boolean
  isLoading: boolean
  loginError: Error | null
}

type SigninAction = {
  type: typeof SIGNIN
  payload: {
    code: string
    stateCode: string
  }
}

export type Actions =
  | ReturnType<typeof readySignin>
  | SigninAction
  | ReturnType<typeof signinStarted | typeof signinDone | typeof signinFailed>
  | ReturnType<typeof signout>

const initialState: State = {
  userName: null,
  accessToken: null,
  stateCode: null,
  isLogin: false,
  isLoading: false,
  loginError: null
}

const READY_SIGNIN = "READY_SIGNIN"
const SIGNIN = "SIGNIN"
const SIGNIN_STARTED = "SIGNIN_STARTED"
export const SIGNIN_DONE = "SIGNIN_DONE"
const SIGNIN_FAILED = "SIGNIN_FAILED"
export const SIGNOUT = "SIGNOUT"

export const readySignin = (payload: { stateCode: string }) => ({
  type: READY_SIGNIN as typeof READY_SIGNIN,
  payload
})

export const signin = (payload: { code: string; stateCode: string }) => async (dispatch: Dispatch) => {
  dispatch(signinStarted())

  const { resolve, reject } = await fetchAuth(payload.code)
  if (resolve) {
    dispatch(signinDone({ userName: resolve.user.name, accessToken: resolve.accessToken }))
  } else if (reject) {
    reject.error.message = reject.message
    dispatch(signinFailed({ error: reject.error }))
  }
  return
}

const signinStarted = () => ({
  type: SIGNIN_STARTED as typeof SIGNIN_STARTED
})

export const signinDone = (payload: { userName: string; accessToken: string }) => ({
  type: SIGNIN_DONE as typeof SIGNIN_DONE,
  payload
})

export const signinFailed = (payload: { error: Error }) => ({
  type: SIGNIN_FAILED as typeof SIGNIN_FAILED,
  payload
})

export const signout = () => ({
  type: SIGNOUT as typeof SIGNOUT
})

export const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case READY_SIGNIN: {
      return produce(state, draft => {
        draft.stateCode = action.payload.stateCode
      })
    }
    case SIGNIN: {
      return state
    }
    case SIGNIN_STARTED: {
      return produce(state, draft => {
        draft.userName = null
        draft.accessToken = null
        draft.isLogin = false
        draft.isLoading = true
        draft.loginError = null
      })
    }
    case SIGNIN_DONE: {
      const userName = action.payload.userName
      const accessToken = action.payload.accessToken
      return produce(state, draft => {
        draft.userName = userName
        draft.accessToken = accessToken
        draft.stateCode = null
        draft.isLogin = true
        draft.isLoading = false
        draft.loginError = null
      })
    }
    case SIGNIN_FAILED: {
      return produce(state, draft => {
        draft.userName = null
        draft.accessToken = null
        draft.stateCode = null
        draft.isLogin = false
        draft.isLoading = false
        draft.loginError = action.payload.error
      })
    }
    case SIGNOUT: {
      return produce(state, draft => {
        draft.userName = null
        draft.accessToken = null
        draft.stateCode = null
        draft.isLogin = false
        draft.isLoading = false
        draft.loginError = null
      })
    }
    default: {
      const _: never = action
      const none = (_: any) => _
      none(_)

      return state
    }
  }
}
