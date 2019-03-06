import { Middleware, MiddlewareAPI, Dispatch } from "redux"

import { Store } from "../store"
import { signinDone, signout, SIGNIN_DONE, SIGNOUT } from "../modules/signin"

type SignIn = ReturnType<typeof signinDone>
type SignOut = ReturnType<typeof signout>

export const accessToken: Middleware = (_store: MiddlewareAPI<Dispatch, Store>) => (next: Dispatch) => (
  action: SignIn | SignOut
) => {
  switch (action.type) {
    case SIGNIN_DONE: {
      localStorage.setItem("AccessToken", action.payload.accessToken)
      break
    }
    case SIGNOUT: {
      localStorage.removeItem("AccessToken")
      break
    }
    default: {
      const _: never = action
      const none = (_: any) => _
      none(_)
    }
  }

  next(action)
}
