import { Reducer } from "redux"

import { SigninState, SigninAction } from "./types"
import { SIGNIN_STARTED, SIGNIN_DONE, SIGNIN_FAILED } from "./actions"

const initialState: SigninState = {
  accessToken: "",
  loggingIn: false
}

const reducer: Reducer<SigninState, SigninAction> = (state = initialState, action: SigninAction) => {
  switch (action.type) {
    case SIGNIN_STARTED: {
      return { ...state, loggingIn: true }
    }
    case SIGNIN_DONE: {
      return { ...state, accessToken: action.payload.accessToken, loggingIn: false }
    }
    case SIGNIN_FAILED: {
      return {
        ...state,
        accessToken: "",
        loginError: action.payload.error,
        loggingIn: false
      }
    }
    default: {
      // const _: never = action
      return state
    }
  }
}

export default reducer
